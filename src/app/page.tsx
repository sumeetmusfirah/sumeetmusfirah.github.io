import Edges from "@/components/Edges";
import Field from "@/components/Field";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <main className="home">
      <Field />
      <Edges />
      <div className="overlay">
        <Nav />
        <div>
          <h1 className="line">Hi, I&rsquo;m Sumeet.</h1>
          <p className="sub">
            I study neuroscience and psychology at Drexel, and I test whether AI models can be talked out of the
            truth.
          </p>
          <p className="hint">(click anywhere)</p>
        </div>
      </div>
    </main>
  );
}
