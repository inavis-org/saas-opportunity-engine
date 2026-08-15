import { NextResponse } from "next/server";
import { deleteAnalysis, getAnalysis } from "@/lib/analysis/persistence";
import type { ApiResponse, AnalysisReport } from "@/types";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { persistence, report } = await getAnalysis(id);

  if (persistence === "disabled") {
    return NextResponse.json(
      {
        data: null,
        error:
          "Analyses are not saved until DATABASE_URL is configured. Run the report again from Import reviews.",
      } satisfies ApiResponse<never>,
      { status: 503 },
    );
  }

  if (persistence === "error") {
    return NextResponse.json(
      {
        data: null,
        error: "We could not load this analysis. Your data is still in the database — try again.",
      } satisfies ApiResponse<never>,
      { status: 503 },
    );
  }

  if (!report) {
    return NextResponse.json(
      { data: null, error: "Analysis not found" } satisfies ApiResponse<never>,
      { status: 404 },
    );
  }

  return NextResponse.json({
    data: report,
    error: null,
  } satisfies ApiResponse<AnalysisReport>);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { persistence, deleted } = await deleteAnalysis(id);

  if (persistence === "disabled") {
    return NextResponse.json(
      {
        data: null,
        error: "Delete requires DATABASE_URL. Nothing was stored for this environment.",
      } satisfies ApiResponse<never>,
      { status: 503 },
    );
  }

  if (!deleted) {
    return NextResponse.json(
      {
        data: null,
        error: "We could not delete this analysis. Try again.",
      } satisfies ApiResponse<never>,
      { status: 404 },
    );
  }

  return NextResponse.json({
    data: { id },
    error: null,
  } satisfies ApiResponse<{ id: string }>);
}
