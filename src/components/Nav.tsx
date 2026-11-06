import Link from "next/link";
import Name from "@/components/Name";

export const EMAIL = "sumeetmusfirah23@gmail.com";

export default function Nav({ current }: { current?: "research" | "about" }) {
  const here = (k: string) => (current === k ? "page" : undefined);
  return (
    <header className="nav">
      <Name />
      <nav aria-label="Primary">
        <Link href="/research" aria-current={here("research")}>Research</Link>
        <Link href="/about" aria-current={here("about")}>About</Link>
        <a href={`mailto:${EMAIL}`}>Say hi</a>
      </nav>
    </header>
  );
}
