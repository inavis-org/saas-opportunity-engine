import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { analyzeReviews } from "@/lib/ai/analyze-reviews";
import { listAnalyses, saveAnalysis } from "@/lib/analysis/persistence";
import { createAnalysisSchema } from "@/lib/ai/schemas";
import { hasDatabaseUrl } from "@/lib/env";
import { explainEmptyImport, normalizeReviewInput } from "@/lib/sources";
import type { ApiResponse, AnalysisList, AnalysisReport } from "@/types";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? undefined;
  const list = await listAnalyses(query);
  return NextResponse.json({ data: list, error: null } satisfies ApiResponse<AnalysisList>);
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { data: null, error: "Request body must be JSON" } satisfies ApiResponse<never>,
      { status: 400 },
    );
  }

  const parsed = createAnalysisSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { data: null, error: "Invalid analysis payload" } satisfies ApiResponse<never>,
      { status: 400 },
    );
  }

  const reviews = normalizeReviewInput(parsed.data);
  if (reviews.length === 0) {
    return NextResponse.json(
      {
        data: null,
        error: explainEmptyImport(parsed.data),
      } satisfies ApiResponse<never>,
      { status: 400 },
    );
  }

  const report = await analyzeReviews(parsed.data.title, reviews);

  if (hasDatabaseUrl()) {
    try {
      const persisted = await saveAnalysis(report, reviews);
      return NextResponse.json({ data: persisted, error: null });
    } catch {
      return NextResponse.json({
        data: report,
        error: "Analysis completed but could not be saved to the database",
      });
    }
  }

  return NextResponse.json({ data: report, error: null });
}
