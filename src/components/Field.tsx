"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer.js";

const MAX_VOICES = 8;

// Slow particles take the first colour, fast ones the last.
const PAL: Record<string, [number, number, number][]> = {
  dusk: [[0.34, 0.4, 0.52], [0.7, 0.5, 0.44], [0.93, 0.85, 0.72]],
  chai: [[0.3, 0.22, 0.16], [0.66, 0.5, 0.36], [0.92, 0.86, 0.76]],
};

// Each "voice" pulls particles toward it and swirls them around its own axis.
const velocityShader = /* glsl */ `
  uniform float dt;
  uniform float damp;
  uniform int count;
  uniform vec4 voices[${MAX_VOICES}];   // xyz = position, w = pull
  uniform vec3 axes[${MAX_VOICES}];
  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 p = texture2D(texturePosition, uv);
    vec3 v = texture2D(textureVelocity, uv).xyz;
    float mass = mix(0.6, 1.4, p.w);      // a little individuality per particle
    vec3 a = vec3(0.0);
    for (int i = 0; i < ${MAX_VOICES}; i++) {
      if (i >= count) break;
      vec3 d = voices[i].xyz - p.xyz;
      float g = voices[i].w * 0.9 / max(dot(d, d), 0.15);
      vec3 n = normalize(d);
      a += (n * g + cross(axes[i], n) * g * 1.4) / mass;
    }
    v = (v + a * dt) * damp;
    float s = length(v);
    if (s > 3.2) v *= 3.2 / s;
    gl_FragColor = vec4(v, 1.0);
  }
`;

const positionShader = /* glsl */ `
  uniform float dt;
  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 p = texture2D(texturePosition, uv);
    p.xyz += texture2D(textureVelocity, uv).xyz * dt;
    gl_FragColor = p;
  }
`;

const pointVertex = /* glsl */ `
  uniform sampler2D texPos;
  uniform sampler2D texVel;
  uniform float size;
  uniform vec3 colA, colB, colC;
  attribute vec2 ref;
  varying vec3 vColor;
  void main() {
    vec4 q = texture2D(texPos, ref);
    vec3 p = q.xyz;
    float t = clamp(length(texture2D(texVel, ref).xyz) / 2.4, 0.0, 1.0);
    vColor = mix(mix(colA, colB, smoothstep(0.0, 0.5, t)), colC, smoothstep(0.5, 1.0, t));
    // about a fifth of the particles lean sage, so the colour never feels like one gradient
    vColor = mix(vColor, vec3(0.52, 0.6, 0.5), step(0.8, q.w) * 0.6);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = size / -mv.z;
  }
`;

const pointFragment = /* glsl */ `
  uniform float opacity;
  varying vec3 vColor;
  void main() {
    float a = smoothstep(0.5, 0.0, length(gl_PointCoord - 0.5));
    gl_FragColor = vec4(vColor * a * opacity, 1.0);
  }
`;

type Voice = { p: THREE.Vector3; axis: THREE.Vector3; pull: number; life: number; saved?: number };

/**
 * Particles ("beliefs") orbiting a few attractors ("voices"), simulated on the GPU.
 * Clicking adds a loud voice that fades. Hidden: type chai / calm / doubt, click seven times,
 * or find the cup in the corner.
 */
export default function Field({ quiet = false }: { quiet?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [toast, setToast] = useState("");
  const [brewing, setBrewing] = useState(false);
  const chaiRef = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SIDE = quiet || innerWidth < 700 || reduced ? 256 : 512; // 65k on phones and as a backdrop, 262k on the home page
    const N = SIDE * SIDE;

    // preserveDrawingBuffer lets each frame fade over the last, which draws the light trails.
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0x07070a, 1);
    renderer.autoClear = false;
    renderer.clear();

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 9);
    const scene = new THREE.Scene();

    // Fading veil drawn before the particles each frame; lower opacity = longer trails.
    const veil = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.MeshBasicMaterial({ color: 0x07070a, transparent: true, opacity: 0.3, depthTest: false, depthWrite: false }),
    );
    const veilScene = new THREE.Scene();
    veil.position.z = -0.5;
    veilScene.add(veil);
    const veilCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // ── GPU simulation ──
    const gpu = new GPUComputationRenderer(SIDE, SIDE, renderer);
    const pos0 = gpu.createTexture(), vel0 = gpu.createTexture();
    const pd = pos0.image.data as unknown as Float32Array;
    for (let i = 0; i < N; i++) {
      const r = 4 * Math.cbrt(Math.random()), t = Math.random() * Math.PI * 2, u = Math.random() * 2 - 1, s = Math.sqrt(1 - u * u);
      pd.set([r * s * Math.cos(t), r * s * Math.sin(t), r * u, Math.random()], i * 4);
    }
    const velVar = gpu.addVariable("textureVelocity", velocityShader, vel0);
    const posVar = gpu.addVariable("texturePosition", positionShader, pos0);
    gpu.setVariableDependencies(velVar, [posVar, velVar]);
    gpu.setVariableDependencies(posVar, [posVar, velVar]);
    const vu = velVar.material.uniforms, pu = posVar.material.uniforms;
    vu.dt = { value: 0.016 };
    vu.damp = { value: 0.985 };
    vu.count = { value: 0 };
    vu.voices = { value: Array.from({ length: MAX_VOICES }, () => new THREE.Vector4()) };
    vu.axes = { value: Array.from({ length: MAX_VOICES }, () => new THREE.Vector3(0, 1, 0)) };
    pu.dt = { value: 0.016 };
    const err = gpu.init();
    if (err) {
      console.warn(err);
      return;
    }

    // ── Points that read their position from the simulation ──
    const geo = new THREE.BufferGeometry();
    const ref = new Float32Array(N * 2);
    for (let i = 0; i < N; i++) ref.set([((i % SIDE) + 0.5) / SIDE, (Math.floor(i / SIDE) + 0.5) / SIDE], i * 2);
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    geo.setAttribute("ref", new THREE.BufferAttribute(ref, 2));
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        texPos: { value: null },
        texVel: { value: null },
        size: { value: 16 },
        opacity: { value: quiet ? 0.22 : SIDE === 512 ? 0.23 : 0.44 },
        colA: { value: new THREE.Vector3() },
        colB: { value: new THREE.Vector3() },
        colC: { value: new THREE.Vector3() },
      },
      vertexShader: pointVertex,
      fragmentShader: pointFragment,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
    });
    const pts = new THREE.Points(geo, mat);
    pts.frustumCulled = false;
    scene.add(pts);

    let palette = "dusk";
    const paint = () => {
      const [a, b, c] = PAL[palette];
      mat.uniforms.colA.value.set(...a);
      mat.uniforms.colB.value.set(...b);
      mat.uniforms.colC.value.set(...c);
    };
    paint();

    const voices: Voice[] = [
      { p: new THREE.Vector3(-2.2, 0.4, 0), axis: new THREE.Vector3(0, 1, 0.3).normalize(), pull: 1, life: Infinity },
      { p: new THREE.Vector3(2.0, -0.6, -0.5), axis: new THREE.Vector3(1, 0.2, 0).normalize(), pull: 1, life: Infinity },
      { p: new THREE.Vector3(0.2, 1.6, 0.6), axis: new THREE.Vector3(0.2, 0, 1).normalize(), pull: 0.8, life: Infinity },
    ];
    const syncVoices = () => {
      vu.count.value = voices.length;
      voices.forEach((v, i) => {
        vu.voices.value[i].set(v.p.x, v.p.y, v.p.z, v.pull * (v.life === Infinity ? 1 : Math.min(1, v.life / 1.5)));
        vu.axes.value[i].copy(v.axis);
      });
    };

    // Let the swirls form before anyone sees them.
    syncVoices();
    for (let i = 0; i < 150; i++) gpu.compute();

    const resize = () => {
      renderer.setSize(innerWidth, innerHeight, false);
      camera.aspect = innerWidth / innerHeight;
      camera.position.z = camera.aspect < 0.8 ? 15 : 9; // portrait phones: step back so the cloud fits
      camera.updateProjectionMatrix();
      mat.uniforms.size.value = 16 * renderer.getPixelRatio();
      renderer.clear();
    };
    resize();
    addEventListener("resize", resize);

    let toastTimer: ReturnType<typeof setTimeout>;
    const say = (s: string) => {
      setToast(s);
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => setToast(""), 3200);
    };

    const chai = () => {
      palette = palette === "chai" ? "dusk" : "chai";
      paint();
      setBrewing(palette === "chai");
      say(palette === "chai" ? "chai break ☕" : "back to work");
    };
    chaiRef.current = chai;

    let calm = reduced;

    let mx = 0, my = 0;
    const onMove = (e: PointerEvent) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; };
    addEventListener("pointermove", onMove);

    const ray = new THREE.Raycaster(), plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), hit = new THREE.Vector3();
    let clicks = 0, gathering = false;
    const onClick = (e: MouseEvent) => {
      ray.setFromCamera(new THREE.Vector2((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1), camera);
      if (gathering || !ray.ray.intersectPlane(plane, hit)) return;
      pts.worldToLocal(hit);
      if (voices.length >= MAX_VOICES) voices.splice(3, 1); // the three resident voices stay
      voices.push({ p: hit.clone(), axis: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, 1).normalize(), pull: 2.4, life: 6 });
      if (++clicks === 7) say("Seven loud voices. Nobody is listening to the evidence anymore.");
    };
    if (!quiet) canvas.addEventListener("click", onClick);

    let typed = "";
    const onKey = (e: KeyboardEvent) => {
      typed = (typed + e.key.toLowerCase()).slice(-8);
      if (typed.endsWith("chai")) chai();
      if (typed.endsWith("calm")) { calm = !calm; say(calm ? "breathe." : "and we're back."); }
      if (typed.endsWith("doubt")) {
        voices.forEach((v) => { v.saved = v.pull; v.pull = 0; });
        say("for a moment, no one is sure of anything.");
        setTimeout(() => voices.forEach((v) => { v.pull = v.saved ?? v.pull; }), 2500);
      }
    };
    if (!quiet) addEventListener("keydown", onKey);

    // Tapping the name: everything gathers to one point, holds, then bursts back out.
    const onGather = () => {
      if (gathering) return;
      gathering = true;
      while (voices.length >= MAX_VOICES) voices.pop(); // make room; only temporary voices sit past index 2
      voices.forEach((v) => { v.saved = v.pull; v.pull = 0; });
      const centre: Voice = { p: new THREE.Vector3(0, 0, 0), axis: new THREE.Vector3(0, 0, 1), pull: 7, life: Infinity };
      voices.push(centre);
      say("for a second, everyone agreed.");
      setTimeout(() => { centre.pull = -14; }, 1700);
      setTimeout(() => {
        voices.splice(voices.indexOf(centre), 1);
        voices.forEach((v) => { v.pull = v.saved ?? v.pull; });
        gathering = false;
      }, 2300);
    };
    if (!quiet) addEventListener("sm:gather", onGather);

    if (!quiet) console.log("%chi, curious one. try typing chai, calm, or doubt.", "font: italic 16px serif; color: #e7b98f");

    let raf = 0, last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.033);
      last = now;
      for (let k = voices.length - 1; k >= 0; k--) {
        const v = voices[k];
        if (v.life !== Infinity && (v.life -= dt) <= 0) voices.splice(k, 1);
      }
      syncVoices();
      vu.dt.value = pu.dt.value = dt;
      vu.damp.value = calm ? 0.94 : 0.985;
      gpu.compute();
      mat.uniforms.texPos.value = gpu.getCurrentRenderTarget(posVar).texture;
      mat.uniforms.texVel.value = gpu.getCurrentRenderTarget(velVar).texture;

      pts.rotation.y += (mx * 0.6 - pts.rotation.y) * 0.03 + 0.0008;
      pts.rotation.x += (my * 0.4 - pts.rotation.x) * 0.03;
      renderer.render(veilScene, veilCam);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(toastTimer);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", onMove);
      removeEventListener("keydown", onKey);
      removeEventListener("sm:gather", onGather);
      canvas.removeEventListener("click", onClick);
      gpu.dispose(); geo.dispose(); mat.dispose(); renderer.dispose();
    };
  }, [quiet]);

  if (quiet) return <canvas ref={canvasRef} className="field quiet" aria-hidden />;

  return (
    <>
      <canvas ref={canvasRef} className="field" aria-label="Particles drifting around a few invisible attractors. Click to add one." />
      <p className={`toast${toast ? " on" : ""}`} role="status">{toast}</p>
      <button className={`cup${brewing ? " brewing" : ""}`} aria-label="Make chai" onClick={() => chaiRef.current()}>
        <svg viewBox="0 0 22 26" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden>
          <path className="steam" d="M8 9 C6 6 10 5 8 1" />
          <path className="steam b" d="M13 9 C11 6 15 5 13 1" />
          <path className="tea" d="M3 12 h14 l-1.6 10.5 a2 2 0 0 1 -2 1.5 h-6.8 a2 2 0 0 1 -2 -1.5 Z" />
          <path d="M17 14.5 c3 0 3.6 5 -0.6 5.4" />
        </svg>
      </button>
    </>
  );
}
