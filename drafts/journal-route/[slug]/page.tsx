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
      <main className="page">
        <article className="leaf wrap narrow">
          <p className="label">
            {fmtDate(e.date)} · {KIND_LABEL[e.kind]}
            {e.project && ` · ${e.project}`}
          </p>
          <h1 className="leaf-t">{e.title}</h1>
          <span className="flourish" aria-hidden>❦</span>
          <div className="prose">
            {e.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <nav className="turns" aria-label="More entries">
            {newer ? <Link className="link" href={`/journal/${newer.slug}`}>← Newer</Link> : <span />}
            <Link className="link" href="/journal">All entries</Link>
            {older ? <Link className="link" href={`/journal/${older.slug}`}>Older →</Link> : <span />}
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}
