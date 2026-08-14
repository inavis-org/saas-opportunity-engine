import type { AnalysisInsight } from "@/types";

export type ScoreFactors = {
  baseline: number;
  demand: number;
  pain: number;
  total: number;
};

export function scoreFromInsights(
  insights: AnalysisInsight[],
  reviewCount: number,
): ScoreFactors {
  const complaintWeight = insights
    .filter((insight) => insight.kind === "complaint")
    .reduce((sum, insight) => sum + (insight.frequency ?? 0), 0);
  const baseline = 20;
  const demand = Math.min(25, reviewCount);
  const pain = Math.min(40, Math.round(complaintWeight * 40));
  const total = Math.min(100, baseline + demand + pain);
  return { baseline, demand, pain, total };
}

export function formatScoreExplanation(factors: ScoreFactors, reviewCount: number): string {
  return `Opportunity score ${factors.total}/100 is explained as baseline ${factors.baseline} + demand ${factors.demand} (from ${reviewCount} reviews, cap 25) + pain ${factors.pain} (from complaint frequency, cap 40). These are calculated counts, not model guesses.`;
}
