"use server";

import { headers } from "next/headers";
import { extractMarkdownOnly, type AiExtractionResult } from "@/lib/extractor";

const MAX_INPUT_CHARS = 6000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

// Best-effort in-process rate limit — this is a single PM2 instance, not a
// serverless fleet, so a plain Map survives for the process lifetime and is
// enough to blunt scripted abuse of a public, unauthenticated AI endpoint.
// It resets on deploy/restart; the hard MAX_INPUT_CHARS cap is the real cost
// control regardless of request volume.
const requestLog = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(key, timestamps);
    return true;
  }
  timestamps.push(now);
  requestLog.set(key, timestamps);
  return false;
}

export interface MarkdownPreviewResult {
  ok: boolean;
  error?: string;
  data?: AiExtractionResult;
}

export async function extractMarkdownPreviewAction(
  _prev: MarkdownPreviewResult | null,
  formData: FormData,
): Promise<MarkdownPreviewResult> {
  const rawTranscript = String(formData.get("transcript") ?? "").trim();

  if (!rawTranscript) {
    return { ok: false, error: "Paste a Slack thread first." };
  }
  if (rawTranscript.length > MAX_INPUT_CHARS) {
    return { ok: false, error: `Keep it under ${MAX_INPUT_CHARS.toLocaleString()} characters — paste one thread, not a whole channel export.` };
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return { ok: false, error: "Too many requests — wait a minute and try again." };
  }

  const result = await extractMarkdownOnly(rawTranscript);
  if (!result) {
    return { ok: false, error: "Extraction failed — the AI model was unable to process this thread. Try again in a moment." };
  }

  return { ok: true, data: result };
}
