import Link from "next/link";

/** Centered wordmark with a quiet row of links beneath it. */
export default function Nav({ current }: { current?: "research" | "journal" }) {
  return (
    <nav className="nav" aria-label="Primary">
      <Link href="/" className="mark">Sumeet Musfirah</Link>
      <div className="nav-links">
        <Link href="/#about">About</Link>
        <Link href="/research" aria-current={current === "research" ? "page" : undefined}>Research</Link>
        <Link href="/journal" aria-current={current === "journal" ? "page" : undefined}>Journal</Link>
        <Link href="/#contact">Contact</Link>
      </div>
    </nav>
  );
}
