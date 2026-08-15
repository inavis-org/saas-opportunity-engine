import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "See what to look at right now — start with a competitor analysis.",
};

const EMPTY_SECTIONS = [
  {
    title: "Recent analyses",
    body: "Finished reports will land here once you run an analysis.",
  },
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

export default function DashboardPage() {
  const user = getCurrentUser();

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

      <div className="rounded-lg border p-6">
        <p className="font-medium">You haven&apos;t analyzed a market yet.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Analyze a competitor to discover customer complaints, feature
          requests, and potential opportunities. No login is required for this
          step.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button render={<Link href="/analysis/new" />} nativeButton={false}>
            Start analysis
          </Button>
          <Button
            render={<Link href="/login" />}
            variant="outline"
            nativeButton={false}
          >
            Sign in (coming soon)
          </Button>
        </div>
      </div>

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
