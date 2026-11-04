import type { Metadata } from "next";
import Field from "@/components/Field";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { PAPERS, TALKS, type Paper } from "@/content/papers";

export const metadata: Metadata = {
  title: "Research — Sumeet Musfirah",
  description: "What I'm working on and what I've published: AI behavior, evaluation, and a materials paper from my DARPA internship.",
};

const WHERE: Record<Paper["status"], string> = {
  live: "In progress",
  complete: "Writing it up",
  prereg: "Planned",
  published: "Published",
};

export default function Research() {
  return (
    <>
      <div className="backdrop"><Field quiet /></div>
      <Nav current="research" />
      <main className="page">
        <h1 className="title">Research</h1>

        <ul className="projects">
          {PAPERS.map((p) => (
            <li key={p.slug} id={p.slug}>
              <details>
                <summary>
                  <span className="p-name">{p.short}</span>
                  <span className="p-when">{WHERE[p.status]}{p.year && ` · ${p.year}`}</span>
                  <span className="p-line">{p.question}</span>
                  <span className="p-more" aria-hidden />
                </summary>
                <div className="p-body">
                  <p className="p-title">{p.title}</p>
                  {p.authors && <p className="dim small">{p.authors}</p>}
                  {p.abstract.map((para) => <p key={para.slice(0, 24)}>{para}</p>)}
                  {p.links.length > 0 && (
                    <p className="p-links">
                      {p.links.map((l) => <a key={l.href} className="link" href={l.href}>{l.label}</a>)}
                    </p>
                  )}
                </div>
              </details>
            </li>
          ))}
        </ul>

        <p className="label" style={{ marginTop: 64 }}>Talks</p>
        <ul className="talks">
          {TALKS.map((t) => (
            <li key={t.what}>
              <span className="talk-t">{t.what}</span>
              <span className="talk-w">{t.where}</span>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
