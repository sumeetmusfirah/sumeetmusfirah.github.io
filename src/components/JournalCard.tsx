import Link from "next/link";
import { type Entry, KIND_LABEL, fmtDate } from "@/content/journal";

/** Title split into words so each can focus in after the thread passes. */
function Words({ text, start }: { text: string; start: number }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i}>
          <span className="w" style={{ animationDelay: `${(start + 0.6 + i * 0.045).toFixed(3)}s` }}>{w}</span>{" "}
        </span>
      ))}
    </>
  );
}

/**
 * One journal entry on linen paper: a thread is pulled across, the title focuses in word by word,
 * a running stitch is sewn under it, three knots appear, then the rest settles. `delay` staggers cards.
 */
export default function JournalCard({ entry, full = false, delay = 0 }: { entry: Entry; full?: boolean; delay?: number }) {
  const href = `/journal/${entry.slug}`;
  const Title = full ? "h1" : "h2";
  return (
    <article className={`jcard${full ? " full" : ""}`} style={{ ["--d" as string]: `${delay}s` }}>
      <span className="thread" aria-hidden />
      <span className="knots" aria-hidden><i /><i /><i /></span>
      <div className="meta">
        <span className="date">{fmtDate(entry.date)}</span>
        <span className={`kind kind-${entry.kind}`}>{KIND_LABEL[entry.kind]}</span>
        {entry.project && <span className="project">{entry.project}</span>}
      </div>
      <Title className="jtitle">
        {full ? <Words text={entry.title} start={delay} /> : <Link href={href}><Words text={entry.title} start={delay} /></Link>}
      </Title>
      <svg className="stitch" viewBox="0 0 360 8" preserveAspectRatio="none" aria-hidden>
        <line x1="2" y1="4" x2="358" y2="4" />
      </svg>
      <div className="settle">
        {(full ? entry.body : entry.body.slice(0, 1)).map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
        {!full && <Link className="readmore" href={href}>Read entry</Link>}
        {entry.margin && (
          <div className="gloss">
            <span className="k">Note</span>
            <span className="v">{entry.margin}</span>
          </div>
        )}
      </div>
      <div className="fringe" aria-hidden>
        {Array.from({ length: 12 }, (_, i) => <span key={i} />)}
      </div>
    </article>
  );
}
