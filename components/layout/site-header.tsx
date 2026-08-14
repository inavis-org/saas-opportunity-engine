import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="block">
          <p className="text-sm font-medium text-muted-foreground">
            Market Intelligence Platform
          </p>
          <p className="text-lg font-semibold tracking-tight">
            SaaS Opportunity Engine
          </p>
        </Link>
        <nav className="flex flex-wrap items-center gap-2">
          <Button render={<Link href="/dashboard" />} variant="ghost" size="sm" nativeButton={false}>
            Dashboard
          </Button>
          <Button render={<Link href="/analysis/new" />} variant="ghost" size="sm" nativeButton={false}>
            Analyze
          </Button>
          <Button render={<Link href="/login" />} variant="outline" size="sm" nativeButton={false}>
            Sign in
          </Button>
        </nav>
      </div>
    </header>
  );
}
