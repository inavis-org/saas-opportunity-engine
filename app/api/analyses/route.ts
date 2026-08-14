import { NextResponse } from "next/server";
import { analyzeReviews } from "@/lib/ai/analyze-reviews";
import { createAnalysisSchema } from "@/lib/ai/schemas";
import { hasDatabaseUrl } from "@/lib/env";
import { normalizeReviewInput } from "@/lib/sources";
import type { ApiResponse, AnalysisReport } from "@/types";

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
        error: "Provide pasted review text, CSV, or a reviews array",
      } satisfies ApiResponse<never>,
      { status: 400 },
    );
  }

  const report = await analyzeReviews(parsed.data.title, reviews);

  if (hasDatabaseUrl()) {
    try {
      const { prisma } = await import("@/lib/db/prisma");
      const saved = await prisma.analysis.create({
        data: {
          title: report.title,
          status: report.status,
          summary: report.summary,
          opportunityScore: report.opportunityScore,
          reviews: {
            create: reviews.map((review) => ({
              source: review.source,
              externalId: review.externalId,
              content: review.content,
              rating: review.rating,
              author: review.author,
              publishedAt: review.publishedAt
                ? new Date(review.publishedAt)
                : undefined,
            })),
          },
          insights: {
            create: report.insights.map((insight) => ({
              kind: insight.kind,
              title: insight.title,
              description: insight.description,
              frequency: insight.frequency,
              evidenceCount: insight.evidenceCount,
            })),
          },
        },
      });
      const persisted: AnalysisReport = { ...report, id: saved.id };
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
