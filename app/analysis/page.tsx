import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AnalysisIndexPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-6 px-6 py-16">
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Analyses
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          You haven&apos;t analyzed a market yet.
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Analyze a competitor to discover customer complaints, feature
          requests, and potential opportunities. Start with pasted reviews or a
          CSV export.
        </p>
      </div>
      <div>
        <Button render={<Link href="/analysis/new" />} nativeButton={false}>
          Start analysis
        </Button>
      </div>
    </div>
  );
}
