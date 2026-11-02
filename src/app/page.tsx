import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import { ENTRIES, fmtDate } from "@/content/journal";

const EMAIL = "sumeetmusfirah23@gmail.com";
const LINKS = {
  github: "https://github.com/sumeetmusfirah",
  linkedin: "https://www.linkedin.com/in/sumeetmusfirah",
};

// Home stays light: one line per piece of work. Detail lives on /research.
const WORK = [
  {
    t: "Axiom",
    d: "A benchmark that asks whether language models can run an experiment like a scientist, scored against a hidden truth.",
    href: "/research#axiom-neuro",
  },
  {
    t: "Pressure evals",
    d: "Does pushing a model toward a goal make it more manipulative? It depended on who did the grading.",
    href: "/research#pressure-evals",
  },
  {
    t: "Who said it",
    d: "Whether models are moved by an argument, or by the name attached to it.",
    href: "/research#exp001",
  },
];

const PATH = [
  { what: "Research", where: "Chrysikou Lab, Drexel University" },
  { what: "AI Developer", where: "American Board of Internal Medicine" },
  { what: "Research intern", where: "DARPA" },
  { what: "R&D co-op", where: "Syensqo" },
  { what: "Neuroscience outreach", where: "International Youth Neuroscience Association" },
];

export default function Home() {
  return (
    <>
      <Nav />

      <main id="top">
        <header className="hero wrap">
          <figure className="portrait">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/portrait.jpg" alt="Portrait of Sumeet Musfirah" />
          </figure>
          <h1 className="h1">Sumeet Musfirah</h1>
          <p className="tagline">On minds, machines, and whom we choose to believe.</p>
          <p className="lede">
            I study neuroscience and psychology at Drexel University, and I research how language models,
            and the people who use them, decide what to trust.
          </p>
        </header>

        <section id="about" className="section wrap narrow">
          <Reveal>
            <p className="label">About</p>
            <div className="prose">
              <p>
                I started with brains: theory of mind, and later cognitive neuroscience at Drexel. The question
                that kept following me was how a mind decides what to trust. Now I ask it of language models
                too: when they hold their ground, when they give way, and whether the tools we use to judge
                them can be trusted at all.
              </p>
              <p>
                Along the way I have worked on materials for DARPA, built AI for medicine, and made a card game
                about South Asian culture. I like work that is careful enough to defend and human enough to
                matter.
              </p>
            </div>
          </Reveal>
        </section>

        <section id="work" className="section wrap narrow">
          <Reveal>
            <p className="label">Selected work</p>
            <ul className="work">
              {WORK.map((w) => (
                <li key={w.t}>
                  <Link href={w.href}>
                    <span className="work-t">{w.t}</span>
                    <span className="work-d">{w.d}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="more"><Link className="link" href="/research">All research</Link></p>
          </Reveal>
        </section>

        <section id="path" className="section wrap narrow">
          <Reveal>
            <p className="label">Path</p>
            <ul className="path">
              {PATH.map((x) => (
                <li key={x.where}>
                  <span className="what">{x.what}</span>
                  <span className="where">{x.where}</span>
                </li>
              ))}
            </ul>
            <p className="aside">
              B.S. Research &amp; Experimental Psychology, Drexel University · minors in Neuroscience and Data Science
            </p>
          </Reveal>
        </section>

        <section id="journal" className="section wrap narrow">
          <Reveal>
            <p className="label">From the journal</p>
            <ul className="index">
              {ENTRIES.slice(0, 3).map((e) => (
                <li key={e.slug}>
                  <Link href={`/journal/${e.slug}`}>
                    <span className="index-t">{e.title}</span>
                    <span className="index-d">{fmtDate(e.date)}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="more"><Link className="link" href="/journal">Read the journal</Link></p>
          </Reveal>
        </section>

        <section id="contact" className="section wrap narrow contact">
          <Reveal>
            <p className="label">Write to me</p>
            <p className="contact-line">
              <a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
            <p className="contact-links">
              <a className="link" href={LINKS.github}>GitHub</a>
              <span aria-hidden>·</span>
              <a className="link" href={LINKS.linkedin}>LinkedIn</a>
            </p>
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  );
}
