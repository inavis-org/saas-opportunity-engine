import { AnalysisList } from "@/components/analysis/analysis-list";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { listAnalyses } from "@/lib/analysis/persistence";
import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "See what to look at right now — start with a competitor analysis.",
};

const EMPTY_SECTIONS = [
  {
    title: "Watched competitors",
    body: "Saved competitors will appear after accounts land in Sprint 3.",
  },
  {
    title: "Emerging complaints",
    body: "Repeated pain points from your latest imports will surface here.",
  },
  {
    title: "New opportunities",
    body: "Evidence-backed opportunities will show once an analysis completes.",
  },
] as const;

export default async function DashboardPage() {
  const user = getCurrentUser();
  const list = await listAnalyses();
  const recent = list.items.slice(0, 5);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          What should you look at right now? Start with a competitor analysis.
        </p>
        <p className="text-sm text-muted-foreground">
          {user
            ? `Signed in as ${user.email ?? user.id}.`
            : "You are browsing without an account. Sign-in is a Sprint 3 shell — the product stays usable."}
        </p>
      </div>

      <section className="grid gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-medium">Recent analyses</h2>
          <Button render={<Link href="/analysis" />} variant="ghost" size="sm" nativeButton={false}>
            View history
          </Button>
        </div>
        <AnalysisList
          items={recent}
          persistence={list.persistence}
          emptyTitle="You haven't analyzed a market yet."
          emptyBody="Analyze a competitor to discover customer complaints, feature requests, and potential opportunities. No login is required for this step."
        />
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        {EMPTY_SECTIONS.map((section) => (
          <div key={section.title} className="rounded-lg border p-4">
            <p className="font-medium">{section.title}</p>
            <p className="mt-2 text-sm text-muted-foreground">{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
