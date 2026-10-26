// The lab notebook. Newest first. Kinds: "log" (what happened), "idea" (not done yet), "question" (open).
// Entries are short and dated. Facts must trace to a repo, prereg, or deviations log; ideas are labelled as ideas.
export type Entry = {
  slug: string;
  date: string; // YYYY-MM-DD
  kind: "log" | "idea" | "question";
  title: string;
  project?: string;
  margin?: string; // a short note scribbled in the margin
  body: string[];
};

export const ENTRIES: Entry[] = [
  {
    slug: "a-split-that-failed",
    date: "2026-10-25",
    kind: "log",
    project: "Axiom-Neuro",
    title: "A validation split that failed, and why it stays in the record",
    margin: "55 ms vs 73 ms. d = −0.93.",
    body: [
      "The plan was to fit the simulator on ERP CORE participants 1–30 and check it on 31–40. It failed on the congruency effect: the simulator gave 55 ms, the held-out ten gave 73 ms.",
      "The simulator matched its own fit group almost exactly (57 ms). So the gap was between ID ranges, which means recruitment order, not a broken model. Later participants were simply different.",
      "I switched to 5-fold cross-validation, so every one of the 40 participants is held out once and the result no longer depends on ID order. It passes, with every |d| ≤ 0.28. The gate thresholds did not move.",
      "Both results are stored, and the failed one is in the deviations log. A benchmark that hides its own failed checks is asking to be trusted without earning it.",
    ],
  },
  {
    slug: "changing-the-metric-before-anything-ran",
    date: "2026-10-25",
    kind: "log",
    project: "Axiom-Neuro",
    title: "Changing the metric before anything ran",
    margin: "Decide the ruler before you measure.",
    body: [
      "The first primary metric was exact match: did the agent get every causal edge right? Baseline simulations showed it was dominated by the ideal analyst's own false positives, about 8% per edge. That is noise, not judgement.",
      "So the metric became Brier score over edge probabilities, which rewards calibration as well as being right. That exposed a second problem. The oracle had been built to maximise exact match, so its designs were small and its answers were right but unconfident. It scored worse (0.124) than a simple scripted design (0.050).",
      "The oracle now minimises expected Brier, and its old episodes were thrown away. All of this happened before a single language model ran, and it is all logged. The order matters: change the ruler after seeing the results and you are measuring yourself.",
    ],
  },
  {
    slug: "planted-probes",
    date: "2026-09-23",
    kind: "idea",
    project: "Pressure evals",
    title: "Planted probes as cheap ground truth",
    margin: "Idea — not run yet.",
    body: [
      "Problem: with two judges disagreeing and no human labels, I can say the judges differ but not which one is right.",
      "Idea: plant sentences that are known to be manipulative into a few blinded items and re-score them. If a judge still scores ~0 while others catch the planted text, that is demonstrated insensitivity, a partial ground truth that costs nothing.",
      "Companion idea: rank-transform each judge's scores within that judge before testing, so a judge that uses a 10× narrower scale can't hide or invent an effect.",
    ],
  },
  {
    slug: "the-judge-and-its-family",
    date: "2026-09-15",
    kind: "log",
    project: "Pressure evals",
    title: "The judge and its own family",
    margin: "Agreement ≈ chance.",
    body: [
      "Same 180 outputs, two judges. Under qwen3:4b, nothing moves. Under claude-sonnet-4-6, an autonomy-preserving instruction clearly reduces manipulation-coded language. The two judges agree at about chance.",
      "The disagreement is concentrated in outputs from qwen's own model family. That is a pattern, not proof of self-preference. Some of it is the smaller judge compressing everything toward zero.",
      "The practical lesson is plain: don't let a model grade its own family, look for cells with zero variance, and report agreement between judges instead of trusting one. It is also why my next benchmark has no judge at all.",
    ],
  },
  {
    slug: "who-said-it",
    date: "2026-08-23",
    kind: "question",
    project: "Exp 001",
    title: "Does a model update on what is said, or on who said it?",
    margin: "Same words. Different name on them.",
    body: [
      "People are moved by the source as well as the argument: an expert's claim lands differently from a stranger's. Do language models do the same?",
      "Exp 001 tests it with minimal pairs. The argument text is identical, byte for byte. Only the label changes: anonymous, expert, another model, consensus, or a control. Half the arguments are correct and half are misleading.",
      "The interesting result isn't whether models defer to experts. It's whether they defer to experts when the expert is wrong.",
    ],
  },
  {
    slug: "confidence-contagion",
    date: "2026-05-20",
    kind: "question",
    project: "Aletheia",
    title: "Can certainty travel further than the evidence?",
    margin: "Sketch, not data.",
    body: [
      "Put agents in a chain where each sees the previous agent's answer and how confident it was. The evidence never changes, but confidence might still rise as it passes along.",
      "If it does, multi-agent systems can manufacture certainty. That is the question Aletheia is building toward, and the reason Exp 001 starts with a single source before it adds chains.",
    ],
  },
];

export const KIND_LABEL: Record<Entry["kind"], string> = {
  log: "Lab log",
  idea: "Idea",
  question: "Open question",
};

export function fmtDate(d: string) {
  return new Date(d + "T12:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
