"use client";

import Link from "next/link";
import { useState } from "react";

const NAME = "Sumeet Musfirah";

/** The name; hovering it pulls the letters apart for a moment. */
export default function Name() {
  const [offsets, setOffsets] = useState<string[] | null>(null);
  const scatter = () =>
    setOffsets([...NAME].map(() => `translate(${(Math.random() - 0.5) * 18}px, ${(Math.random() - 0.5) * 14}px) rotate(${(Math.random() - 0.5) * 20}deg)`));
  return (
    <Link href="/" className="name" onMouseEnter={scatter} onMouseLeave={() => setOffsets(null)} aria-label={NAME}>
      {[...NAME].map((c, i) => (
        <span key={i} aria-hidden style={{ transform: offsets?.[i] }}>{c === " " ? " " : c}</span>
      ))}
    </Link>
  );
}
