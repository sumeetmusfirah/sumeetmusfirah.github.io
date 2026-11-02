"use client";

import { useEffect, useState } from "react";

type Stroke = { d: string; w: number; delay: number };
type Growth = { id: number; x: number; y: number; strokes: Stroke[]; dots: [number, number, number, number][] };

const rand = (a: number, b: number) => a + Math.random() * (b - a);

/** Smooth a polyline into quadratic curves through the midpoints. */
function smooth(pts: [number, number][]) {
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [x, y] = pts[i], [nx, ny] = pts[i + 1];
    d += ` Q${x.toFixed(1)},${y.toFixed(1)} ${((x + nx) / 2).toFixed(1)},${((y + ny) / 2).toFixed(1)}`;
  }
  const [lx, ly] = pts[pts.length - 1];
  return d + ` L${lx.toFixed(1)},${ly.toFixed(1)}`;
}

/** A neuron centred on (0,0): dendrites wander outward, taper as they branch, and carry tiny spines. */
function neuron(): Pick<Growth, "strokes" | "dots"> {
  const strokes: Stroke[] = [], dots: Growth["dots"] = [];
  dots.push([0, 0, rand(2.4, 3.2), 0]);
  const grow = (x: number, y: number, a: number, len: number, depth: number, t0: number) => {
    const pts: [number, number][] = [[x, y]];
    const steps = Math.max(3, Math.round(len / 6));
    for (let i = 0; i < steps; i++) {
      a += rand(-0.18, 0.18);
      x += Math.cos(a) * 6; y += Math.sin(a) * 6;
      pts.push([x, y]);
      if (depth > 0 && Math.random() < 0.35) {
        const s = Math.random() < 0.5 ? 1 : -1, n = rand(2, 4);
        const tx = x + Math.cos(a + s * 1.3) * n, ty = y + Math.sin(a + s * 1.3) * n;
        const t = t0 + (i / steps) * 1.6;
        strokes.push({ d: `M${x.toFixed(1)},${y.toFixed(1)} L${tx.toFixed(1)},${ty.toFixed(1)}`, w: 0.5, delay: t });
        dots.push([tx, ty, rand(0.6, 1), t + 0.2]);
      }
    }
    strokes.push({ d: smooth(pts), w: Math.max(0.45, 1.3 - depth * 0.3), delay: t0 });
    if (depth < 3) {
      const k = depth === 0 ? 2 : Math.random() < 0.65 ? 2 : 1;
      for (let j = 0; j < k; j++) grow(x, y, a + (j ? 1 : -1) * rand(0.25, 0.6), len * rand(0.55, 0.75), depth + 1, t0 + 1.4);
    }
  };
  const arms = Math.round(rand(3, 5)), spin = rand(0, Math.PI * 2);
  for (let i = 0; i < arms; i++) grow(0, 0, spin + (i / arms) * Math.PI * 2 + rand(-0.3, 0.3), rand(40, 80), 0, 0);
  // one long axon trailing away
  const a = rand(0, Math.PI * 2), pts: [number, number][] = [[0, 0]];
  let x = 0, y = 0, aa = a;
  for (let i = 0; i < 40; i++) { aa += rand(-0.08, 0.08); x += Math.cos(aa) * 7; y += Math.sin(aa) * 7; pts.push([x, y]); }
  strokes.push({ d: smooth(pts), w: 0.6, delay: 0.4 });
  return { strokes, dots };
}

/** On inner pages: click anywhere that isn't a link and a neuron slowly creeps out from that spot. */
export default function Edges() {
  const [growths, setGrowths] = useState<Growth[]>([]);

  useEffect(() => {
    let id = 0;
    const onDown = (e: PointerEvent) => {
      if (e.target instanceof Element && e.target.closest("a, button, input, textarea")) return;
      const g: Growth = { id: id++, x: e.clientX, y: e.clientY, ...neuron() };
      setGrowths((xs) => [...xs.slice(-4), g]);
      setTimeout(() => setGrowths((xs) => xs.filter((x) => x.id !== g.id)), 14000);
    };
    addEventListener("pointerdown", onDown);
    return () => removeEventListener("pointerdown", onDown);
  }, []);

  return (
    <div className="edges" aria-hidden>
      {growths.map((g) => (
        <svg key={g.id} className="growth" width={600} height={600} viewBox="-300 -300 600 600" style={{ left: g.x - 300, top: g.y - 300 }}>
          {g.strokes.map((s, i) => (
            <path key={i} d={s.d} pathLength={1} strokeWidth={s.w} style={{ animationDelay: `${s.delay}s` }} />
          ))}
          {g.dots.map(([x, y, r, t], i) => (
            <circle key={i} cx={x} cy={y} r={r} style={{ animationDelay: `${t}s` }} />
          ))}
        </svg>
      ))}
    </div>
  );
}
