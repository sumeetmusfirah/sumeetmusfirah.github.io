import Link from "next/link";

/** Site-wide nav. Home sections are anchors on "/"; Research and Journal are their own pages. */
export default function Nav({ current }: { current?: "research" | "journal" }) {
  return (
    <nav className="nav" aria-label="Primary">
      <div className="wrap nav-inner">
        <Link href="/" className="mark">
          S<span>·</span>M
        </Link>
        <div className="nav-links">
          <Link href="/#about">About</Link>
          <Link href="/research" aria-current={current === "research" ? "page" : undefined}>Research</Link>
          <Link href="/journal" aria-current={current === "journal" ? "page" : undefined}>Journal</Link>
          <Link href="/#applied">Applied AI</Link>
          <Link href="/#contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
