import type { Metadata } from "next";
import Footer from "@/components/Footer";
import JournalCard from "@/components/JournalCard";
import Nav from "@/components/Nav";
import { ENTRIES } from "@/content/journal";

export const metadata: Metadata = {
  title: "Journal — Sumeet Musfirah",
  description: "Dated logs of what happened in my research, ideas I haven't run yet, and open questions.",
};

export default function Journal() {
  return (
    <>
      <Nav current="journal" />
      <main className="journal">
        <header className="page-head wrap">
          <p className="kicker">Journal <b>·</b> logs, ideas &amp; open questions</p>
          <h1 className="h1">The <em>working</em>, not just the results</h1>
          <p className="tagline">What happened, what went wrong, and what I want to try next.</p>
        </header>
        <div className="wrap jgrid">
          {ENTRIES.map((e, i) => (
            <JournalCard key={e.slug} entry={e} delay={Math.min(i, 3) * 0.25} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
