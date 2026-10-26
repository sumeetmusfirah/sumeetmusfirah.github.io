import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { ENTRIES, KIND_LABEL, fmtDate } from "@/content/journal";

export const dynamicParams = false;

export function generateStaticParams() {
  return ENTRIES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const e = ENTRIES.find((x) => x.slug === slug);
  return e ? { title: `${e.title} — Journal`, description: e.body[0] } : {};
}

export default async function EntryPage({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const i = ENTRIES.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const e = ENTRIES[i];
  const newer = ENTRIES[i - 1];
  const older = ENTRIES[i + 1];

  return (
    <>
      <Nav current="journal" />
      <main className="desk">
        <div className="wrap">
          <p className="crumb kicker">
            <Link href="/journal">← Journal</Link> <b>·</b> p.{i + 1} of {ENTRIES.length}
          </p>
          <article className="book is-open instant spread">
            <div className="book-pages">
              <aside className="page page-left">
                <p className="kicker">{fmtDate(e.date)}</p>
                <p style={{ marginTop: 14 }}>
                  <span className={`kind kind-${e.kind}`}>{KIND_LABEL[e.kind]}</span>
                </p>
                {e.project && <p className="meta">Project: {e.project}</p>}
                {e.margin && <p className="hand margin-note">{e.margin}</p>}
                <p className="page-no mono">{i + 1}</p>
              </aside>
              <section className="page page-right turn-in">
                <h1 className="entry-title">{e.title}</h1>
                {e.body.map((para) => (
                  <p key={para.slice(0, 24)} className="ruled">{para}</p>
                ))}
                <nav className="page-turns" aria-label="Turn the page">
                  {newer ? <Link href={`/journal/${newer.slug}`}>← newer</Link> : <span />}
                  {older ? <Link href={`/journal/${older.slug}`}>older →</Link> : <span />}
                </nav>
              </section>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
