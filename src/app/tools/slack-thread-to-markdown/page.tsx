import Link from "next/link";
import type { Metadata } from "next";
import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import { MarkdownPreviewForm } from "@/components/tools/markdown-preview-form";

export const metadata: Metadata = {
  title: "Slack Thread to Markdown Converter — Free Tool | Korrali ThreadExtract",
  description: "Paste a raw Slack thread and get back a clean, structured Markdown summary — free, no account required. The same AI extraction ThreadExtract uses to push docs into Notion.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#0559C7]">
          Free Tool
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Slack Thread to Markdown Converter
        </h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Paste a raw Slack thread — usernames, timestamps, sidebar chatter and all — and get back
          a clean Markdown summary with the actual problem and solution pulled out. This runs the
          same AI extraction ThreadExtract uses to push documentation into Notion, minus the Notion
          part. No account, no Slack connection required.
        </p>

        <div className="mt-8">
          <MarkdownPreviewForm />
        </div>

        <div className="mt-10 rounded-lg border border-[#0559C7]/20 bg-[#0559C7]/5 p-5">
          <p className="text-sm font-medium text-foreground mb-1">Want this automatic?</p>
          <p className="text-sm text-muted-foreground mb-3">
            ThreadExtract watches your Slack workspace and does this the moment someone reacts with
            🧠 — no copy-pasting, and it lands directly in your Notion database.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 rounded-md bg-gradient-to-b from-[#0559C7] to-[#0D8C4D] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 transition-opacity"
          >
            Start free trial →
          </Link>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          <Link href="/tools" className="hover:text-foreground underline">← All free tools</Link>
        </p>
      </main>
      <PublicFooter />
    </div>
  );
}
