import Link from "next/link";
import type { Metadata } from "next";
import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";

export const metadata: Metadata = {
  title: "ThreadExtract by Team — Korrali ThreadExtract",
  description: "How engineering, support, product, customer success, and ops teams use ThreadExtract to turn Slack threads into documentation.",
};

const TEAMS = [
  { slug: "engineering", name: "Engineering" },
  { slug: "support", name: "Customer Support" },
  { slug: "product", name: "Product" },
  { slug: "customer-success", name: "Customer Success" },
  { slug: "ops", name: "Operations" },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">ThreadExtract by team</h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Every team loses knowledge in Slack a little differently. Here&apos;s how ThreadExtract
          fits each one.
        </p>

        <div className="mt-8 space-y-3">
          {TEAMS.map((t) => (
            <Link
              key={t.slug}
              href={`/for/${t.slug}`}
              className="block rounded-lg border border-border bg-card p-4 hover:border-[#0559C7]/40 transition-colors"
            >
              <p className="font-semibold text-foreground text-sm">ThreadExtract for {t.name}</p>
            </Link>
          ))}
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
