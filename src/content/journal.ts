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
    project: "Axiom",
    title: "A check that failed, and why it stays in the record",
    body: [
      "I built a simulated lab from real brain recordings, then checked it against people it had never seen. It failed. The first group of volunteers and the later group were simply different, and my split had put one group on each side.",
      "So I changed the check so that everyone takes a turn being the unseen person. That version passes. The failed one is still written down, next to the one that worked.",
      "A benchmark that hides its own failed checks is asking to be trusted without earning it.",
    ],
  },
  {
    slug: "changing-the-metric-before-anything-ran",
    date: "2026-10-25",
    kind: "log",
    project: "Axiom",
    title: "Choosing the ruler before measuring",
    body: [
      "My first way of scoring was all or nothing: did you get every answer right? It mostly measured luck. I switched to a score that also rewards knowing how sure you are.",
      "I made the change before a single model ran, and logged it. Change the ruler after you see the results and you are only measuring yourself.",
    ],
  },
  {
    slug: "planted-probes",
    date: "2026-09-23",
    kind: "idea",
    project: "Under pressure",
    title: "Hiding a known answer inside the test",
    body: [
      "When two judges disagree and no person has checked the answers, I can say they differ but not who is right.",
      "An idea, not yet tried: slip in a few sentences that are plainly manipulative and see which judge notices. It is a small piece of truth that costs nothing.",
    ],
  },
  {
    slug: "the-judge-and-its-family",
    date: "2026-09-15",
    kind: "log",
    project: "Under pressure",
    title: "The judge and its own family",
    body: [
      "I gave the same set of answers to two AI judges. One said nothing had changed. The other saw a clear effect. They agreed about as often as a coin would.",
      "Most of the disagreement was over answers written by the first judge's own relatives. That is a pattern, not proof, but it changed how I work: never let a model grade its own family, and never trust a single judge.",
    ],
  },
  {
    slug: "who-said-it",
    date: "2026-08-23",
    kind: "question",
    project: "Who said it",
    title: "Does a model listen to what is said, or to who said it?",
    body: [
      "People are moved by the speaker as well as the argument. An expert's words land differently from a stranger's. I want to know whether language models do the same.",
      "The interesting part is not whether they defer to experts. It is whether they still defer when the expert is wrong.",
    ],
  },
  {
    slug: "confidence-contagion",
    date: "2026-05-20",
    kind: "question",
    title: "Can certainty travel further than the evidence?",
    body: [
      "Picture a line of models, each hearing the one before it and how sure it sounded. The evidence never changes, but the confidence might grow as it is passed along.",
      "If it does, groups of machines could talk themselves into certainty. That is the question underneath most of what I do.",
    ],
  },
];

export const KIND_LABEL: Record<Entry["kind"], string> = {
  log: "Notes",
  idea: "Idea",
  question: "Question",
};

export function fmtDate(d: string) {
  return new Date(d + "T12:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
