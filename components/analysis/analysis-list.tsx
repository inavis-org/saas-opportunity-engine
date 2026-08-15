import { Button } from "@/components/ui/button";
import type { AnalysisSummary, PersistenceState } from "@/types";
import Link from "next/link";

function persistenceCopy(persistence: PersistenceState) {
  if (persistence === "disabled") {
    return "Analyses are not saved yet. Set DATABASE_URL to keep history you can reopen.";
  }
  if (persistence === "error") {
    return "We could not read saved analyses. Your reports are still in the database — try again.";
  }
  return null;
}

export function AnalysisList({
  items,
  persistence,
  emptyTitle = "You haven't analyzed a market yet.",
  emptyBody = "Analyze a competitor to discover customer complaints, feature requests, and potential opportunities.",
}: {
  items: AnalysisSummary[];
  persistence: PersistenceState;
  emptyTitle?: string;
  emptyBody?: string;
}) {
  const note = persistenceCopy(persistence);

  if (items.length === 0) {
    return (
      <div className="rounded-lg border p-6">
        <p className="font-medium">{emptyTitle}</p>
        <p className="mt-2 text-sm text-muted-foreground">{emptyBody}</p>
        {note ? (
          <p className="mt-2 text-sm text-muted-foreground">{note}</p>
        ) : null}
        <div className="mt-4">
          <Button render={<Link href="/analysis/new" />} nativeButton={false}>
            Start analysis
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {note ? <p className="text-sm text-muted-foreground">{note}</p> : null}
      {items.map((item) => (
        <article key={item.id} className="rounded-lg border p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1">
              <h2 className="font-medium">
                <Link href={`/analysis/${item.id}`} className="hover:underline">
                  {item.title}
                </Link>
              </h2>
              <p className="text-sm text-muted-foreground">
                Score {item.opportunityScore ?? "—"} / 100 · {item.reviewCount}{" "}
                reviews · {new Date(item.createdAt).toLocaleDateString()}
              </p>
              {item.summary ? (
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {item.summary}
                </p>
              ) : null}
            </div>
            <Button
              render={<Link href={`/analysis/${item.id}`} />}
              variant="outline"
              size="sm"
              nativeButton={false}
            >
              Open
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
