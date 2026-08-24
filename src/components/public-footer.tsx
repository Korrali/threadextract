import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2.5">
          <span className="inline-grid h-7 w-7 place-items-center rounded-md bg-gradient-to-b from-[#0559C7] to-[#0D8C4D] text-xs font-bold text-white shadow-sm">K</span>
          <span className="font-semibold text-foreground">Korrali ThreadExtract</span>
          <span className="text-xs">· part of <a href="https://korrali.com" className="hover:text-foreground transition-colors">Korrali</a></span>
        </div>
        <div className="flex flex-wrap gap-4 text-xs">
          <Link href="/tools" className="hover:text-foreground transition-colors">Free tools</Link>
          <Link href="/vs" className="hover:text-foreground transition-colors">Compare</Link>
          <Link href="/for" className="hover:text-foreground transition-colors">By team</Link>
          <a href="https://trust.korrali.com" className="hover:text-foreground transition-colors">Korrali Trust</a>
          <a href="https://revenue.korrali.com" className="hover:text-foreground transition-colors">Korrali Revenue</a>
          <a href="https://data.korrali.com" className="hover:text-foreground transition-colors">Korrali Data</a>
          <a href="https://web.korrali.com" className="hover:text-foreground transition-colors">Korrali Web</a>
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms &amp; Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
