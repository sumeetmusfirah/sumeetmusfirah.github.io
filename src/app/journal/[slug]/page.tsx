import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import JournalCard from "@/components/JournalCard";
import Nav from "@/components/Nav";
import { ENTRIES } from "@/content/journal";

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
  const newer = ENTRIES[i - 1];
  const older = ENTRIES[i + 1];

  return (
    <>
      <Nav current="journal" />
      <main className="journal">
        <div className="wrap">
          <p className="crumb kicker">
            <Link href="/journal">← Journal</Link> <b>·</b> {i + 1} of {ENTRIES.length}
          </p>
          <JournalCard entry={ENTRIES[i]} full />
          <nav className="jturns" aria-label="More entries">
            {newer ? <Link href={`/journal/${newer.slug}`}>← Newer</Link> : <span />}
            {older ? <Link href={`/journal/${older.slug}`}>Older →</Link> : <span />}
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
