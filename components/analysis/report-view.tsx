import type { AnalysisInsight, AnalysisReport, InsightKind } from "@/types";

const KIND_LABEL: Record<InsightKind, string> = {
  complaint: "Complaints",
  feature_request: "Feature requests",
  opportunity: "Opportunities",
};

const KIND_ORDER: InsightKind[] = ["complaint", "feature_request", "opportunity"];

export function ReportView({ report }: { report: AnalysisReport }) {
  const grouped = KIND_ORDER.map((kind) => ({
    kind,
    items: report.insights.filter((insight) => insight.kind === kind),
  })).filter((group) => group.items.length > 0);

  return (
    <section className="grid gap-6">
      <div className="rounded-lg border p-5">
        <p className="text-sm text-muted-foreground">Executive summary</p>
        <h2 className="mt-1 text-xl font-semibold">{report.title}</h2>
        <p className="mt-3 text-sm leading-6">{report.summary}</p>
        <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Opportunity score</dt>
            <dd className="font-medium">{report.opportunityScore ?? "—"} / 100</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Reviews analyzed</dt>
            <dd className="font-medium">{report.reviewCount}</dd>
          </div>
        </dl>
      </div>
      {grouped.map((group) => (
        <div key={group.kind} className="grid gap-3">
          <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {KIND_LABEL[group.kind]}
          </h3>
          {group.items.map((insight) => (
            <InsightCard key={`${insight.kind}-${insight.title}`} insight={insight} />
          ))}
        </div>
      ))}
    </section>
  );
}

function InsightCard({ insight }: { insight: AnalysisInsight }) {
  return (
    <article className="rounded-lg border p-4">
      <h4 className="font-medium">{insight.title}</h4>
      {insight.description ? (
        <p className="mt-2 text-sm text-muted-foreground">{insight.description}</p>
      ) : null}
      <p className="mt-2 text-xs text-muted-foreground">
        Evidence: {insight.evidenceCount} reviews
        {insight.frequency != null ? ` (${Math.round(insight.frequency * 100)}%)` : ""}
      </p>
      {insight.evidence?.length ? (
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-medium">View evidence</summary>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {insight.evidence.map((quote) => (
              <li key={quote}>&ldquo;{quote}&rdquo;</li>
            ))}
          </ul>
        </details>
      ) : null}
    </article>
  );
}
