export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
};

export type ReviewSource = "csv" | "paste" | "manual";

export type AnalysisStatus = "draft" | "processing" | "completed" | "failed";

export type InsightKind = "complaint" | "feature_request" | "opportunity";

export type NormalizedReview = {
  source: ReviewSource;
  externalId?: string;
  content: string;
  rating?: number;
  author?: string;
  publishedAt?: string;
};

export type AnalysisInsight = {
  kind: InsightKind;
  title: string;
  description?: string;
  frequency?: number;
  evidenceCount: number;
  evidence?: string[];
};

export type AnalysisReport = {
  id?: string;
  title: string;
  status: AnalysisStatus;
  summary?: string;
  opportunityScore?: number;
  insights: AnalysisInsight[];
  reviewCount: number;
};
