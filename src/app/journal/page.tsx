import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Notebook from "@/components/Notebook";
import { ENTRIES, KIND_LABEL, fmtDate } from "@/content/journal";

export const metadata: Metadata = {
  title: "Journal — Sumeet Musfirah",
  description: "A lab notebook: dated logs of what happened in my research, ideas I haven't run yet, and open questions.",
};

export default function Journal() {
  const [latest] = ENTRIES;
  return (
    <>
      <Nav current="journal" />
      <main className="desk">
        <header className="page-head wrap">
          <p className="kicker">Journal <b>·</b> lab notebook</p>
          <h1 className="h1">Journal</h1>
          <p className="tagline">What happened, what went wrong, and what I want to try next.</p>
        </header>

        <div className="wrap">
          <Notebook>
            <section className="page page-left">
              <p className="kicker">Contents</p>
              <ol className="contents">
                {ENTRIES.map((e, i) => (
                  <li key={e.slug}>
                    <Link href={`/journal/${e.slug}`}>
                      <span className={`kind kind-${e.kind}`}>{KIND_LABEL[e.kind]}</span>
                      <span className="c-title">{e.title}</span>
                      <span className="c-dots" aria-hidden />
                      <span className="c-page mono">p.{i + 1}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
            <section className="page page-right">
              <p className="kicker">Latest · {fmtDate(latest.date)}</p>
              <h2 className="entry-title">{latest.title}</h2>
              <p className="ruled">{latest.body[0]}</p>
              <Link className="turn" href={`/journal/${latest.slug}`}>
                keep reading →
              </Link>
              <div className="legend">
                <p className="hand">How to read this notebook:</p>
                <p><span className="kind kind-log">Lab log</span> what actually happened, failures included</p>
                <p><span className="kind kind-idea">Idea</span> not run yet; labelled so you don&rsquo;t mistake it for a result</p>
                <p><span className="kind kind-question">Open question</span> the things I keep coming back to</p>
              </div>
            </section>
          </Notebook>
        </div>
      </main>
      <Footer />
    </>
  );
}
