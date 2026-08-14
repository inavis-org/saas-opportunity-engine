import type { NormalizedReview } from "@/types";

export const MAX_CSV_UPLOAD_BYTES = 2 * 1024 * 1024;
export const CONTENT_HEADERS = ["review", "content", "text", "comment", "body"];
export const RATING_HEADERS = ["rating", "stars", "score"];
export const AUTHOR_HEADERS = ["author", "user", "name"];

const DELIMITERS = [",", ";", "\t"] as const;

export type ReviewImportInput = {
  text?: string;
  csv?: string;
  reviews?: NormalizedReview[];
};

function stripBom(value: string): string {
  return value.replace(/^\uFEFF/, "");
}

function countUnquoted(line: string, delimiter: string): number {
  let count = 0;
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (!inQuotes && char === delimiter) count += 1;
  }
  return count;
}

function firstLogicalLine(csv: string): string {
  let inQuotes = false;
  for (let i = 0; i < csv.length; i += 1) {
    const char = csv[i];
    if (char === '"') {
      if (inQuotes && csv[i + 1] === '"') {
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (!inQuotes && (char === "\n" || char === "\r")) {
      return csv.slice(0, i);
    }
  }
  return csv;
}

export function detectCsvDelimiter(csv: string): string {
  const line = firstLogicalLine(csv);
  let best: string = ",";
  let bestCount = 0;
  for (const delimiter of DELIMITERS) {
    const count = countUnquoted(line, delimiter);
    if (count > bestCount) {
      best = delimiter;
      bestCount = count;
    }
  }
  return best;
}

export function parseCsvRecords(csv: string): string[][] {
  const text = stripBom(csv);
  if (!text.trim()) return [];

  const delimiter = detectCsvDelimiter(text);
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  const pushRow = () => {
    row.push(cell.trim());
    cell = "";
    if (row.some((value) => value.length > 0)) {
      rows.push(row);
    }
    row = [];
  };

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        cell += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      continue;
    }
    if (char === delimiter) {
      row.push(cell.trim());
      cell = "";
      continue;
    }
    if (char === "\r") {
      if (text[i + 1] === "\n") i += 1;
      pushRow();
      continue;
    }
    if (char === "\n") {
      pushRow();
      continue;
    }
    cell += char;
  }

  if (inQuotes) {
    cell = cell.trim();
  }
  if (cell.length > 0 || row.length > 0) {
    pushRow();
  }

  return rows;
}

function columnIndex(headers: string[], names: string[]): number {
  return headers.findIndex((header) => names.includes(header.toLowerCase()));
}

export function parseCsvReviews(csv: string): NormalizedReview[] {
  const rows = parseCsvRecords(csv);
  if (rows.length === 0) return [];

  const headers = rows[0].map((header) => header.toLowerCase());
  const hasHeader = columnIndex(headers, CONTENT_HEADERS) >= 0;
  const start = hasHeader ? 1 : 0;
  const contentIndex = hasHeader
    ? columnIndex(headers, CONTENT_HEADERS)
    : 0;
  const ratingIndex = hasHeader ? columnIndex(headers, RATING_HEADERS) : -1;
  const authorIndex = hasHeader ? columnIndex(headers, AUTHOR_HEADERS) : -1;

  const reviews: NormalizedReview[] = [];
  for (const cells of rows.slice(start)) {
    const content = (cells[Math.max(contentIndex, 0)] ?? "").trim();
    if (!content) continue;
    if (!hasHeader && CONTENT_HEADERS.includes(content.toLowerCase())) {
      continue;
    }
    const ratingRaw =
      ratingIndex >= 0 ? Number.parseFloat(cells[ratingIndex] ?? "") : Number.NaN;
    const rating = Number.isFinite(ratingRaw) ? Math.round(ratingRaw) : undefined;
    reviews.push({
      source: "csv",
      content,
      rating: rating !== undefined && rating >= 1 && rating <= 5 ? rating : undefined,
      author: authorIndex >= 0 ? cells[authorIndex] || undefined : undefined,
    });
  }
  return reviews;
}

export function parsePastedReviews(text: string): NormalizedReview[] {
  return stripBom(text)
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((content) => ({ source: "paste" as const, content }));
}

export function normalizeReviewInput(input: ReviewImportInput): NormalizedReview[] {
  const fromPayload = input.reviews ?? [];
  const fromCsv = input.csv ? parseCsvReviews(input.csv) : [];
  const fromText = input.text ? parsePastedReviews(input.text) : [];
  return [...fromPayload, ...fromCsv, ...fromText].filter(
    (review) => review.content.trim().length > 0,
  );
}

export function explainEmptyImport(input: ReviewImportInput): string {
  const hasText = Boolean(input.text?.trim());
  const hasCsv = Boolean(input.csv?.trim());
  const hasReviews = Boolean(input.reviews?.length);

  if (!hasText && !hasCsv && !hasReviews) {
    return "Paste reviews, upload a CSV, or load the sample to run an analysis.";
  }

  if (hasCsv && parseCsvReviews(input.csv ?? "").length === 0) {
    return "We could not find review text in that CSV. Use a review, content, text, comment, or body column.";
  }

  if (hasReviews && (input.reviews ?? []).every((review) => !review.content?.trim())) {
    return "The reviews array did not include any review text.";
  }

  return "We could not find any review text to analyze. Add pasted reviews or a CSV with a review column.";
}

export function validateCsvFile(file: {
  name: string;
  size: number;
  type: string;
}): string | null {
  const name = file.name.toLowerCase();
  const allowedType =
    file.type === "" ||
    file.type === "text/csv" ||
    file.type === "text/plain" ||
    file.type === "application/octet-stream" ||
    file.type === "application/vnd.ms-excel" ||
    file.type === "application/csv";

  if (!name.endsWith(".csv") || !allowedType) {
    return "Choose a .csv file. The file is read in your browser and sent as text with the analysis request.";
  }
  if (file.size === 0) {
    return "That CSV file is empty. Export reviews with a review or content column, then try again.";
  }
  if (file.size > MAX_CSV_UPLOAD_BYTES) {
    return "CSV must be 2 MB or smaller. Split the file or paste a smaller sample.";
  }
  return null;
}
