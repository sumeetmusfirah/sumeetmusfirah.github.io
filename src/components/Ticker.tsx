"use client";

import { useEffect, useState } from "react";

const THREADS = [
  "epistemic independence in interacting LLMs",
  "confidence contagion & information cascades",
  "persuasion and behavioral drift in LLMs",
  "evaluating AI in high-stakes settings",
  "human cognition ↔ artificial-agent behavior",
];

/** Typewriter line cycling through current research threads. */
export default function Ticker() {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = THREADS[i];
    const done = !deleting && n === full.length;
    const empty = deleting && n === 0;
    const wait = done ? 1800 : empty ? 300 : deleting ? 22 : 48;
    const t = setTimeout(() => {
      if (done) setDeleting(true);
      else if (empty) {
        setDeleting(false);
        setI((i + 1) % THREADS.length);
      } else setN(n + (deleting ? -1 : 1));
    }, wait);
    return () => clearTimeout(t);
  }, [i, n, deleting]);

  return (
    <p className="ticker" aria-label={`Currently investigating: ${THREADS.join("; ")}`}>
      <span aria-hidden>&gt; currently investigating: </span>
      <span className="t" aria-hidden>{THREADS[i].slice(0, n)}</span>
      <span className="caret" aria-hidden />
    </p>
  );
}
