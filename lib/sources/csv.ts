import type { NormalizedReview } from "@/types";

function splitCsvLine(line: string): string[] {
  const cells: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (char === "," && !inQuotes) {
      cells.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }
  cells.push(current.trim());
  return cells;
}

function columnIndex(headers: string[], names: string[]): number {
  return headers.findIndex((header) => names.includes(header.toLowerCase()));
}

export function parseCsvReviews(csv: string): NormalizedReview[] {
  const lines = csv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length === 0) return [];

  const headers = splitCsvLine(lines[0]).map((header) => header.toLowerCase());
  const hasHeader =
    columnIndex(headers, ["review", "content", "text", "comment", "body"]) >= 0;
  const start = hasHeader ? 1 : 0;
  const contentIndex = hasHeader
    ? columnIndex(headers, ["review", "content", "text", "comment", "body"])
    : 0;
  const ratingIndex = hasHeader
    ? columnIndex(headers, ["rating", "stars", "score"])
    : -1;
  const authorIndex = hasHeader ? columnIndex(headers, ["author", "user", "name"]) : -1;

  const reviews: NormalizedReview[] = [];
  for (const line of lines.slice(start)) {
    const cells = splitCsvLine(line);
    const content = cells[Math.max(contentIndex, 0)] ?? "";
    if (!content) continue;
    const ratingRaw = ratingIndex >= 0 ? Number(cells[ratingIndex]) : undefined;
    reviews.push({
      source: "csv",
      content,
      rating: Number.isFinite(ratingRaw) ? ratingRaw : undefined,
      author: authorIndex >= 0 ? cells[authorIndex] : undefined,
    });
  }
  return reviews;
}

export function parsePastedReviews(text: string): NormalizedReview[] {
  return text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((content) => ({ source: "paste" as const, content }));
}

export function normalizeReviewInput(input: {
  text?: string;
  csv?: string;
  reviews?: NormalizedReview[];
}): NormalizedReview[] {
  const fromPayload = input.reviews ?? [];
  const fromCsv = input.csv ? parseCsvReviews(input.csv) : [];
  const fromText = input.text ? parsePastedReviews(input.text) : [];
  return [...fromPayload, ...fromCsv, ...fromText].filter(
    (review) => review.content.trim().length > 0,
  );
}
