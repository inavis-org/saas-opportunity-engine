import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AnalysisNotFound() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Analysis not found</h1>
      <p className="max-w-xl text-muted-foreground">
        This report does not exist, or it was deleted. Start a new analysis or
        open history.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button render={<Link href="/analysis/new" />} nativeButton={false}>
          Start analysis
        </Button>
        <Button render={<Link href="/analysis" />} variant="outline" nativeButton={false}>
          History
        </Button>
      </div>
    </div>
  );
}
