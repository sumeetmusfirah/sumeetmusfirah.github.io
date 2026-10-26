import Link from "next/link";
import Figure from "@/components/Figure";
import Footer from "@/components/Footer";
import Motif from "@/components/Motif";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import Ticker from "@/components/Ticker";
import { ENTRIES, KIND_LABEL, fmtDate } from "@/content/journal";

const EMAIL = "sumeetmusfirah23@gmail.com";
const LINKS = {
  github: "https://github.com/sumeetmusfirah",
  linkedin: "https://www.linkedin.com/in/sumeetmusfirah",
  aletheia: "https://github.com/Project-Aletheia-org",
  pressure: "https://github.com/Project-Aletheia-org/aletheia-pressure-evals",
  pressureReport:
    "https://github.com/Project-Aletheia-org/aletheia-pressure-evals/blob/main/reports/judge_sensitivity_summary.md",
  // TODO: add once available: orcid, scholar, cv
};


const PATH = [
  { when: "2020–23", what: "Theory-of-mind research & Project MYELIN outreach", where: "International Youth Neuroscience Association" },
  { when: "2022", what: "R&D co-op: polymers, surfactants, guar chemistry", where: "Syensqo / Solvay" },
  { when: "2022–23", what: "41 experiments on bacteria-inspired self-healing concrete; co-authored paper", where: "DARPA BRACE program" },
  { when: "2024–", what: "EEG & neuromodulation ML pipelines", where: "CogNeW Lab, Drexel" },
  { when: "2026", what: "Production RAG, multimodal models, clinical LLM evaluation", where: "American Board of Internal Medicine" },
  { when: "2026", what: "Accepted talk on gaslighting LLMs", where: "Grace Hopper Celebration" },
  { when: "now", what: "Epistemic behavior of language models", where: "Project Aletheia" },
];

const SIDE = [
  { k: "Quant · Python", t: "Volatility Crash Simulator", d: "Monte Carlo over 100,000+ S&P 500 crash scenarios, pairing GARCH(1,1) with an LSTM to study how markets buckle under uncertainty." },
  { k: "Sports analytics", t: "F1 podium predictions", d: "Forecasting Grand Prix podiums from driver stats, weather, and track profiles. Quant logic applied to a sport I love." },
  { k: "Game design · community", t: "Chai & Charades", d: "A South Asian card game of memes, icons, and food references. It started for fun and grew into a community project about representation." },
];

const SIGNALS = [
  { k: "Talk", big: "GHC 2026", p: "Accepted: “Can an AI Be Gaslit About Its Own Previous Answer?”" },
  { k: "Finding", big: "2 judges", p: "Same 180 outputs, opposite verdicts on manipulation. The grader decided." },
  { k: "Applied AI", big: "10.5K+", p: "physician discussions made searchable with cited answers at ABIM." },
  { k: "Neuro", big: "100+", p: "participants’ EEG and behavioral data through ML pipelines at CogNeW." },
];

export default function Home() {
  return (
    <>
      <Nav />

      <main id="top">
        {/* ── Hero ── */}
        <header className="hero">
          <div className="wrap hero-grid">
            <div>
              <p className="kicker">
                Research notebook <b>·</b> AI × Cognition × Neuro
              </p>
              <h1 className="h1">Sumeet Musfirah</h1>
              <p className="tagline">Studying intelligence across biological and artificial systems.</p>
              <p className="lede">
                <strong>Neuroscience &amp; AI researcher at Drexel University.</strong> I study how language
                models, and the people who use them, decide <em>whom to believe</em>. I work across AI
                evaluation research and applied AI engineering, and I build the infrastructure myself.
              </p>
              <Ticker />
              <div className="cta">
                <a className="btn btn-primary" href={`mailto:${EMAIL}`}>Get in touch →</a>
                <a className="btn" href={LINKS.github}>GitHub</a>
                <a className="btn" href={LINKS.linkedin}>LinkedIn</a>
              </div>
            </div>
            <figure className="portrait">
              <span className="orbit" aria-hidden />
              <span className="dot" aria-hidden />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/portrait.jpg" alt="Portrait of Sumeet Musfirah" />
              <figcaption className="kicker">fig. 1: the researcher</figcaption>
            </figure>
          </div>
          <div className="wrap">
            <Motif className="hero-motif" />
          </div>
        </header>

        {/* ── Signal ── */}
        <section className="wrap" aria-label="Highlights" style={{ paddingBottom: 72 }}>
          <Reveal>
            <div className="signals">
              {SIGNALS.map((s) => (
                <div key={s.k}>
                  <p className="kicker">{s.k}</p>
                  <p className="big">{s.big}</p>
                  <p>{s.p}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>


        {/* ── About ── */}
        <section id="about" className="section">
          <div className="wrap">
            <Reveal className="section-head">
              <p className="kicker">00 · About</p>
              <h2 className="h2">
                Minds first, then <em>machines</em>.
              </h2>
            </Reveal>
            <div className="about-grid">
              <Reveal className="about-text">
                <p>
                  I started with brains: theory-of-mind research and neuroscience outreach as a teenager,
                  then EEG and machine learning in Drexel&rsquo;s CogNeW Lab. The question that kept
                  following me was how a mind decides what to trust. Now I ask it of language models. I
                  measure when they hold their ground, when they cave to pressure, and whether the tools
                  we use to grade them can be trusted at all.
                </p>
                <p>
                  Along the way I have run materials experiments for a DARPA program, shipped production
                  AI in medicine, and built a card game about South Asian culture. I like work that is
                  rigorous enough to defend and human enough to matter.
                </p>
                <p className="degree">
                  <span className="kicker">Education</span>
                  Drexel University · B.S. Research &amp; Experimental Psychology · minors in Neuroscience
                  and Data Science · expected 2028 · Nina Henderson Provost Scholar · Psi Chi
                </p>
                <p className="degree">
                  <span className="kicker">Languages</span>
                  English · Urdu · Hindi · French
                </p>
              </Reveal>
              <Reveal delay={120}>
                <ol className="path">
                  {PATH.map((x) => (
                    <li key={x.what}>
                      <span className="when">{x.when}</span>
                      <span className="what">{x.what}</span>
                      <span className="where">{x.where}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Research ── */}
        <section id="research" className="section">
          <div className="wrap">
            <Reveal className="section-head">
              <p className="kicker">01 · Research</p>
              <h2 className="h2">
                When should an agent <em>change its mind</em> because of another agent?
              </h2>
            </Reveal>

            <Reveal className="entry">
              <div>
                <p className="kicker">Axiom-Neuro</p>
                <p style={{ marginTop: 10 }}><span className="status">running · preprint</span></p>
              </div>
              <div>
                <h3 className="h3">Do language models design and analyse experiments like scientists?</h3>
                <p className="q">Can a model run a lab well enough to find a hidden cause and avoid planted traps?</p>
                <p>
                  A simulated cognitive-neuroscience lab fitted to real human EEG (ERP CORE), plus a second lab on
                  real single cells. Agents design experiments, analyse them and submit calibrated causal claims.
                  Scoring is arithmetic against the hidden truth, with no LLM judge anywhere. Language-model runs
                  are in progress.
                </p>
                <p style={{ marginTop: 12 }}>
                  <Link className="link" href="/research#axiom-neuro">Read more</Link> ·{" "}
                  <a className="link" href="https://github.com/sumeetmusfirah/axiom-neuro">Repository</a>
                </p>
              </div>
            </Reveal>

            <Reveal className="entry">
              <div>
                <p className="kicker">Project Aletheia</p>
                <p style={{ marginTop: 10 }}><span className="status done">complete · public</span></p>
              </div>
              <div>
                <h3 className="h3">Pressure evals v0.1: the answer depends on who grades it</h3>
                <p className="q">Does pushing a model toward a persuasive goal make it more manipulative?</p>
                <p>
                  Three open-weight models wrote 180 messages under four system-prompt conditions. The
                  outputs were blind-scored on a six-dimension manipulation rubric. Under a{" "}
                  <span className="mono">qwen3:4b</span> judge the result was null (all primary tests p ≥ 0.63).
                  Under <span className="mono">claude-sonnet-4-6</span>, an autonomy-preserving instruction
                  reduced manipulation-coded language (p = 0.0003 vs. pressure). The judges agreed at near
                  chance, and the disagreement concentrated in the primary judge&rsquo;s own outputs. So the
                  study is reported as <em>evaluator-sensitive</em>.
                </p>
                <p style={{ marginTop: 12 }}>
                  <a className="link" href={LINKS.pressure}>Repository</a> ·{" "}
                  <a className="link" href={LINKS.pressureReport}>Judge-sensitivity summary</a>
                </p>
                <Figure name="pressure-evals-judges" alt="Same 180 blinded outputs scored by two judges: qwen3:4b finds no shift; claude-sonnet-4-6 finds the autonomy instruction reduces manipulation (p = 0.0003 vs. pressure). Verdict: evaluator-sensitive." />
              </div>
            </Reveal>

            <Reveal className="entry">
              <div>
                <p className="kicker">Project Aletheia</p>
                <p style={{ marginTop: 10 }}><span className="status">preregistered · data pending</span></p>
              </div>
              <div>
                <h3 className="h3">Exp 001: source attribution and epistemic updating</h3>
                <p className="q">Do models update on <em>what</em> is said, or on <em>who</em> said it?</p>
                <p>
                  A minimal-pair design holds the argument text byte-for-byte constant and varies only its
                  attributed source (anonymous, expert, another model, consensus, or a control), crossed with
                  whether the argument is correct or misleading. Five open-weight model families are tested.
                  Outcomes are scored deterministically against ground truth, with no LLM judge in the causal
                  path.
                </p>
                <Figure name="aletheia-exp001-design" alt="Exp 001 design: identical argument, correct or misleading, with the source label as the only manipulation; five model families; deterministic outcomes. Preregistered, no data yet." />
              </div>
            </Reveal>

            <Reveal className="entry">
              <div>
                <p className="kicker">Open thread</p>
                <p style={{ marginTop: 10 }}><span className="status">sketch · not data</span></p>
              </div>
              <div>
                <h3 className="h3">Confidence contagion and information cascades</h3>
                <p className="q">Can certainty travel further than the evidence that justified it?</p>
                <p>
                  When agents see each other&rsquo;s answers and confidence, belief can propagate along a chain
                  even while the evidence never changes. This is the multi-agent question Aletheia is
                  building toward. Persuasion Topography, an early-stage taxonomy of emotional, authority,
                  and epistemic pressures on models, feeds into it.
                </p>
                <Figure name="confidence-cascade" alt="Sketch, not data: eight agents in a chain adopt the previous agent's answer and raise their confidence while the evidence stays unchanged." />
              </div>
            </Reveal>
            <Link className="btn more" href="/research">All papers &amp; preprints →</Link>
          </div>
        </section>

        {/* ── Journal teaser ── */}
        <section id="journal" className="section">
          <div className="wrap">
            <Reveal className="section-head">
              <p className="kicker">From the journal</p>
              <h2 className="h2">
                The <em>working</em>, not just the results.
              </h2>
            </Reveal>
            <div className="notes">
              {ENTRIES.slice(0, 3).map((e) => (
                <Link key={e.slug} className="note" href={`/journal/${e.slug}`}>
                  <p className="kicker">{fmtDate(e.date)} · {KIND_LABEL[e.kind]}</p>
                  <h3 className="h3">{e.title}</h3>
                  <svg viewBox="0 0 200 8" preserveAspectRatio="none" aria-hidden><line x1="2" y1="4" x2="198" y2="4" /></svg>
                </Link>
              ))}
            </div>
            <Link className="btn more" href="/journal">Open the notebook →</Link>
          </div>
        </section>

        {/* ── Applied AI & data science ── */}
        <section id="applied" className="section" style={{ background: "var(--bg-2)" }}>
          <div className="wrap">
            <Reveal className="section-head">
              <p className="kicker">02 · Applied AI & data science</p>
              <h2 className="h2">
                Research taste, <em>production</em> hands.
              </h2>
            </Reveal>
            <div className="cards">
              <Reveal className="card">
                <p className="kicker">American Board of Internal Medicine · 2026</p>
                <h3 className="h3" style={{ marginTop: 8 }}>AI Developer, Emerging Technologies</h3>
                <ul>
                  <li>Evidence retrieval and synthesis over 10.5K+ physician discussions and PubMed, combining pgvector semantic search and reciprocal rank fusion to return cited answers.</li>
                  <li>Took it to production on AWS (EC2, RDS, S3, ECR) with Docker and OIDC-based CI/CD.</li>
                  <li>A multimodal physician-assessment model: RTMPose and audio features feeding a LoRA fine-tuned Qwen2.5-1.5B classifier.</li>
                  <li>An LLM evaluation workflow that flags rule violations and recurring errors in AI-generated clinical cases.</li>
                </ul>
              </Reveal>
              <Reveal className="card" delay={120}>
                <p className="kicker">CogNeW Lab, Drexel · PI John Medaglia</p>
                <h3 className="h3" style={{ marginTop: 8 }}>Machine Learning Research Assistant</h3>
                <ul>
                  <li>Reproducible Python pipelines for EEG and behavioral data from 100+ participants: synchronization, artifact rejection, and time-series features.</li>
                  <li>Cross-validated Random Forest and SVM models relating EEG features to neuromodulation outcomes and markers of cognitive control.</li>
                </ul>
              </Reveal>
            </div>
            <Reveal>
              <dl className="stack">
                <dt>Modeling</dt><dd>Python · PyTorch · Hugging Face · scikit-learn · LoRA fine-tuning</dd>
                <dt>LLM systems</dt><dd>vLLM · Ollama · OpenAI & Anthropic APIs · structured outputs · LLM-as-judge</dd>
                <dt>Evaluation</dt><dd>preregistration · frozen configs · hashed artifacts · deterministic scoring · permutation tests</dd>
                <dt>Data & retrieval</dt><dd>PostgreSQL / pgvector · semantic search · RRF · FastAPI · SQL</dd>
                <dt>Signals & vision</dt><dd>EEG / time-series · RTMPose · YOLO · audio features</dd>
                <dt>Infrastructure</dt><dd>Docker · AWS · CI/CD · Linux · NVIDIA DGX Spark</dd>
              </dl>
            </Reveal>
          </div>
        </section>

        {/* ── Questions ── */}
        <section id="questions" className="section">
          <div className="wrap">
            <Reveal className="section-head">
              <p className="kicker">03 · Open questions</p>
              <h2 className="h2">What I&rsquo;d like to <em>know</em>.</h2>
            </Reveal>
            <Reveal>
              <ol className="questions">
                <li><span>When should an artificial agent update its beliefs after observing another agent?</span></li>
                <li><span>Can confidence spread between models independently of evidence?</span></li>
                <li><span>Can social-cognition paradigms expose model failures that benchmarks miss?</span></li>
                <li><span>How should we measure epistemic autonomy in multi-agent AI systems?</span></li>
              </ol>
            </Reveal>
          </div>
        </section>

        {/* ── Talks ── */}
        <section id="talks" className="section">
          <div className="wrap">
            <Reveal className="section-head">
              <p className="kicker">04 · Talks & writing</p>
              <h2 className="h2">Out in the <em>world</em>.</h2>
            </Reveal>
            <Reveal>
              <ul className="talks">
                <li><span className="kicker">GHC 2026 · accepted</span><span className="serif" style={{ fontSize: 20 }}>Can an AI Be Gaslit About Its Own Previous Answer?</span></li>
                <li><span className="kicker">Penn · Mahoney Institute</span><span className="serif" style={{ fontSize: 20 }}>Neurorights &amp; Cognitive Sovereignty in Brain–AI Systems (research symposium)</span></li>
                <li><span className="kicker">Publication</span><span className="serif" style={{ fontSize: 20 }}>Co-author, peer-reviewed article on bacteria-inspired self-healing concrete. <em>Cement and Concrete Composites</em></span></li>
              </ul>
            </Reveal>
          </div>
        </section>


        {/* ── Off the clock ── */}
        <section className="section">
          <div className="wrap">
            <Reveal className="section-head">
              <p className="kicker">05 · Off the clock</p>
              <h2 className="h2">Things I built because I <em>wanted to</em>.</h2>
            </Reveal>
            <div className="side">
              {SIDE.map((x, i) => (
                <Reveal key={x.t} className="card" delay={i * 90}>
                  <p className="kicker">{x.k}</p>
                  <h3 className="h3" style={{ marginTop: 8 }}>{x.t}</h3>
                  <p style={{ marginTop: 10, fontSize: 15.5 }}>{x.d}</p>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <p className="honors">
                <span className="kicker">Honors</span> Winner, Drexel Close School Fast Pitch (2025) · Winner,
                Aramark Disruptor Games (2024) · Winner, National Philosophy Olympiad, Pakistan (2023)
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="contact">
          <div className="wrap">
            <Reveal>
              <p className="kicker">06 · Contact</p>
              <h2 className="h2">
                Working on how models <em>decide what to believe</em>? Let&rsquo;s talk.
              </h2>
              <div className="cta">
                <a className="btn btn-primary" href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <a className="btn" href={LINKS.linkedin}>LinkedIn</a>
                <a className="btn" href={LINKS.github}>GitHub</a>
                <a className="btn" href={LINKS.aletheia}>Project Aletheia</a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
