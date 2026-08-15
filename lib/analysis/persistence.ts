import type {
  AnalysisList,
  AnalysisReport,
  AnalysisStatus,
  AnalysisSummary,
  InsightKind,
  PersistenceState,
} from "@/types";
import { hasDatabaseUrl } from "@/lib/env";

type StoredInsight = {
  kind: string;
  title: string;
  description: string | null;
  frequency: number | null;
  evidenceCount: number;
  evidence: unknown;
};

type StoredAnalysis = {
  id: string;
  title: string;
  status: string;
  summary: string | null;
  opportunityScore: number | null;
  createdAt: Date;
  reviews: unknown[];
  insights: StoredInsight[];
};

function asInsightKind(kind: string): InsightKind {
  if (kind === "feature_request" || kind === "opportunity") return kind;
  return "complaint";
}

function asStatus(status: string): AnalysisStatus {
  if (
    status === "draft" ||
    status === "processing" ||
    status === "completed" ||
    status === "failed"
  ) {
    return status;
  }
  return "completed";
}

function asEvidence(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const quotes = value.filter((item): item is string => typeof item === "string");
  return quotes.length > 0 ? quotes : undefined;
}

export function persistenceState(): PersistenceState {
  return hasDatabaseUrl() ? "enabled" : "disabled";
}

export function toSummary(row: {
  id: string;
  title: string;
  status: string;
  summary: string | null;
  opportunityScore: number | null;
  createdAt: Date;
  _count: { reviews: number };
}): AnalysisSummary {
  return {
    id: row.id,
    title: row.title,
    status: asStatus(row.status),
    summary: row.summary ?? undefined,
    opportunityScore: row.opportunityScore ?? undefined,
    reviewCount: row._count.reviews,
    createdAt: row.createdAt.toISOString(),
  };
}

export function toReport(row: StoredAnalysis): AnalysisReport {
  return {
    id: row.id,
    title: row.title,
    status: asStatus(row.status),
    summary: row.summary ?? undefined,
    opportunityScore: row.opportunityScore ?? undefined,
    reviewCount: row.reviews.length,
    createdAt: row.createdAt.toISOString(),
    insights: row.insights.map((insight) => ({
      kind: asInsightKind(insight.kind),
      title: insight.title,
      description: insight.description ?? undefined,
      frequency: insight.frequency ?? undefined,
      evidenceCount: insight.evidenceCount,
      evidence: asEvidence(insight.evidence),
    })),
  };
}

export async function listAnalyses(query?: string): Promise<AnalysisList> {
  if (!hasDatabaseUrl()) {
    return { persistence: "disabled", items: [] };
  }

  try {
    const { prisma } = await import("@/lib/db/prisma");
    const q = query?.trim();
    const rows = await prisma.analysis.findMany({
      where: q
        ? {
            OR: [
              { title: { contains: q, mode: "insensitive" } },
              { summary: { contains: q, mode: "insensitive" } },
            ],
          }
        : undefined,
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { _count: { select: { reviews: true } } },
    });
    return { persistence: "enabled", items: rows.map(toSummary) };
  } catch {
    return { persistence: "error", items: [] };
  }
}

export async function getAnalysis(id: string): Promise<{
  persistence: PersistenceState;
  report: AnalysisReport | null;
}> {
  if (!hasDatabaseUrl()) {
    return { persistence: "disabled", report: null };
  }

  try {
    const { prisma } = await import("@/lib/db/prisma");
    const row = await prisma.analysis.findUnique({
      where: { id },
      include: { reviews: true, insights: true },
    });
    if (!row) return { persistence: "enabled", report: null };
    return { persistence: "enabled", report: toReport(row) };
  } catch {
    return { persistence: "error", report: null };
  }
}

export async function saveAnalysis(
  report: AnalysisReport,
  reviews: Array<{
    source: string;
    externalId?: string;
    content: string;
    rating?: number;
    author?: string;
    publishedAt?: string;
  }>,
): Promise<AnalysisReport> {
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
          evidence: insight.evidence ?? [],
        })),
      },
    },
  });
  return { ...report, id: saved.id, createdAt: saved.createdAt.toISOString() };
}

export async function deleteAnalysis(id: string): Promise<{
  persistence: PersistenceState;
  deleted: boolean;
}> {
  if (!hasDatabaseUrl()) {
    return { persistence: "disabled", deleted: false };
  }

  try {
    const { prisma } = await import("@/lib/db/prisma");
    await prisma.analysis.delete({ where: { id } });
    return { persistence: "enabled", deleted: true };
  } catch {
    return { persistence: "error", deleted: false };
  }
}
