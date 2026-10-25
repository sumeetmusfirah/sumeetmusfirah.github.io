const selectedWork = [
  {
    title: "Reflective AI Systems",
    description:
      "Small personal tools that treat software less like a dashboard and more like a mirror: quiet systems for noticing patterns, memory, and self-understanding.",
    tag: "personal technology",
  },
  {
    title: "Open-Source Experiments",
    description:
      "Code as a public sketchbook. I like building in the open when the work is still becoming itself, especially where interface, ethics, and curiosity overlap.",
    tag: "building in public",
  },
  {
    title: "Research Threads",
    description:
      "Questions around neuroscience, cognition, and the social life of intelligent systems, approached with equal parts rigor, intuition, and aesthetic attention.",
    tag: "research + inquiry",
  },
];

const ideas = [
  "What would personal AI look like if it were designed to deepen reflection instead of flatten it?",
  "I keep returning to minds, machines, and meaning: how we model them, how we misunderstand them, and what we owe each other while building them.",
  "The most interesting technology to me is not only useful. It changes the texture of thought, attention, and identity in subtle ways.",
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 pb-24 pt-6 text-[#281f29] sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="orb left-[-5rem] top-[5rem] h-52 w-52 bg-[radial-gradient(circle,_rgba(244,198,209,0.85),_rgba(244,198,209,0.08)_72%)]" />
        <div className="orb right-[8%] top-[10%] h-72 w-72 bg-[radial-gradient(circle,_rgba(196,171,223,0.62),_rgba(196,171,223,0.08)_74%)] [animation-delay:-4s]" />
        <div className="orb bottom-[18%] left-[12%] h-64 w-64 bg-[radial-gradient(circle,_rgba(243,215,167,0.56),_rgba(243,215,167,0.06)_74%)] [animation-delay:-7s]" />
        <div className="orb bottom-[-4rem] right-[-3rem] h-80 w-80 bg-[radial-gradient(circle,_rgba(165,117,138,0.28),_rgba(165,117,138,0.04)_72%)] [animation-delay:-2s]" />
        <div className="star left-[14%] top-[12%] h-1.5 w-1.5" />
        <div className="star right-[19%] top-[18%] h-2 w-2 [animation-delay:-1s]" />
        <div className="star left-[24%] top-[38%] h-1 w-1 [animation-delay:-2s]" />
        <div className="star right-[28%] top-[46%] h-1.5 w-1.5 [animation-delay:-3s]" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <section className="glass-panel relative overflow-hidden rounded-[2rem] px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="section-grid pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative flex flex-col gap-10 lg:grid lg:grid-cols-[1.35fr_0.9fr] lg:items-center">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[rgba(102,74,101,0.14)] bg-white/55 px-4 py-2 text-[0.7rem] uppercase tracking-[0.24em] text-[#7a5d73]">
                <span className="inline-block h-2 w-2 rounded-full bg-[#d4a6b4]" />
                personal world in progress
              </div>
              <h1 className="font-display text-5xl leading-[0.95] font-semibold tracking-[-0.03em] text-[#2f2430] sm:text-6xl lg:text-7xl">
                Sumeet Musfirah
              </h1>
              <p className="mt-5 max-w-2xl text-base uppercase tracking-[0.22em] text-[#7a6174] sm:text-[0.95rem]">
                building at the intersection of neuroscience, ai, ethics, and reflective systems
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5d4d5e] sm:text-xl">
                I&apos;m interested in minds, machines, and the fragile architectures of meaning and I like building small, thoughtful systems that make inner and outer worlds easier to understand.
              </p>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[#73636f] sm:text-base">
                This site is where those threads gather: research questions, open-source experiments, reflective tools, and the aesthetics I want thoughtful technology to carry with it.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#selected-work"
                  className="rounded-full bg-[#2e232f] px-6 py-3 text-sm text-[#fff8f4] transition hover:bg-[#402f40]"
                >
                  See selected work
                </a>
                <a
                  href="#ideas"
                  className="rounded-full border border-[rgba(73,50,71,0.16)] bg-white/60 px-6 py-3 text-sm text-[#4b384a] transition hover:bg-white/80"
                >
                  Read what I&apos;m thinking about
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute inset-x-10 top-6 h-24 rounded-full bg-[rgba(246,215,221,0.55)] blur-3xl" />
              <div className="glass-panel relative rounded-[1.75rem] p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between text-[0.72rem] uppercase tracking-[0.22em] text-[#8b7283]">
                  <span>Current direction</span>
                  <span>2026</span>
                </div>
                <div className="space-y-4 text-sm leading-7 text-[#5d4d5e]">
                  <div className="rounded-[1.35rem] bg-white/70 p-4">
                    Building small personal AI systems that feel more like companions for reflection than productivity machinery.
                  </div>
                  <div className="rounded-[1.35rem] bg-[rgba(250,242,236,0.82)] p-4">
                    Thinking seriously about how neuroscience, ethics, and interface design should shape the tools we invite into inner life.
                  </div>
                  <div className="rounded-[1.35rem] border border-[rgba(92,68,89,0.12)] bg-[rgba(255,250,246,0.74)] p-4">
                    Drawn to open-source experimentation, research questions with texture, and technology that leaves room for meaning.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]"
        >
          <div className="glass-panel rounded-[1.75rem] p-6 sm:p-8">
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[#8c7282]">
              About
            </p>
            <h2 className="font-display mt-4 text-4xl leading-tight text-[#2f2430] sm:text-5xl">
              Thoughtful systems, beautiful questions, and a slightly dreamy way of building.
            </h2>
          </div>
          <div className="glass-panel rounded-[1.75rem] p-6 text-[15px] leading-8 text-[#5f505f] sm:p-8 sm:text-base">
            <p>
              I&apos;m an undergraduate student, but more importantly I&apos;m someone who keeps circling the same deep fascinations: how minds work, how technologies shape attention and identity, and how to build systems that feel more humane than extractive.
            </p>
            <p className="mt-4">
              My taste leans toward work that is rigorous without becoming cold, personal without becoming vague, and aesthetically precise without losing intellectual depth. I&apos;m interested in tools, research, and experiments that make people feel more awake to themselves and to one another.
            </p>
          </div>
        </section>

        <section
          id="selected-work"
          className="glass-panel rounded-[2rem] px-6 py-7 sm:px-8 sm:py-8"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[#8c7282]">
                Selected Work
              </p>
              <h2 className="font-display mt-3 text-4xl leading-tight text-[#2f2430] sm:text-5xl">
                A few current constellations.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#6d5b69] sm:text-base">
              Not a complete archive. More like the threads I want someone to notice first.
            </p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {selectedWork.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-[rgba(97,73,94,0.12)] bg-[rgba(255,250,246,0.72)] p-5 shadow-[0_16px_50px_rgba(76,53,74,0.08)]"
              >
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#967889]">
                  {item.tag}
                </p>
                <h3 className="font-display mt-4 text-2xl text-[#322634]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#5f505f] sm:text-[0.96rem]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="ideas"
          className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[#8c7282]">
              Ideas / Thinking
            </p>
            <h2 className="font-display mt-4 text-4xl leading-tight text-[#2f2430] sm:text-5xl">
              The questions underneath the work.
            </h2>
            <div className="mt-7 space-y-4">
              {ideas.map((idea) => (
                <div
                  key={idea}
                  className="rounded-[1.4rem] border border-[rgba(97,73,94,0.1)] bg-white/60 p-4 text-sm leading-7 text-[#5f505f] sm:text-base"
                >
                  {idea}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
            <div className="absolute right-6 top-6 h-28 w-28 rounded-full bg-[radial-gradient(circle,_rgba(233,195,207,0.5),_rgba(233,195,207,0.02)_72%)] blur-2xl" />
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[#8c7282]">
              Atmosphere
            </p>
            <div className="mt-5 rounded-[1.6rem] border border-[rgba(100,76,96,0.12)] bg-[linear-gradient(180deg,rgba(255,251,247,0.9),rgba(248,239,236,0.74))] p-5">
              <p className="font-display text-3xl leading-tight text-[#332735]">
                I want this site to feel less like a resume and more like a living interior.
              </p>
              <p className="mt-4 text-sm leading-7 text-[#5f505f] sm:text-base">
                Somewhere between a studio table, a research notebook, and a future-facing diary. Clear enough to navigate, soft enough to linger in, and distinctive enough to remember.
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-[#7f6578]">
              <span className="rounded-full bg-white/65 px-3 py-2">neuroscience</span>
              <span className="rounded-full bg-white/65 px-3 py-2">ai</span>
              <span className="rounded-full bg-white/65 px-3 py-2">ethics</span>
              <span className="rounded-full bg-white/65 px-3 py-2">reflection</span>
              <span className="rounded-full bg-white/65 px-3 py-2">open source</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
