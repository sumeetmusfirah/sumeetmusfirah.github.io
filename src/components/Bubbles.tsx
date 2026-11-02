"use client";

import { useEffect, useRef, useState } from "react";
import { HONORS, PAPERS, TALKS, type Paper } from "@/content/papers";

type Node = {
  key: string;
  label: string;
  bits: string[];
  r: number; // radius, px
  pos: [number, number]; // centre as a fraction of the stage (wide screens)
  posTall: [number, number]; // centre on tall screens
  paper?: Paper;
  list?: { heading: string; items: { what: string; where: string }[] };
};

const byShort = (s: string) => PAPERS.find((p) => p.short === s)!;

const NODES: Node[] = [
  { key: "axiom", label: "Axiom", bits: byShort("Axiom").bits, r: 118, pos: [0.27, 0.33], posTall: [0.5, 0.1], paper: byShort("Axiom") },
  { key: "who", label: "Who said it", bits: byShort("Who said it").bits, r: 92, pos: [0.57, 0.2], posTall: [0.28, 0.27], paper: byShort("Who said it") },
  { key: "pressure", label: "Under pressure", bits: byShort("Under pressure").bits, r: 96, pos: [0.8, 0.42], posTall: [0.72, 0.38], paper: byShort("Under pressure") },
  { key: "talks", label: "Talks", bits: ["Grace Hopper", "Penn"], r: 66, pos: [0.54, 0.6], posTall: [0.3, 0.52], list: { heading: "Talks", items: TALKS } },
  { key: "iron", label: "Bacteria vs. rust", bits: byShort("Bacteria vs. rust").bits, r: 90, pos: [0.16, 0.74], posTall: [0.68, 0.65], paper: byShort("Bacteria vs. rust") },
  { key: "wins", label: "Wins", bits: ["Fast Pitch", "Provost", "Disruptor", "Olympiad"], r: 80, pos: [0.8, 0.8], posTall: [0.34, 0.84], list: { heading: "Honors & wins", items: HONORS } },
];

// Threads between related work: the AI-behaviour studies feed each other; Axiom and the bacteria
// paper share the lab-experiment habit.
const LINKS: [string, string][] = [["axiom", "who"], ["who", "pressure"], ["pressure", "talks"], ["axiom", "pressure"], ["axiom", "iron"], ["talks", "wins"]];

/** Work as floating bubbles: small inner bubbles pop and re-form; tapping a bubble pops it open. */
export default function Bubbles() {
  const stage = useRef<HTMLDivElement>(null);
  const els = useRef<Record<string, HTMLButtonElement | null>>({});
  const lines = useRef<(SVGLineElement | null)[]>([]);
  const [open, setOpen] = useState<Node | null>(null);
  const [popped, setPopped] = useState<Record<string, boolean>>({});

  // Gentle drift, with the threads following the bubbles.
  useEffect(() => {
    let raf = 0;
    const phase = NODES.map(() => Math.random() * Math.PI * 2);
    const tick = (t: number) => {
      const st = stage.current;
      if (st) {
        const w = st.clientWidth, h = st.clientHeight, tall = w / h < 0.9, k = Math.min(1, w / 900);
        const c: Record<string, [number, number]> = {};
        NODES.forEach((n, i) => {
          const [fx, fy] = tall ? n.posTall : n.pos;
          const x = fx * w + Math.sin(t / 2600 + phase[i]) * 10, y = fy * h + Math.cos(t / 3100 + phase[i]) * 12;
          c[n.key] = [x, y];
          const el = els.current[n.key];
          if (el) {
            const r = n.r * (tall ? Math.max(0.78, k) : Math.max(0.8, k));
            el.style.width = el.style.height = `${r * 2}px`;
            el.style.transform = `translate(${x - r}px, ${y - r}px)`;
          }
        });
        LINKS.forEach(([a, b], i) => {
          const l = lines.current[i];
          if (l) { l.setAttribute("x1", `${c[a][0]}`); l.setAttribute("y1", `${c[a][1]}`); l.setAttribute("x2", `${c[b][0]}`); l.setAttribute("y2", `${c[b][1]}`); }
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Now and then an inner bubble pops on its own, then re-forms.
  const pop = (id: string) => {
    setPopped((p) => ({ ...p, [id]: true }));
    setTimeout(() => setPopped((p) => ({ ...p, [id]: false })), 3800);
  };
  useEffect(() => {
    const all = NODES.flatMap((n) => n.bits.map((_, i) => `${n.key}-${i}`));
    const t = setInterval(() => pop(all[Math.floor(Math.random() * all.length)]), 2600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, []);

  return (
    <div className="bubbles" ref={stage}>
      <svg className="threads" aria-hidden>
        {LINKS.map((_, i) => <line key={i} ref={(el) => { lines.current[i] = el; }} />)}
      </svg>

      {NODES.map((n) => (
        <button
          key={n.key}
          ref={(el) => { els.current[n.key] = el; }}
          className={`bubble${open?.key === n.key ? " burst" : ""}`}
          onClick={() => setOpen(n)}
          aria-label={`Open ${n.label}`}
        >
          <span className="bubble-t">{n.label}</span>
          {n.bits.map((b, i) => {
            // little bubbles cling to the rim, kept off the horizontal line where the title sits
            const m = n.bits.length, deg = m === 2 ? -90 + i * 180 : m === 1 ? -90 : -90 + ((i + 0.5) * 360) / m;
            const id = `${n.key}-${i}`, a = (deg * Math.PI) / 180;
            return (
              <span
                key={id}
                className={`bit${popped[id] ? " popped" : ""}`}
                style={{ left: `${50 + Math.cos(a) * 50}%`, top: `${50 + Math.sin(a) * 50}%` }}
                onMouseEnter={() => pop(id)}
              >
                {b}
              </span>
            );
          })}
        </button>
      ))}

      {open && (
        <div className="reveal-card" role="dialog" aria-label={open.label} onClick={() => setOpen(null)}>
          <div className="card-in" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setOpen(null)} aria-label="Close">×</button>
            {open.paper ? (
              <>
                <p className="label">{open.paper.venue}</p>
                <h2 className="article-title">{open.paper.title}</h2>
                {open.paper.authors && <p className="article-author">{open.paper.authors}</p>}
                <p className="q">{open.paper.question}</p>
                <div className="abstract">
                  {open.paper.abstract.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
                </div>
                {open.paper.links.length > 0 && (
                  <p className="card-links">
                    {open.paper.links.map((l) => <a key={l.href} className="link" href={l.href}>{l.label}</a>)}
                    <a className="link" href={`#${open.paper.slug}`} onClick={() => setOpen(null)}>More below</a>
                  </p>
                )}
              </>
            ) : (
              <>
                <h2 className="article-title">{open.list!.heading}</h2>
                <ul className="talks" style={{ marginTop: 18 }}>
                  {open.list!.items.map((x) => (
                    <li key={x.what}>
                      <span className="talk-t">{x.what}</span>
                      <span className="talk-w">{x.where}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
