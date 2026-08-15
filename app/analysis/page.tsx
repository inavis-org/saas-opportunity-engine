import { AnalysisList } from "@/components/analysis/analysis-list";
import { Button } from "@/components/ui/button";
import { listAnalyses } from "@/lib/analysis/persistence";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AnalysisIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const list = await listAnalyses(q);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Analyses
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">History</h1>
          <p className="max-w-xl text-muted-foreground">
            Reopen a saved report, search by title or summary, or start a new
            competitor analysis.
          </p>
        </div>
        <Button render={<Link href="/analysis/new" />} nativeButton={false}>
          Start analysis
        </Button>
      </div>

      <form className="flex flex-wrap gap-2" action="/analysis" method="get">
        <label className="sr-only" htmlFor="analysis-search">
          Search analyses
        </label>
        <input
          id="analysis-search"
          name="q"
          defaultValue={q ?? ""}
          placeholder="Search titles and summaries"
          className="h-9 min-w-64 flex-1 rounded-lg border border-input bg-background px-3 text-sm"
        />
        <Button type="submit" variant="outline">
          Search
        </Button>
      </form>

      <AnalysisList
        items={list.items}
        persistence={list.persistence}
        emptyTitle={
          q
            ? `No analyses match “${q}”.`
            : "You haven't analyzed a market yet."
        }
        emptyBody={
          q
            ? "Try a different search, or start a new analysis."
            : "Analyze a competitor to discover customer complaints, feature requests, and potential opportunities. Start with pasted reviews or a CSV export."
        }
      />
    </div>
  );
}
