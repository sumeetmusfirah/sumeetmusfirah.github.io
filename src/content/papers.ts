// Every claim here must trace to a public repo README, preregistration, or the resume.
export type Paper = {
  slug: string;
  year: string;
  venue: string; // where it lives / its status
  status: "live" | "complete" | "prereg" | "published";
  title: string;
  question: string;
  abstract: string[];
  figure?: { src: string; alt: string; caption: string };
  links: { label: string; href: string }[];
  tags: string[];
  authors?: string; // when I am not the only author
  short: string; // the name on its bubble
  bits: string[]; // tiny inner bubbles
};

export const PAPERS: Paper[] = [
  {
    slug: "axiom",
    year: "2026",
    venue: "Preprint · rebuilt from live results",
    status: "live",
    title: "Axiom: can a language model run an experiment like a scientist?",
    question: "Can a model run a lab well enough to find a hidden cause and avoid planted traps?",
    abstract: [
      "A simulated cognitive-neuroscience lab (flanker task × working-memory load × tES × EEG) with a hidden causal ground truth. Noise, individual differences and artifacts are fitted to the ERP CORE flanker dataset and validated on held-out participants with 5-fold cross-validation.",
      "An agent gets a pilot study, a budget of 30 participant-hours and standard tools. It must design experiments, analyse them, and submit a calibrated probability for every causal edge. Scoring is Brier against the truth, with no LLM judge anywhere. Planted traps (a practice effect posing as stimulation, blinks posing as frontal theta) each have a mirror task with the opposite truth.",
      "A second lab runs on 7,466 real T cells from Sachs et al. (2005). Running each model with real molecule names and again with abstract labels separates recalling textbook biology from reading the data.",
      "Status: the fit is validated, the tasks are frozen and the reference agents are scored. Language-model runs are queued on GitHub Actions. The preregistered hypotheses have no data yet.",
    ],
    figure: {
      src: "/figures/axiom/fig_validation.png",
      alt: "Histograms of simulated participants with held-out real ERP CORE participants overlaid for RT, congruency effect, accuracy, VEOG deflection rate and theta variability; all effect sizes |d| ≤ 0.28.",
      caption: "The simulator reproduces held-out ERP CORE participants (5-fold CV, all |d| ≤ 0.28).",
    },
    links: [
      { label: "Paper (PDF)", href: "https://sumeetmusfirah.github.io/axiom-neuro/axiom-neuro.pdf" },
      { label: "Project page", href: "https://sumeetmusfirah.github.io/axiom-neuro/" },
      { label: "Code", href: "https://github.com/sumeetmusfirah/axiom-neuro" },
      { label: "Preregistration", href: "https://github.com/sumeetmusfirah/axiom-neuro/blob/main/PREREGISTRATION.md" },
    ],
    tags: ["AI for science", "evaluation", "EEG", "causal inference"],
    short: "Axiom",
    bits: ["brain lab", "cell lab", "hidden traps", "no AI judge"],
  },
  {
    slug: "under-pressure",
    year: "2026",
    venue: "Project Aletheia · study complete, manuscript in preparation",
    status: "complete",
    title: "Under pressure: when the grader decides the result",
    question: "Does pushing a model toward a persuasive goal make it more manipulative?",
    abstract: [
      "Three open-weight models wrote 180 messages under four system-prompt conditions. The outputs were blind-scored on a six-dimension manipulation rubric.",
      "Under a qwen3:4b judge the result was null (all primary tests p ≥ 0.63). Under claude-sonnet-4-6, an autonomy-preserving instruction reduced manipulation-coded language (p = 0.0003 vs. pressure). The judges agreed at near chance, and the disagreement concentrated in the primary judge’s own model family. The study is reported as evaluator-sensitive.",
    ],
    links: [
      { label: "Code & data", href: "https://github.com/Project-Aletheia-org/aletheia-pressure-evals" },
      {
        label: "Judge-sensitivity summary",
        href: "https://github.com/Project-Aletheia-org/aletheia-pressure-evals/blob/main/reports/judge_sensitivity_summary.md",
      },
    ],
    tags: ["LLM evaluation", "manipulation", "LLM-as-judge"],
    short: "Under pressure",
    bits: ["two judges", "manipulation", "who grades?"],
  },
  {
    slug: "iron-minerals",
    year: "2025",
    venue: "Cement & Concrete Composites · peer-reviewed",
    status: "published",
    title: "Microbial-induced stable iron mineral production for corrosion mitigation in reinforced concrete",
    question: "Can bacteria turn rust on steel into a coat that protects it?",
    abstract: [
      "From my time as a DARPA research intern. Iron-reducing bacteria can turn the reactive rust on steel reinforcement into stable minerals that sit on the steel as a protective layer.",
      "We compared three bacterial strains under different conditions. What they were fed, and how much oxygen they had, decided how much protective mineral formed, and one strain made a comparatively dense layer.",
    ],
    authors: "Namakiaraghi, Verdú, Rahmaninezhad, Musfirah, Hubler, Najafi, Sales, Farnam",
    links: [{ label: "Paper", href: "https://doi.org/10.1016/j.cemconcomp.2025.106214" }],
    tags: ["materials", "microbiology", "co-author"],
    short: "Bacteria vs. rust",
    bits: ["bacteria", "steel", "rust", "concrete"],
  },
];

export const TALKS = [
  { where: "Grace Hopper Conference · accepted talk", what: "Can an AI Be Gaslit About Its Own Previous Answer?" },
  { where: "Penn · Mahoney Institute research symposium", what: "Neurorights & Cognitive Sovereignty in Brain–AI Systems" },
];

export const HONORS = [
  { what: "Winner, Close School Fast Pitch", where: "Drexel University · 2025" },
  { what: "Nina Henderson Provost Scholar", where: "Drexel University" },
  { what: "Winner, Aramark Disruptor Games", where: "2024" },
  { what: "Winner, National Philosophy Olympiad", where: "Pakistan · 2023" },
  { what: "Psi Chi", where: "International Honor Society in Psychology" },
];
