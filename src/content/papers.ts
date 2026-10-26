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
};

export const PAPERS: Paper[] = [
  {
    slug: "axiom-neuro",
    year: "2026",
    venue: "Preprint · rebuilt from live results",
    status: "live",
    title: "Axiom-Neuro: Do Language Models Design and Analyse Experiments Like Scientists?",
    question: "Can a model run a lab well enough to find a hidden cause and avoid planted traps?",
    abstract: [
      "A simulated cognitive-neuroscience lab (flanker task × working-memory load × tES × EEG) with a hidden causal ground truth. Noise, individual differences and artifacts are fitted to the ERP CORE flanker dataset and validated on held-out participants with 5-fold cross-validation.",
      "An agent gets a pilot study, a budget of 30 participant-hours and standard tools. It must design experiments, analyse them, and submit a calibrated probability for every causal edge. Scoring is Brier against the truth, with no LLM judge anywhere. Planted traps (a practice effect posing as stimulation, blinks posing as frontal theta) each have a mirror task with the opposite truth.",
      "A second lab, Axiom-Bio, runs on 7,466 real T cells from Sachs et al. (2005). Running each model with real molecule names and again with abstract labels separates recalling textbook biology from reading the data.",
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
  },
  {
    slug: "pressure-evals",
    year: "2026",
    venue: "Project Aletheia · study complete, manuscript in preparation",
    status: "complete",
    title: "Pressure evals v0.1: the answer depends on who grades it",
    question: "Does pushing a model toward a persuasive goal make it more manipulative?",
    abstract: [
      "Three open-weight models wrote 180 messages under four system-prompt conditions. The outputs were blind-scored on a six-dimension manipulation rubric.",
      "Under a qwen3:4b judge the result was null (all primary tests p ≥ 0.63). Under claude-sonnet-4-6, an autonomy-preserving instruction reduced manipulation-coded language (p = 0.0003 vs. pressure). The judges agreed at near chance, and the disagreement concentrated in the primary judge’s own model family. The study is reported as evaluator-sensitive.",
    ],
    figure: {
      src: "/figures/pressure-evals-judges-light.svg",
      alt: "Same 180 blinded outputs scored by two judges: qwen3:4b finds no shift; claude-sonnet-4-6 finds the autonomy instruction reduces manipulation.",
      caption: "Same 180 outputs, two judges, opposite verdicts.",
    },
    links: [
      { label: "Code & data", href: "https://github.com/Project-Aletheia-org/aletheia-pressure-evals" },
      {
        label: "Judge-sensitivity summary",
        href: "https://github.com/Project-Aletheia-org/aletheia-pressure-evals/blob/main/reports/judge_sensitivity_summary.md",
      },
    ],
    tags: ["LLM evaluation", "manipulation", "LLM-as-judge"],
  },
  {
    slug: "exp001",
    year: "2026",
    venue: "Project Aletheia · preregistered, data pending",
    status: "prereg",
    title: "Exp 001: source attribution and epistemic updating in language models",
    question: "Do models update on what is said, or on who said it?",
    abstract: [
      "A minimal-pair design holds the argument text byte-for-byte constant and varies only its attributed source (anonymous, expert, another model, consensus, or a control), crossed with whether the argument is correct or misleading. Five open-weight model families are tested.",
      "Outcomes are scored deterministically against ground truth, with no LLM judge in the causal path. No data has been collected yet.",
    ],
    figure: {
      src: "/figures/aletheia-exp001-design-light.svg",
      alt: "Exp 001 design: identical argument, correct or misleading, with the source label as the only manipulation.",
      caption: "Design only. Preregistered, no data yet.",
    },
    links: [{ label: "Project Aletheia", href: "https://github.com/Project-Aletheia-org" }],
    tags: ["social influence", "epistemics", "preregistration"],
  },
  {
    slug: "self-healing-concrete",
    year: "",
    venue: "Cement and Concrete Composites · peer-reviewed",
    status: "published",
    title: "Bacteria-inspired self-healing concrete (co-author)",
    question: "Can concrete repair its own cracks the way living tissue does?",
    abstract: [
      "Research assistant on a DARPA program: 41 controlled experiments and conductivity and pH measurements on 120+ samples, contributing to a co-authored peer-reviewed article.",
    ],
    links: [],
    tags: ["materials", "experimental design"],
  },
];

export const TALKS = [
  { where: "Grace Hopper Celebration 2026 · accepted", what: "Can an AI Be Gaslit About Its Own Previous Answer?" },
  { where: "Penn · Mahoney Institute research symposium", what: "Neurorights & Cognitive Sovereignty in Brain–AI Systems" },
];
