import { notFound } from "next/navigation";
import Link from "next/link";
import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";

type Feature = { name: string; korrali: string; competitor: string };

const COMPETITORS: Record<string, {
  name: string;
  tagline: string;
  description: string;
  pricingNote: string;
  category: string;
  features: Feature[];
  differentiator: string;
}> = {
  tettra: {
    name: "Tettra",
    tagline: "ThreadExtract vs Tettra",
    description: "Comparing ThreadExtract and Tettra for turning Slack knowledge into documentation. Tettra is a standalone wiki with Slack search; ThreadExtract writes directly into the Notion you already use.",
    pricingNote: "Tettra prices per seat; check tettra.com/pricing for current rates.",
    category: "team wiki",
    features: [
      { name: "Where docs live", korrali: "Your existing Notion workspace", competitor: "A new, separate wiki" },
      { name: "How a doc gets created", korrali: "React with 🧠 on the thread that solved it", competitor: "Manually write or paste into the wiki" },
      { name: "Pricing model", korrali: "Flat rate per workspace", competitor: "Per-seat" },
      { name: "Setup", korrali: "Add to Slack, connect one Notion database", competitor: "Migrate/build out a new wiki structure" },
    ],
    differentiator: `Tettra is a real, purpose-built team wiki — if you don't already have a documentation home, it's a reasonable one to start with. It has its own editor, permissions model, and a Slack bot that searches existing Tettra pages.

ThreadExtract solves a narrower problem differently: it doesn't ask anyone to adopt a new tool. If your team already lives in Notion, ThreadExtract just keeps it fed — the "documentation" step is a single emoji reaction on a thread that already happened, not a task someone has to remember to do later. There's no second system to keep in sync, because there's only ever been one.

If you don't use Notion today, Tettra (or a similar dedicated wiki) is the more natural fit. If you do, ThreadExtract removes the step where knowledge dies in Slack because nobody got around to writing it up.`,
  },
  guru: {
    name: "Guru",
    tagline: "ThreadExtract vs Guru",
    description: "Comparing ThreadExtract and Guru for capturing tribal knowledge. Guru is a verified knowledge-base platform with browser extensions; ThreadExtract is a zero-effort capture layer on top of Slack.",
    pricingNote: "Guru prices per seat with a free tier; check getguru.com/pricing for current rates.",
    category: "knowledge management",
    features: [
      { name: "Core mechanism", korrali: "Passive capture from Slack reactions", competitor: "Active authoring + verification workflows" },
      { name: "Where docs live", korrali: "Your existing Notion workspace", competitor: "Guru's own card-based knowledge base" },
      { name: "Best for", korrali: "Capturing knowledge that would otherwise never get written down", competitor: "Maintaining a verified, browsable knowledge base" },
      { name: "Pricing model", korrali: "Flat rate per workspace", competitor: "Per-seat, tiered" },
    ],
    differentiator: `Guru is built for a different job: maintaining a verified, actively-curated knowledge base with expiration dates, trust scores, and a browser extension that surfaces answers in context. If you need a system of record with accountability for accuracy, Guru's verification workflow is genuinely useful.

ThreadExtract doesn't try to be a knowledge base — it's a capture mechanism. Most tribal knowledge dies not because there's no good place to put it, but because nobody writes it down in the moment. ThreadExtract removes that step: the documentation already exists in the Slack thread where the problem got solved, and the 🧠 reaction just tells the AI to pull it out and put it where your team already looks (Notion).

Teams sometimes use both: ThreadExtract to capture the raw knowledge as it's generated, Guru (or a similar tool) as the polished, verified layer on top. They're not really competing for the same job.`,
  },
  slab: {
    name: "Slab",
    tagline: "ThreadExtract vs Slab",
    description: "Comparing ThreadExtract and Slab for internal documentation. Slab is a polished team wiki and knowledge hub; ThreadExtract feeds the Notion you already have without asking anyone to switch tools.",
    pricingNote: "Slab prices per seat; check slab.com/pricing for current rates.",
    category: "team wiki",
    features: [
      { name: "Where docs live", korrali: "Your existing Notion workspace", competitor: "Slab's own workspace" },
      { name: "Migration required", korrali: "None — works with your current Notion setup", competitor: "Yes, to move existing docs in" },
      { name: "How a doc gets created", korrali: "React with 🧠 on the thread that solved it", competitor: "Manually author in Slab's editor" },
      { name: "Pricing model", korrali: "Flat rate per workspace", competitor: "Per-seat" },
    ],
    differentiator: `Slab is a well-built, purpose-designed documentation hub — strong editor, good organization, integrations with Slack and Google Workspace for search. If you're choosing a new home for company docs from scratch, it's a serious option.

ThreadExtract isn't trying to replace where your docs live — it assumes you already have a home (Notion) and focuses entirely on the step most teams actually fail at: getting the knowledge out of Slack and into that home in the first place. There's no migration, no new tool for engineers to learn, and no second documentation system running in parallel with the one you already have.

If your team hasn't settled on a documentation tool yet, Slab is worth evaluating directly. If you already use Notion and the real problem is that nobody writes anything down, ThreadExtract addresses that specific gap.`,
  },
  confluence: {
    name: "Confluence",
    tagline: "ThreadExtract vs Confluence",
    description: "Comparing ThreadExtract and Confluence for engineering documentation. Confluence is Atlassian's enterprise wiki; ThreadExtract is a lightweight capture layer that writes into Notion.",
    pricingNote: "Confluence prices per seat with enterprise tiers; check atlassian.com/software/confluence/pricing for current rates.",
    category: "enterprise wiki",
    features: [
      { name: "Scale/complexity", korrali: "Single Notion database, one workspace", competitor: "Enterprise-grade spaces, permissions, Jira integration" },
      { name: "Where docs live", korrali: "Your existing Notion workspace", competitor: "Confluence spaces" },
      { name: "How a doc gets created", korrali: "React with 🧠 on the thread that solved it", competitor: "Manually author in Confluence's editor" },
      { name: "Pricing model", korrali: "Flat rate per workspace", competitor: "Per-seat, tiered by company size" },
    ],
    differentiator: `Confluence is enterprise infrastructure — deep Jira integration, granular permissions, spaces for every team, and the scale to serve thousands of employees. If your org already runs on the Atlassian stack, that integration alone can justify it.

ThreadExtract is not an alternative to Confluence at that scale — it's solving a much smaller, more specific problem: the debugging thread that gets solved in Slack at 11pm and then never makes it into any wiki, Confluence included, because writing it up requires someone to context-switch out of Slack and into a separate tool. The emoji-reaction capture removes that context switch entirely.

Some teams use ThreadExtract to feed a lightweight Notion knowledge base that sits alongside Confluence for exactly this kind of just-in-time engineering knowledge, without asking anyone to open Confluence for something this small.`,
  },
  "notion-ai": {
    name: "Notion AI",
    tagline: "ThreadExtract vs Notion AI",
    description: "Comparing ThreadExtract and Notion AI for documentation. Notion AI helps you write and search inside pages you've already created; ThreadExtract creates the page in the first place, from a Slack thread.",
    pricingNote: "Notion AI is a Notion add-on, typically billed per seat; check notion.com/pricing for current rates.",
    category: "AI writing assistant",
    features: [
      { name: "Trigger", korrali: "A 🧠 reaction on a Slack thread", competitor: "You open Notion and start writing or asking" },
      { name: "Input", korrali: "An existing Slack conversation", competitor: "A blank page or existing Notion content" },
      { name: "What it produces", korrali: "A new page from a conversation that already happened", competitor: "Help drafting, summarizing, or querying pages you create" },
      { name: "Where it lives", korrali: "A standalone Slack app connected to your Notion", competitor: "Built into Notion itself" },
    ],
    differentiator: `Notion AI is genuinely useful for what it does: drafting inside Notion, summarizing pages you already have, and answering questions across your existing workspace. It's a writing and retrieval assistant for content that's already in Notion, or that you're actively creating there.

ThreadExtract solves the step before that: getting the conversation out of Slack and into Notion as a page in the first place. Nobody has to remember to open Notion, start a page, and write up what happened — the knowledge capture happens where the problem was actually solved, triggered by a single emoji reaction on the thread itself.

The two aren't mutually exclusive. ThreadExtract creates the page from the Slack thread; Notion AI can then help you search across it, summarize it, or link it to related pages once it's there.`,
  },
};

type Props = { params: Promise<{ competitor: string }> };

export async function generateStaticParams() {
  return Object.keys(COMPETITORS).map((competitor) => ({ competitor }));
}

export async function generateMetadata({ params }: Props) {
  const { competitor } = await params;
  const data = COMPETITORS[competitor];
  if (!data) return {};
  return {
    title: `${data.tagline} — Korrali ThreadExtract`,
    description: data.description,
  };
}

export default async function Page({ params }: Props) {
  const { competitor } = await params;
  const data = COMPETITORS[competitor];
  if (!data) notFound();

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#0559C7]">
          Comparison · {data.category}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{data.tagline}</h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">{data.description}</p>

        <div className="mt-8 space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">At a glance</h2>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Feature</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#0559C7]">ThreadExtract</th>
                    <th className="px-4 py-3 text-left font-semibold text-muted-foreground">{data.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.features.map((f, i) => (
                    <tr key={f.name} className={i % 2 === 0 ? "bg-background" : "bg-muted/10"}>
                      <td className="px-4 py-3 text-foreground font-medium">{f.name}</td>
                      <td className="px-4 py-3 text-foreground">{f.korrali}</td>
                      <td className="px-4 py-3 text-muted-foreground">{f.competitor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{data.pricingNote}</p>
          </section>

          <section>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-4">
              {data.differentiator.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          <div className="rounded-lg border border-[#0559C7]/20 bg-[#0559C7]/5 p-5">
            <p className="text-sm font-medium text-foreground mb-1">See it on your own threads</p>
            <p className="text-sm text-muted-foreground mb-3">
              Try the free Slack Thread to Markdown converter — no account, no Slack connection required.
            </p>
            <Link
              href="/tools/slack-thread-to-markdown"
              className="inline-flex items-center gap-1.5 rounded-md bg-gradient-to-b from-[#0559C7] to-[#0D8C4D] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 transition-opacity"
            >
              Try the free converter →
            </Link>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
