import Link from "next/link";
import type { Metadata } from "next";
import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";

export const metadata: Metadata = {
  title: "Free Tools — Korrali ThreadExtract",
  description: "Free, ungated tools for turning Slack threads into documentation. No account required.",
};

const TOOLS = [
  {
    slug: "slack-thread-to-markdown",
    name: "Slack Thread to Markdown Converter",
    description: "Paste a raw Slack thread, get back a clean Markdown summary — the same AI extraction ThreadExtract uses, minus the Notion push.",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Free tools</h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          No account required. These run the same extraction logic as the full product.
        </p>

        <div className="mt-8 space-y-3">
          {TOOLS.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="block rounded-lg border border-border bg-card p-4 hover:border-[#0559C7]/40 transition-colors"
            >
              <p className="font-semibold text-foreground text-sm">{tool.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{tool.description}</p>
            </Link>
          ))}
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
