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
    question: "Can an AI model work like a scientist?",
    abstract: [
      "Axiom puts AI models in the role of a scientist. Each one gets a simulated lab with a hidden cause to find, and has to design experiments, run them, analyse the data and say how sure it is.",
      "The labs are built from real data: EEG recordings from the ERP CORE study and real immune cells from Sachs et al. (2005). Some tasks hide a trap that human researchers fall for.",
      "We watch and measure how each model behaves along the way, from the experiments it chooses to how well its confidence matches the truth. Scoring is plain arithmetic against the known answer, with no AI judge.",
      "Where it stands: the labs are built and checked, the model runs are going now, and every result is added to a public dataset as it comes in.",
    ],
    links: [
      { label: "Abstract (PDF)", href: "/axiom-abstract.pdf" },
      { label: "Results data", href: "https://github.com/sumeetmusfirah/axiom-neuro/tree/main/results" },
      { label: "EEG data (ERP CORE)", href: "https://erpinfo.org/erp-core" },
      { label: "Cell data (Sachs 2005)", href: "https://zenodo.org/records/7681811" },
      { label: "Code", href: "https://github.com/sumeetmusfirah/axiom-neuro" },
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
      "Three open models wrote persuasive messages under different instructions, and two AI judges scored how manipulative each message was.",
      "One judge saw no change at all. The other saw a clear drop when the model was told to respect the reader's choice. The two judges barely agreed, so the honest answer is that it depends on who does the grading.",
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
    title: "Microbial-Induced Stable Iron Mineral Production for Corrosion Mitigation Application in Reinforced Concrete",
    question: "Can bacteria turn rust on steel into a coat that protects it?",
    abstract: [
      "From my time as a DARPA research intern. Iron-reducing bacteria can turn the reactive rust on steel reinforcement into stable minerals that sit on the steel as a protective layer.",
      "We compared three bacterial strains under different conditions. What they were fed, and how much oxygen they had, decided how much protective mineral formed, and one strain made a comparatively dense layer.",
    ],
    authors: "Namakiaraghi, Verdú, Rahmaninezhad, Musfirah, Hubler, Najafi, Sales, Farnam",
    links: [
      { label: "Paper", href: "https://doi.org/10.1016/j.cemconcomp.2025.106214" },
      {
        label: "ResearchGate",
        href: "https://www.researchgate.net/publication/393347642_Microbial-Induced_Stable_Iron_Mineral_Production_for_Corrosion_Mitigation_Application_in_Reinforced_Concrete",
      },
    ],
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
  { what: "Psi Chi", where: "International Honor Society in Psychology" },
];
