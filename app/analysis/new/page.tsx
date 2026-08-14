"use client";

import { useState } from "react";
import { ReportView } from "@/components/analysis/report-view";
import { Button } from "@/components/ui/button";
import type { AnalysisReport, ApiResponse } from "@/types";

const SAMPLE = `The mobile app crashes every time I export a report.
Support took a week to reply and the issue is still open.
We need better analytics and a shared team dashboard.
Pricing is too high for what we get compared to competitors.
Integrations with Slack would save us hours every week.`;

export default function NewAnalysisPage() {
  const [title, setTitle] = useState("Competitor review analysis");
  const [text, setText] = useState("");
  const [csv, setCsv] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<AnalysisReport | null>(null);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setReport(null);
    try {
      const response = await fetch("/api/analyses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, text, csv }),
      });
      const payload = (await response.json()) as ApiResponse<AnalysisReport>;
      if (!response.ok || !payload.data) {
        setError(payload.error ?? "Analysis failed");
        return;
      }
      setReport(payload.data);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-12">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Analysis
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">Import reviews</h1>
        <p className="max-w-2xl text-muted-foreground">
          Paste reviews or upload CSV text. You will get complaints, feature
          requests, and an opportunity score without reading every row.
        </p>
      </div>

      <form onSubmit={onSubmit} className="grid gap-6">
        <label className="grid gap-2 text-sm">
          <span className="font-medium">Title</span>
          <input
            className="h-9 rounded-lg border border-input bg-background px-3"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-medium">Pasted reviews</span>
          <textarea
            className="min-h-40 rounded-lg border border-input bg-background px-3 py-2"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Separate reviews with a blank line"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-medium">CSV</span>
          <textarea
            className="min-h-32 rounded-lg border border-input bg-background px-3 py-2 font-mono text-xs"
            value={csv}
            onChange={(event) => setCsv(event.target.value)}
            placeholder={"review,rating\nCrashes on export,1"}
          />
        </label>
        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={loading}>
            {loading ? "Analyzing…" : "Run analysis"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setText(SAMPLE)}
          >
            Load sample
          </Button>
        </div>
      </form>

      {error ? (
        <div className="rounded-lg border border-destructive/40 p-4 text-sm">
          <p className="font-medium">We could not complete this analysis.</p>
          <p className="mt-1 text-muted-foreground">{error}</p>
        </div>
      ) : null}

      {loading ? (
        <p className="text-sm text-muted-foreground">
          Normalizing reviews, identifying themes, extracting feature requests…
        </p>
      ) : null}

      {report ? <ReportView report={report} /> : null}
    </div>
  );
}
