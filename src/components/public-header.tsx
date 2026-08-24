import Link from "next/link";

export function PublicHeader() {
  return (
    <header className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50 shadow-sm shadow-black/[0.03]">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 h-16">
        <Link href="/" className="flex items-center gap-2.5 font-semibold">
          <span className="inline-grid h-8 w-8 place-items-center rounded-md bg-gradient-to-b from-[#0559C7] to-[#0D8C4D] text-sm font-bold text-white">K</span>
          <span className="text-base">Korrali ThreadExtract</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/tools" className="hover:text-foreground transition-colors">Free tools</Link>
          <Link href="/vs" className="hover:text-foreground transition-colors">Compare</Link>
          <Link href="/for" className="hover:text-foreground transition-colors">By team</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/contact" className="hidden sm:inline-flex rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            Contact us
          </Link>
          <Link href="/login" className="rounded-lg bg-gradient-to-b from-[#0559C7] to-[#0D8C4D] px-4 py-2 text-sm font-semibold text-white transition-colors hover:opacity-90">
            Sign in
          </Link>
        </div>
      </div>
    </header>
  );
}
