import { DeleteAnalysisButton } from "@/components/analysis/delete-analysis-button";
import { ReportView } from "@/components/analysis/report-view";
import { Button } from "@/components/ui/button";
import { getAnalysis } from "@/lib/analysis/persistence";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function AnalysisDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { persistence, report } = await getAnalysis(id);

  if (persistence === "disabled") {
    return (
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight">
          This report is not saved
        </h1>
        <p className="max-w-xl text-muted-foreground">
          DATABASE_URL is not configured in this environment, so analyses stay
          on the import page only. Your uploaded reviews were not stored.
        </p>
        <Button render={<Link href="/analysis/new" />} nativeButton={false}>
          Start analysis
        </Button>
      </div>
    );
  }

  if (persistence === "error") {
    return (
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight">
          We couldn&apos;t load this analysis
        </h1>
        <p className="max-w-xl text-muted-foreground">
          The database did not respond. Your saved reviews are still there. Try
          opening this report again.
        </p>
        <Button render={<Link href="/analysis" />} variant="outline" nativeButton={false}>
          Back to history
        </Button>
      </div>
    );
  }

  if (!report) notFound();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Saved report
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">{report.title}</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button render={<Link href="/analysis" />} variant="outline" nativeButton={false}>
            History
          </Button>
          <DeleteAnalysisButton id={id} />
        </div>
      </div>
      <ReportView report={report} />
    </div>
  );
}
