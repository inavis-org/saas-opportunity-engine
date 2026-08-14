import type { AnalysisInsight, AnalysisReport, NormalizedReview } from "@/types";
import { completeJson } from "@/lib/ai/client";
import { ANALYSIS_SYSTEM_PROMPT, buildAnalysisUserPrompt } from "@/lib/ai/prompts";
import { aiAnalysisSchema } from "@/lib/ai/schemas";
import { formatScoreExplanation, scoreFromInsights } from "@/lib/ai/score";

const COMPLAINT_PATTERNS: Array<{ title: string; terms: string[] }> = [
  { title: "Reliability and bugs", terms: ["bug", "crash", "broken", "error", "unreliable"] },
  { title: "Slow performance", terms: ["slow", "lag", "latency", "loading"] },
  { title: "Poor support", terms: ["support", "customer service", "no response"] },
  { title: "Pricing friction", terms: ["expensive", "price", "pricing", "cost", "overpriced"] },
  { title: "Missing integrations", terms: ["integrat", "zapier", "slack"] },
];

const REQUEST_PATTERNS: Array<{ title: string; terms: string[] }> = [
  { title: "Mobile experience", terms: ["mobile", "ios", "android", "app"] },
  { title: "Reporting and analytics", terms: ["report", "dashboard", "analytics"] },
  { title: "Collaboration", terms: ["team", "share", "permission", "role"] },
  { title: "Automation", terms: ["automat", "workflow", "schedule"] },
];

function matches(content: string, terms: string[]): boolean {
  const lower = content.toLowerCase();
  return terms.some((term) => lower.includes(term));
}

function heuristicInsights(reviews: NormalizedReview[]): AnalysisInsight[] {
  const insights: AnalysisInsight[] = [];
  const total = reviews.length || 1;

  for (const pattern of COMPLAINT_PATTERNS) {
    const hits = reviews.filter((review) => matches(review.content, pattern.terms));
    if (hits.length === 0) continue;
    insights.push({
      kind: "complaint",
      title: pattern.title,
      description: `${hits.length} of ${reviews.length} reviews mention this theme.`,
      frequency: hits.length / total,
      evidenceCount: hits.length,
      evidence: hits.slice(0, 3).map((review) => review.content.slice(0, 180)),
    });
  }

  for (const pattern of REQUEST_PATTERNS) {
    const hits = reviews.filter((review) => matches(review.content, pattern.terms));
    if (hits.length === 0) continue;
    insights.push({
      kind: "feature_request",
      title: pattern.title,
      description: `Customers repeatedly ask about ${pattern.title.toLowerCase()}.`,
      frequency: hits.length / total,
      evidenceCount: hits.length,
      evidence: hits.slice(0, 3).map((review) => review.content.slice(0, 180)),
    });
  }

  const top = insights[0];
  if (top) {
    insights.push({
      kind: "opportunity",
      title: `Win by fixing ${top.title.toLowerCase()}`,
      description:
        "The most repeated pain is a product opportunity if it can be solved more reliably than competitors.",
      frequency: top.frequency,
      evidenceCount: top.evidenceCount,
      evidence: top.evidence,
    });
  }

  return insights.slice(0, 8);
}

export async function analyzeReviews(
  title: string,
  reviews: NormalizedReview[],
): Promise<AnalysisReport> {
  const fallbackInsights = heuristicInsights(reviews);
  const factors = scoreFromInsights(fallbackInsights, reviews.length);
  const themeLine =
    reviews.length === 0
      ? "No reviews were provided."
      : `Analyzed ${reviews.length} reviews. The strongest themes are ${
          fallbackInsights
            .slice(0, 3)
            .map((insight) => insight.title)
            .join(", ") || "unspecified"
        }.`;
  const fallback: AnalysisReport = {
    title,
    status: "completed",
    summary: `${themeLine} ${formatScoreExplanation(factors, reviews.length)}`,
    opportunityScore: factors.total,
    insights: fallbackInsights,
    reviewCount: reviews.length,
  };

  if (!process.env.OPENAI_API_KEY || reviews.length === 0) {
    return fallback;
  }

  try {
    const raw = await completeJson({
      messages: [
        { role: "system", content: ANALYSIS_SYSTEM_PROMPT },
        { role: "user", content: buildAnalysisUserPrompt(reviews) },
      ],
    });
    const parsed = aiAnalysisSchema.parse(raw);
    return {
      title,
      status: "completed",
      summary: parsed.summary,
      opportunityScore: parsed.opportunityScore ?? fallback.opportunityScore,
      insights: parsed.insights,
      reviewCount: reviews.length,
    };
  } catch {
    return { ...fallback, status: "completed" };
  }
}
