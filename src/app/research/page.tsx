import type { Metadata } from "next";
import Field from "@/components/Field";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { PAPERS, TALKS, type Paper } from "@/content/papers";

export const metadata: Metadata = {
  title: "Research — Sumeet Musfirah",
  description: "Papers, preprints and preregistered studies on AI evaluation, scientific judgement and epistemic behaviour in language models.",
};

const STATUS: Record<Paper["status"], string> = {
  live: "running · preprint",
  complete: "complete · public",
  prereg: "preregistered · data pending",
  published: "peer-reviewed",
};

export default function Research() {
  return (
    <>
      <div className="backdrop"><Field quiet /></div>
      <Nav current="research" />
      <main className="page">
        <header className="page-head wrap">
          <h1 className="h1">Research</h1>
        </header>


        <div className="wrap">
          {PAPERS.map((p, i) => (
              <article key={p.slug} id={p.slug} className="article">
                <div className="article-band">
                  <span>{p.venue}</span>
                  <span>
                    No. {String(i + 1).padStart(2, "0")}
                    {p.year && ` · ${p.year}`}
                  </span>
                </div>
                <div className="article-body">
                  <span className={`status ${p.status === "complete" || p.status === "published" ? "done" : ""}`}>
                    {STATUS[p.status]}
                  </span>
                  <h2 className="article-title">{p.title}</h2>
                  <p className="article-author">{p.authors ?? "Sumeet Musfirah"}</p>
                  <p className="q">{p.question}</p>
                  <div className="abstract">
                    <p className="label">Abstract</p>
                    {p.abstract.map((para) => (
                      <p key={para.slice(0, 24)}>{para}</p>
                    ))}
                  </div>
                  {p.figure && (
                    <figure className="fig article-fig">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.figure.src} alt={p.figure.alt} loading="lazy" />
                      <figcaption>
                        <em>Fig. {i + 1}.</em> {p.figure.caption}
                      </figcaption>
                    </figure>
                  )}
                  <div className="article-foot">
                    <div className="tags">
                      {p.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    {p.links.length > 0 && (
                      <p>
                        {p.links.map((l, j) => (
                          <span key={l.href}>
                            {j > 0 && " · "}
                            <a className="link" href={l.href}>{l.label}</a>
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                </div>
              </article>
          ))}

          <section className="talks-block">
            <p className="label">Talks</p>
            <ul className="talks">
              {TALKS.map((t) => (
                <li key={t.what}>
                  <span className="talk-t">{t.what}</span>
                  <span className="talk-w">{t.where}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
