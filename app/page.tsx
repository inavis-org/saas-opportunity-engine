import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-8 px-6 py-16">
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Market intelligence
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight">
            Turn scattered customer feedback into actionable market intelligence.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Import competitor reviews, extract repeated complaints and feature
            requests, and see which opportunities are worth building — with
            evidence, not vibes.
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
          <Button render={<Link href="/analysis/new" />} nativeButton={false}>
            Start analysis
          </Button>
          <Button
            render={<Link href="/api/health" />}
            variant="outline"
            nativeButton={false}
          >
            API Health
          </Button>
        </div>
      </main>
    </div>
  );
}
