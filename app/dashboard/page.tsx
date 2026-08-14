import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          What should you look at right now? Start with a competitor analysis.
        </p>
      </div>
      <div className="rounded-lg border p-6">
        <p className="font-medium">No analyses yet</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Analyze a competitor to discover customer complaints, feature
          requests, and potential opportunities.
        </p>
        <div className="mt-4">
          <Button render={<Link href="/analysis/new" />} nativeButton={false}>
            Start analysis
          </Button>
        </div>
      </div>
    </div>
  );
}
