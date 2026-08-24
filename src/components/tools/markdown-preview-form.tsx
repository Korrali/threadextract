"use client";

import { useActionState } from "react";
import { AlertCircle, Copy, Check } from "lucide-react";
import { useState } from "react";
import { SubmitButton } from "@/components/ui/submit-button";
import { extractMarkdownPreviewAction, type MarkdownPreviewResult } from "@/lib/actions/free-tools";

const EXAMPLE = `User alice: has anyone hit "ECONNREFUSED" connecting to redis from the worker pods?
User bob: yeah — that's usually the redis service DNS not resolving inside the pod network. check if REDIS_URL is using the k8s service name, not localhost
User alice: ohh it was pointing at localhost:6379 from a copied .env. switching to redis://redis-svc:6379 fixed it
User bob: yep, add that to the runbook, it's the third time this month`;

export function MarkdownPreviewForm() {
  const [state, action] = useActionState<MarkdownPreviewResult | null, FormData>(
    extractMarkdownPreviewAction,
    null,
  );
  const [copied, setCopied] = useState(false);
  const [value, setValue] = useState("");

  async function copyToClipboard() {
    if (!state?.data?.markdown_content) return;
    await navigator.clipboard.writeText(state.data.markdown_content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-4">
      <form action={action} className="space-y-3">
        <textarea
          name="transcript"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={10}
          maxLength={6000}
          placeholder="Paste a raw Slack thread here — usernames, timestamps, all the noise included. We'll strip it down to the actual problem and solution."
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0559C7]/40"
        />
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setValue(EXAMPLE)}
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors underline"
          >
            Use an example thread
          </button>
          <SubmitButton
            loadingLabel="Extracting…"
            className="rounded-lg bg-gradient-to-b from-[#0559C7] to-[#0D8C4D] px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Extract to Markdown
          </SubmitButton>
        </div>
      </form>

      {state && !state.ok && (
        <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      {state?.ok && state.data && (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2.5">
            <span className="text-sm font-semibold text-foreground">{state.data.title}</span>
            <button
              type="button"
              onClick={copyToClipboard}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy markdown"}
            </button>
          </div>
          <pre className="max-h-[400px] overflow-auto whitespace-pre-wrap px-4 py-4 text-sm text-foreground leading-relaxed">
            {state.data.markdown_content}
          </pre>
        </div>
      )}
    </div>
  );
}
