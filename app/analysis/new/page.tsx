"use client";

import { useMemo, useRef, useState } from "react";
import { ReportView } from "@/components/analysis/report-view";
import { Button } from "@/components/ui/button";
import {
  explainEmptyImport,
  normalizeReviewInput,
  validateCsvFile,
} from "@/lib/sources";
import type { AnalysisReport, ApiResponse } from "@/types";

const SAMPLE = `The mobile app crashes every time I export a report.
Support took a week to reply and the issue is still open.
We need better analytics and a shared team dashboard.
Pricing is too high for what we get compared to competitors.
Integrations with Slack would save us hours every week.`;

const SAMPLE_CSV = `review,rating,author
"The mobile app crashes every time I export a report.",1,Alex
"Support took a week to reply and the issue is still open.",2,Sam
"We need better analytics and a shared team dashboard.",3,Riley
"Pricing is too high for what we get compared to competitors.",2,Jordan
"Integrations with Slack would save us hours every week.",4,Casey`;

export default function NewAnalysisPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("Competitor review analysis");
  const [text, setText] = useState("");
  const [csv, setCsv] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emptyAttempt, setEmptyAttempt] = useState(false);
  const [report, setReport] = useState<AnalysisReport | null>(null);

  const previewCount = useMemo(
    () => normalizeReviewInput({ text, csv }).length,
    [text, csv],
  );

  async function onCsvFile(fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file) return;

    const validationError = validateCsvFile(file);
    if (validationError) {
      setError(validationError);
      setEmptyAttempt(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    try {
      const contents = await file.text();
      if (!contents.trim()) {
        setError(
          "That CSV file is empty. Export reviews with a review or content column, then try again.",
        );
        setEmptyAttempt(true);
        return;
      }
      setCsv(contents);
      setFileName(file.name);
      setError(null);
      setEmptyAttempt(false);
    } catch {
      setError("We could not read that file in the browser. Try another CSV or paste the rows instead.");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setReport(null);

    const payload = { title, text, csv };
    if (normalizeReviewInput(payload).length === 0) {
      setEmptyAttempt(true);
      setError(explainEmptyImport(payload));
      setLoading(false);
      return;
    }

    setEmptyAttempt(false);
    try {
      const response = await fetch("/api/analyses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await response.json()) as ApiResponse<AnalysisReport>;
      if (!response.ok || !json.data) {
        setError(json.error ?? "Analysis failed");
        return;
      }
      setReport(json.data);
    } catch {
      setError("Network error. Try again. Your pasted and uploaded reviews are still on this page.");
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
          Paste reviews or upload a CSV. Files stay in the browser until you run
          analysis, then we send JSON with title, text, and csv — no file
          multipart upload.
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
        <div className="grid gap-2 text-sm">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <label className="font-medium" htmlFor="csv-text">
              CSV
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <input
                ref={fileInputRef}
                id="csv-file"
                type="file"
                accept=".csv,text/csv"
                className="sr-only"
                onChange={(event) => void onCsvFile(event.target.files)}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload CSV
              </Button>
              {fileName ? (
                <span className="text-xs text-muted-foreground">
                  Loaded {fileName}
                </span>
              ) : (
                <span className="text-xs text-muted-foreground">
                  .csv up to 2 MB
                </span>
              )}
            </div>
          </div>
          <textarea
            id="csv-text"
            className="min-h-32 rounded-lg border border-input bg-background px-3 py-2 font-mono text-xs"
            value={csv}
            onChange={(event) => {
              setCsv(event.target.value);
              setFileName(null);
            }}
            placeholder={"review,rating\nCrashes on export,1"}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          {previewCount > 0
            ? `${previewCount} review${previewCount === 1 ? "" : "s"} ready to analyze.`
            : "No reviews detected yet."}
        </p>
        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={loading}>
            {loading ? "Analyzing…" : "Run analysis"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setText(SAMPLE);
              setEmptyAttempt(false);
              setError(null);
            }}
          >
            Load sample
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setCsv(SAMPLE_CSV);
              setFileName("sample.csv");
              setEmptyAttempt(false);
              setError(null);
            }}
          >
            Load sample CSV
          </Button>
        </div>
      </form>

      {error ? (
        <div className="rounded-lg border border-destructive/40 p-4 text-sm">
          <p className="font-medium">We could not complete this analysis.</p>
          <p className="mt-1 text-muted-foreground">{error}</p>
          <p className="mt-1 text-muted-foreground">
            Your pasted text and CSV are still on this page. Fix the input and
            run analysis again.
          </p>
        </div>
      ) : null}

      {loading ? (
        <p className="text-sm text-muted-foreground">
          Normalizing reviews, identifying themes, extracting feature requests…
        </p>
      ) : null}

      {!report && !loading ? (
        <div
          className={`rounded-lg border p-6 ${
            emptyAttempt
              ? "border-destructive/40 bg-destructive/5"
              : "border-border"
          }`}
        >
          <h2 className="text-lg font-medium">No analysis yet</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            You have not analyzed a market yet. Paste customer reviews, upload a
            CSV with a review column, or load a sample. Then run analysis to see
            complaints, feature requests, and an opportunity score.
          </p>
        </div>
      ) : null}

      {report ? <ReportView report={report} /> : null}
    </div>
  );
}
