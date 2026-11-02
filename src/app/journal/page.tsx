import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { ENTRIES, KIND_LABEL, fmtDate } from "@/content/journal";

export const metadata: Metadata = {
  title: "Journal — Sumeet Musfirah",
  description: "Short notes on what happened in my research, ideas I haven't tried yet, and questions I keep returning to.",
};

export default function Journal() {
  return (
    <>
      <Nav current="journal" />
      <main>
        <header className="page-head wrap narrow">
          <h1 className="h1">Journal</h1>
          <p className="tagline">Notes from the work, kept as it happens.</p>
        </header>
        <div className="wrap narrow">
          <ol className="contents">
            {ENTRIES.map((e) => (
              <li key={e.slug}>
                <Link href={`/journal/${e.slug}`}>
                  <span className="contents-d">{fmtDate(e.date)}</span>
                  <span className="contents-t">{e.title}</span>
                  <span className="contents-k">{KIND_LABEL[e.kind]}</span>
                  <span className="contents-x">{e.body[0]}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </main>
      <Footer />
    </>
  );
}
