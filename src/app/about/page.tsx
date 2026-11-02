import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "About — Sumeet Musfirah",
  description: "Neuroscience and psychology at Drexel University; research on how minds, human and machine, decide what to trust.",
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
                I started with brains: theory of mind, and later cognitive neuroscience at Drexel. The question
                that kept following me was how a mind decides what to trust. Now I ask it of language models too:
                when they hold their ground, when they give way, and whether the tools we use to judge them can be
                trusted at all.
              </p>
              <p>
                Along the way I have worked on materials for DARPA, built AI for medicine, and made a card game
                about South Asian culture.
              </p>
            </div>
            <ul className="path">
              {PATH.map((x) => (
                <li key={x.where}>
                  <span>{x.what}</span>
                  <span className="dim">{x.where}</span>
                </li>
              ))}
            </ul>
            <p className="dim small">
              B.S. Research &amp; Experimental Psychology, Drexel University · minors in Neuroscience and Data Science
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
