"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";

const NAME = "Sumeet Musfirah";

/**
 * The name. Hovering sends a soft wave through the letters. On the home page, tapping it asks the
 * particle field to gather everything to one point and let it go (Field listens for "sm:gather").
 */
export default function Name() {
  const home = usePathname() === "/";
  const onClick = (e: MouseEvent) => {
    if (!home) return;
    e.preventDefault();
    dispatchEvent(new Event("sm:gather"));
  };
  return (
    <Link href="/" className="name" onClick={onClick} aria-label={NAME}>
      {[...NAME].map((c, i) => (
        <span key={i} aria-hidden style={{ animationDelay: `${i * 0.035}s` }}>{c === " " ? " " : c}</span>
      ))}
    </Link>
  );
}
