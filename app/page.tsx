import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <header className="border-b">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Market Intelligence Platform
            </p>
            <h1 className="text-lg font-semibold tracking-tight">
              SaaS Opportunity Engine
            </h1>
          </div>
          <Button render={<Link href="/api/health" />} variant="outline" size="sm">
            API Health
          </Button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-8 px-6 py-16">
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Sprint 0 foundation
          </p>
          <h2 className="max-w-2xl text-4xl font-semibold tracking-tight">
            Turn scattered customer feedback into actionable market intelligence.
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            This repository is scaffolded for Next.js, TypeScript, Tailwind CSS,
            shadcn/ui, and Prisma. Connect Supabase, OpenAI, and Stripe when you
            are ready to build the MVP analysis workflow.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border p-4">
            <p className="font-medium">Import reviews</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Upload CSV or paste review text from supported sources.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="font-medium">AI analysis</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Extract complaints, feature requests, and recurring themes.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="font-medium">Opportunity score</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Surface evidence-backed opportunities founders can act on.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button render={<Link href="https://github.com/inavis-org/saas-opportunity-engine" />} nativeButton={false}>
            View repository
          </Button>
          <Button
            render={
              <a
                href="https://github.com/inavis-org/saas-opportunity-engine/blob/main/market-intelligence/docs/PRD.md"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            variant="outline"
            nativeButton={false}
          >
            Read PRD
          </Button>
        </div>
      </main>
    </div>
  );
}
