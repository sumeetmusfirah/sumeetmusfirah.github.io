import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
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
      <Nav current="research" />
      <main>
        <header className="page-head wrap">
          <p className="kicker">Research <b>·</b> papers &amp; preprints</p>
          <h1 className="h1">Research</h1>
          <p className="tagline">
            Measuring judgement where the answer is known, and showing my working when it isn&rsquo;t.
          </p>
          <ol className="toc" aria-label="Papers on this page">
            {PAPERS.map((p, i) => (
              <li key={p.slug}>
                <a href={`#${p.slug}`}>
                  <span className="mono">{String(i + 1).padStart(2, "0")}</span> {p.title.split(":")[0]}
                </a>
              </li>
            ))}
          </ol>
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
                  <p className="article-author">Sumeet Musfirah{p.status === "published" && " et al."}</p>
                  <p className="q">{p.question}</p>
                  <div className="abstract">
                    <p className="kicker">Abstract</p>
                    {p.abstract.map((para) => (
                      <p key={para.slice(0, 24)}>{para}</p>
                    ))}
                  </div>
                  {p.figure && (
                    <figure className="fig article-fig">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.figure.src} alt={p.figure.alt} loading="lazy" />
                      <figcaption>
                        <span className="mono">Fig. {i + 1}.</span> {p.figure.caption}
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

          <section className="section" style={{ borderTop: 0 }}>
            <Reveal className="section-head">
              <p className="kicker">Talks</p>
              <h2 className="h2">Said <em>out loud</em>.</h2>
            </Reveal>
            <Reveal>
              <ul className="talks">
                {TALKS.map((t) => (
                  <li key={t.what}>
                    <span className="kicker">{t.where}</span>
                    <span className="serif" style={{ fontSize: 20 }}>{t.what}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
