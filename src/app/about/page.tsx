import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { HONORS } from "@/content/papers";

export const metadata: Metadata = {
  title: "About — Sumeet Musfirah",
  description: "Neuroscience and psychology at Drexel University, and AI alignment research.",
};

const PATH = [
  { what: "Research", where: "Chrysikou Lab, Drexel University" },
  { what: "AI Developer", where: "American Board of Internal Medicine" },
  { what: "Research intern", where: "DARPA" },
  { what: "R&D co-op", where: "Syensqo" },
  { what: "Neuroscience outreach", where: "International Youth Neuroscience Association" },
];

export default function About() {
  return (
    <>
      <Nav current="about" />
      <main className="page">
        <div className="about">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="portrait" src="/img/portrait.jpg" alt="Portrait of Sumeet Musfirah" />
          <div>
            <h1 className="title">About</h1>
            <div className="prose">
              <p>
                What got me into neuroscience was consciousness: how we perceive the world around us. It got
                personal when I discovered I don&apos;t have an internal monologue.
              </p>
              <p>Right now I&apos;m working on a few AI alignment projects.</p>
              <p>
                When I&apos;m not studying, I&apos;m busy being an RA and putting together fun events for PSA at
                Drexel, since I&apos;m on the e-board.
              </p>
              <p>I love making small talk with strangers and sharing random tidbits of life.</p>
            </div>
            <ul className="path">
              {PATH.map((x) => (
                <li key={x.where}>
                  <span>{x.what}</span>
                  <span className="dim">{x.where}</span>
                </li>
              ))}
            </ul>
            <p className="label" style={{ marginTop: 34 }}>Honors &amp; wins</p>
            <ul className="path" style={{ marginTop: 0 }}>
              {HONORS.map((x) => (
                <li key={x.what}>
                  <span>{x.what}</span>
                  <span className="dim">{x.where}</span>
                </li>
              ))}
            </ul>
            <p className="p-links" style={{ marginTop: 26 }}>
              <a className="link" href="https://github.com/sumeetmusfirah">GitHub</a>
              <a className="link" href="https://www.linkedin.com/in/sumeetmusfirah">LinkedIn</a>
              <a className="link" href="https://www.researchgate.net/profile/Sumeet-Musfirah">ResearchGate</a>
            </p>
            <p className="dim small" style={{ marginTop: 18 }}>
              B.S. Research &amp; Experimental Psychology, Drexel University · minors in Neuroscience and Data Science
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
