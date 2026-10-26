"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const KEY = "journal-opened";

/** A closed notebook cover that swings open on click to reveal its pages. Stays open for the session. */
export default function Notebook({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Skip the animation for returning visitors and reduced-motion users.
      ref.current?.classList.add("is-open", "instant");
    }
  }, []);

  function openBook() {
    setOpen(true);
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
  }

  return (
    <div ref={ref} className={`book ${open ? "is-open" : ""}`}>
      <div className="book-pages">
        {children}
      </div>
      <button className="cover" onClick={openBook} aria-label="Open the lab notebook" tabIndex={open ? -1 : 0}>
        <span className="cover-band" aria-hidden />
        <span className="cover-label">
          <span className="kicker">Lab notebook · Vol. I</span>
          <span className="cover-title">Notes, logs &amp; ideas</span>
          <span className="cover-name">S. Musfirah</span>
        </span>
        <span className="cover-hint mono">open ↗</span>
      </button>
    </div>
  );
}
