import { notFound } from "next/navigation";
import Link from "next/link";
import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";

const TEAMS: Record<string, {
  name: string;
  headline: string;
  description: string;
  scenarios: string[];
  painPoints: string[];
  body: string;
}> = {
  engineering: {
    name: "Engineering",
    headline: "Stop losing incident fixes to Slack scroll",
    description: "For engineering teams: turn debugging threads and incident postmortems into a searchable Notion runbook, automatically, without slowing anyone down.",
    scenarios: [
      "A production incident gets diagnosed and fixed in a #on-call thread",
      "Someone finally figures out why the staging build keeps failing",
      "A senior engineer explains a gnarly part of the codebase to a new hire",
    ],
    painPoints: [
      "The same bug gets re-diagnosed from scratch three months later",
      "Onboarding docs are always six months out of date",
      "Nobody has time to write a postmortem, so nobody does",
    ],
    body: `Engineering knowledge dies in Slack more than anywhere else. The person who fixes a gnarly production bug at 11pm is not going to also write a runbook entry about it — they're going to close the laptop. Then the same class of bug shows up again in three months and gets re-diagnosed from zero, by someone who has no idea it already happened.

ThreadExtract removes the "write it up later" step entirely. Whoever solved the problem — or whoever's watching the thread — reacts with 🧠, and the AI extracts the actual technical content (ignoring the "lol" and "on it" and the fifteen back-and-forth messages that didn't matter) into a clean Markdown page in your engineering Notion.

This works especially well for on-call rotations and incident response, where the fix is almost always fully documented in the Slack thread already — it's just never been pulled out anywhere searchable. Teams using ThreadExtract for on-call typically end up with a de facto runbook that builds itself over a few months, without anyone running a "documentation sprint."`,
  },
  support: {
    name: "Customer Support",
    headline: "Turn Slack escalations into a support knowledge base",
    description: "For support teams: capture how tricky customer issues actually got resolved in internal Slack threads, so the next agent doesn't start from zero.",
    scenarios: [
      "An engineer explains the real cause of a confusing billing edge case in #support-escalations",
      "A senior support lead walks a new hire through handling an angry enterprise customer",
      "Someone finally figures out the workaround for a known product bug",
    ],
    painPoints: [
      "The same escalation gets solved twice because nobody remembers it happened before",
      "Tribal knowledge about workarounds lives in three senior agents' heads",
      "New agents take months to reach the same troubleshooting speed as the team",
    ],
    body: `Support teams accumulate enormous amounts of resolution knowledge in Slack — "how did we handle this last time" threads, engineer explanations of why a bug happens, workarounds for issues that haven't been fixed yet. Almost none of it makes it into the actual knowledge base agents are supposed to use, because writing it up is always the thing that gets deprioritized after the ticket closes.

ThreadExtract captures that knowledge at the moment it's created. When a thread resolves a genuinely reusable problem — not every routine ticket, just the ones worth remembering — someone reacts with 🧠 and the extracted summary lands in Notion, tagged and searchable, without anyone context-switching out of Slack to write documentation by hand.

Over time this builds a knowledge base that reflects how your team actually solves problems, sourced from real resolutions rather than a documentation project nobody had time to finish.`,
  },
  product: {
    name: "Product",
    headline: "Keep product decisions from disappearing into Slack history",
    description: "For product teams: preserve the reasoning behind decisions made in Slack threads, so \"why did we build it this way\" has an answer six months later.",
    scenarios: [
      "A feature scope debate in #product-planning ends with a clear decision and rationale",
      "A PM explains to engineering why a requirement is non-negotiable, with the customer context",
      "A postmortem-style thread on why a launched feature underperformed",
    ],
    painPoints: [
      "Nobody remembers why a feature was built a certain way, so it gets \"fixed\" back to the broken version",
      "Decision context lives in one person's memory and leaves when they do",
      "New PMs re-litigate decisions that were already settled with good reasons",
    ],
    body: `Product decisions almost always get made in a Slack thread before they get written into a doc — if they ever do. The actual reasoning (the customer complaint that triggered it, the tradeoff that was debated, the data that settled it) usually lives only in that thread, and Slack search rarely surfaces it six months later when someone's asking "wait, why did we do it this way?"

ThreadExtract turns those decision threads into a permanent, searchable record without adding a step to how your team already works. React with 🧠 on the thread where a real decision landed, and the reasoning — not just the conclusion — gets written into Notion as a clean summary.

This matters most for decisions that get revisited. When a new team member proposes "fixing" something that was deliberately built a certain way, having the original reasoning one Notion search away saves the re-litigation.`,
  },
  "customer-success": {
    name: "Customer Success",
    headline: "Capture account knowledge before it walks out the door",
    description: "For customer success teams: preserve the account-specific context that lives in Slack threads, so account handoffs don't lose institutional knowledge.",
    scenarios: [
      "A CSM explains a customer's unusual configuration or history in #csm-internal",
      "A tricky renewal negotiation gets worked out with context on what mattered to the customer",
      "Someone documents a workaround built specifically for one enterprise account",
    ],
    painPoints: [
      "Account handoffs lose months of relationship context that never got written down",
      "The same account-specific question gets asked and re-answered every quarter",
      "When a CSM leaves, their account knowledge leaves with them",
    ],
    body: `Customer success runs on account-specific context that's almost never written down in a CRM field: why this customer is sensitive about pricing changes, what config quirks their environment has, who the real internal champion is versus who's on the call. That context gets shared in Slack threads between CSMs, and it evaporates the moment an account gets reassigned.

ThreadExtract captures that context automatically. When a CSM shares something genuinely useful about an account in a thread — a workaround, a relationship note, a "here's what actually matters to them" — reacting with 🧠 pulls it into a Notion page instead of leaving it to be re-discovered (or lost) at the next handoff.

This is especially valuable during account transitions, where the biggest risk isn't the CRM data — it's the tacit knowledge that was never anywhere but Slack.`,
  },
  ops: {
    name: "Operations",
    headline: "Turn one-off ops fixes into a process that survives turnover",
    description: "For ops teams: capture how internal process problems actually got solved in Slack, before the person who solved it is the only one who remembers.",
    scenarios: [
      "Someone figures out the actual fix for a recurring vendor billing discrepancy",
      "A workaround for a broken internal tool gets shared in #ops",
      "A one-off exception process gets explained and never gets written into the SOP",
    ],
    painPoints: [
      "Process knowledge lives with whoever's been at the company longest",
      "The same operational fire gets fought from scratch every time",
      "SOPs are always out of date because updating them is always someone's \"someday\" task",
    ],
    body: `Ops teams are constantly solving process problems in Slack that never make it into an actual SOP — not because the knowledge isn't valuable, but because writing formal documentation takes time nobody has in the moment. The fix lives in a thread, gets forgotten, and gets re-solved from scratch the next time the same issue comes up.

ThreadExtract closes that gap without adding a documentation task to anyone's plate. When a thread contains a real process fix — a vendor workaround, an exception-handling procedure, an explanation of why a step exists — reacting with 🧠 turns it into a clean Notion page automatically.

Over time, this becomes a living process library that reflects how the team actually operates, rather than an SOP doc that was accurate the day it was written and stale ever since.`,
  },
};

type Props = { params: Promise<{ team: string }> };

export async function generateStaticParams() {
  return Object.keys(TEAMS).map((team) => ({ team }));
}

export async function generateMetadata({ params }: Props) {
  const { team } = await params;
  const data = TEAMS[team];
  if (!data) return {};
  return {
    title: `ThreadExtract for ${data.name} Teams — Korrali ThreadExtract`,
    description: data.description,
  };
}

export default async function Page({ params }: Props) {
  const { team } = await params;
  const data = TEAMS[team];
  if (!data) notFound();

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#0559C7]">
          ThreadExtract for {data.name}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{data.headline}</h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">{data.description}</p>

        <div className="mt-8 space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Typical threads worth capturing</h2>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {data.scenarios.map((s) => (
                <li key={s} className="flex gap-2">
                  <span className="text-[#0559C7] shrink-0">→</span>
                  {s}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">What it fixes</h2>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {data.painPoints.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="text-red-400 shrink-0">✗</span>
                  {p}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-4">
              {data.body.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          <div className="rounded-lg border border-[#0559C7]/20 bg-[#0559C7]/5 p-5">
            <p className="text-sm font-medium text-foreground mb-1">Try it on a real thread</p>
            <p className="text-sm text-muted-foreground mb-3">
              Paste a Slack thread into the free converter and see the extraction quality yourself — no account required.
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
