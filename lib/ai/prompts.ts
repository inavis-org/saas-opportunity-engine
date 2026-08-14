import type { NormalizedReview } from "@/types";

export const ANALYSIS_SYSTEM_PROMPT = `You are a market intelligence analyst for SaaS founders.
Extract recurring complaints, feature requests, and product opportunities from customer reviews.
Never invent statistics. Use only the reviews provided.
Return JSON with keys: summary (string), opportunityScore (0-100 integer), insights (array).
Each insight must include kind (complaint | feature_request | opportunity), title, description,
frequency (0-1 share of reviews that mention it), evidenceCount, and evidence (short quotes).`;

export function buildAnalysisUserPrompt(reviews: NormalizedReview[]): string {
  const lines = reviews.map((review, index) => {
    const rating = review.rating ? ` rating=${review.rating}` : "";
    return `${index + 1}.${rating} ${review.content}`;
  });
  return `Analyze these ${reviews.length} reviews:\n\n${lines.join("\n\n")}`;
}
