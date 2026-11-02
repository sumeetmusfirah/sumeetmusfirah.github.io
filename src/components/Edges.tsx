"use client";

import { useEffect, useState } from "react";

const W = 240; // drawing width of each side strip, px

type Sprite = { id: number; side: "l" | "r"; y: number; kind: "neuron" | "chip"; lines: string[]; dots: [number, number, number][] };

const rand = (a: number, b: number) => a + Math.random() * (b - a);

/** A dendritic arbor growing in from the edge: wandering branches studded with tiny spines. */
function neuron(long: boolean) {
  const lines: string[] = [], dots: [number, number, number][] = [];
  const sx = rand(14, 40), sy = 0;
  dots.push([sx, sy, rand(2.6, 3.6)]); // soma
  lines.push(`M${sx},${sy} C${sx - 8},${sy + rand(-6, 6)} ${sx - 14},${sy + rand(-10, 10)} -4,${sy + rand(-14, 14)}`); // axon leaves off-edge
  const grow = (x: number, y: number, a: number, len: number, depth: number) => {
    let d = `M${x.toFixed(1)},${y.toFixed(1)}`;
    const steps = Math.round(len / 7);
    for (let i = 0; i < steps; i++) {
      a += rand(-0.22, 0.22);
      const nx = x + Math.cos(a) * 7, ny = y + Math.sin(a) * 7;
      d += ` L${nx.toFixed(1)},${ny.toFixed(1)}`;
      if (Math.random() < 0.45) {
        // a spine: a short neck with a bulb on the end
        const s = Math.random() < 0.5 ? 1 : -1, n = rand(2.5, 5);
        const tx = nx + Math.cos(a + s * 1.4) * n, ty = ny + Math.sin(a + s * 1.4) * n;
        lines.push(`M${nx.toFixed(1)},${ny.toFixed(1)} L${tx.toFixed(1)},${ty.toFixed(1)}`);
        dots.push([tx, ty, rand(0.7, 1.2)]);
      }
      x = nx; y = ny;
    }
    lines.push(d);
    if (depth < (long ? 3 : 2)) {
      const k = Math.random() < 0.7 ? 2 : 1;
      for (let j = 0; j < k; j++) grow(x, y, a + (j ? 1 : -1) * rand(0.3, 0.7), len * rand(0.5, 0.7), depth + 1);
    }
  };
  const n = long ? 3 : 2;
  for (let i = 0; i < n; i++) grow(sx, sy, rand(-0.9, 0.9), long ? rand(70, 120) : rand(30, 50), 0);
  return { lines, dots };
}

/** A few parallel circuit traces with 45° bends ending in pads, like the edge of a chip. */
function chip() {
  const lines: string[] = [], dots: [number, number, number][] = [];
  const n = Math.round(rand(3, 5)), a = rand(30, 70), b = rand(14, 30), c = rand(20, 60), up = Math.random() < 0.5 ? -1 : 1;
  for (let i = 0; i < n; i++) {
    const y = i * 7, len = c - i * 6;
    lines.push(`M-2,${y} L${a + i * 4},${y} L${a + i * 4 + b},${y + up * b} L${a + i * 4 + b + len},${y + up * b}`);
    dots.push([a + i * 4 + b + len, y + up * b, 1.6]);
  }
  return { lines, dots };
}

/** Faint neurons (and the odd chip trace) that grow in from the page edges, linger, and fade. */
export default function Edges() {
  const [sprites, setSprites] = useState<Sprite[]>([]);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id = 0;
    const spawn = () => {
      if (innerWidth < 900) return; // no room beside the content on small screens
      const kind = Math.random() < 0.78 ? "neuron" : "chip";
      const shape = kind === "neuron" ? neuron(Math.random() < 0.45) : chip();
      const s: Sprite = { id: id++, side: Math.random() < 0.5 ? "l" : "r", y: rand(0.12, 0.88) * innerHeight, kind, ...shape };
      setSprites((xs) => [...xs.slice(-3), s]);
      setTimeout(() => setSprites((xs) => xs.filter((x) => x.id !== s.id)), 11000);
    };
    const first = setTimeout(spawn, 1200);
    const every = setInterval(spawn, 4200);
    return () => { clearTimeout(first); clearInterval(every); };
  }, []);

  return (
    <div className="edges" aria-hidden>
      {sprites.map((s) => (
        <svg
          key={s.id}
          className={`sprite ${s.kind}`}
          width={W}
          height={260}
          viewBox={`-10 -130 ${W} 260`}
          style={{ top: s.y - 130, [s.side === "l" ? "left" : "right"]: 0, transform: s.side === "r" ? "scaleX(-1)" : undefined }}
        >
          {s.lines.map((d, i) => <path key={i} d={d} pathLength={1} style={{ animationDelay: `${(i % 12) * 0.07}s` }} />)}
          {s.dots.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} />)}
        </svg>
      ))}
    </div>
  );
}
