import type { AnalysisReport } from "@/types";

export function ReportView({ report }: { report: AnalysisReport }) {
  return (
    <section className="grid gap-6">
      <div className="rounded-lg border p-5">
        <p className="text-sm text-muted-foreground">Executive summary</p>
        <h2 className="mt-1 text-xl font-semibold">{report.title}</h2>
        <p className="mt-3 text-sm leading-6">{report.summary}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          Opportunity score{" "}
          <span className="font-medium text-foreground">
            {report.opportunityScore ?? "—"} / 100
          </span>
          {" · "}
          {report.reviewCount} reviews
        </p>
      </div>
      <div className="grid gap-3">
        {report.insights.map((insight) => (
          <article key={`${insight.kind}-${insight.title}`} className="rounded-lg border p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {insight.kind.replace("_", " ")}
            </p>
            <h3 className="mt-1 font-medium">{insight.title}</h3>
            {insight.description ? (
              <p className="mt-2 text-sm text-muted-foreground">{insight.description}</p>
            ) : null}
            <p className="mt-2 text-xs text-muted-foreground">
              Evidence: {insight.evidenceCount} reviews
              {insight.frequency != null
                ? ` (${Math.round(insight.frequency * 100)}%)`
                : ""}
            </p>
            {insight.evidence?.length ? (
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
                {insight.evidence.map((quote) => (
                  <li key={quote}>{quote}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
