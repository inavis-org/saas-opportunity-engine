import { z } from "zod";
import type { NormalizedReview } from "@/types";

export const normalizedReviewSchema = z.object({
  source: z.enum(["csv", "paste", "manual"]),
  externalId: z.string().optional(),
  content: z.string().min(1),
  rating: z.number().int().min(1).max(5).optional(),
  author: z.string().optional(),
  publishedAt: z.string().optional(),
});

export const createAnalysisSchema = z.object({
  title: z.string().min(1).max(200).default("Untitled analysis"),
  text: z.string().optional(),
  csv: z.string().optional(),
  reviews: z.array(normalizedReviewSchema).optional(),
});

export const aiInsightSchema = z.object({
  kind: z.enum(["complaint", "feature_request", "opportunity"]),
  title: z.string(),
  description: z.string().optional(),
  frequency: z.number().optional(),
  evidenceCount: z.number().int().nonnegative(),
  evidence: z.array(z.string()).optional(),
});

export const aiAnalysisSchema = z.object({
  summary: z.string(),
  opportunityScore: z.number().int().min(0).max(100).optional(),
  insights: z.array(aiInsightSchema),
});

export type CreateAnalysisInput = z.infer<typeof createAnalysisSchema>;
export type AiAnalysisOutput = z.infer<typeof aiAnalysisSchema>;
export type ParsedReview = NormalizedReview;
