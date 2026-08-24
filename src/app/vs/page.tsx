import Link from "next/link";
import type { Metadata } from "next";
import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";

export const metadata: Metadata = {
  title: "Compare ThreadExtract — Korrali ThreadExtract",
  description: "How ThreadExtract compares to Tettra, Guru, Slab, Confluence, and Notion AI for turning Slack conversations into documentation.",
};

const COMPETITORS = [
  { slug: "tettra", name: "Tettra" },
  { slug: "guru", name: "Guru" },
  { slug: "slab", name: "Slab" },
  { slug: "confluence", name: "Confluence" },
  { slug: "notion-ai", name: "Notion AI" },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Compare ThreadExtract</h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          ThreadExtract doesn&apos;t replace your wiki — it feeds the Notion you already use, from
          conversations that already happened in Slack. Here&apos;s how that compares to the
          alternatives.
        </p>

        <div className="mt-8 space-y-3">
          {COMPETITORS.map((c) => (
            <Link
              key={c.slug}
              href={`/vs/${c.slug}`}
              className="block rounded-lg border border-border bg-card p-4 hover:border-[#0559C7]/40 transition-colors"
            >
              <p className="font-semibold text-foreground text-sm">ThreadExtract vs {c.name}</p>
            </Link>
          ))}
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
