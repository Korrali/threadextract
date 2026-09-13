# Model Registry — ThreadExtraction

Last verified 2026-09-13. `gemini-1.5-flash` and `gemini-2.0-flash` are both retired
server-side (404) — never reintroduce either.

## Chain

Free-tier only, was already this way before this pass — no paid vendor to remove.

| Row | Primary | FB |
|---|---|---|
| Slack → Notion summarize | Gemini `gemini-flash-lite-latest` (rotates across `GEMINI_API_KEYS`, comma-separated) | Groq `openai/gpt-oss-120b` (rotates across `GROQ_API_KEYS`) |

## Alerting

Total exhaustion (both Gemini and Groq key lists tried and failed) fires a Telegram + email
alert — previously a `console.error` only. Debounced to one alert per 15 minutes. See
`generateContentWithFallback` in `src/lib/extractor.ts`.

## Env vars this registry depends on

`GEMINI_API_KEYS`, `GROQ_API_KEYS` (both comma-separated lists — unlike the other three
products' single/`_2`-suffixed key pattern), `GEMINI_MODEL` / `GROQ_MODEL` (optional
overrides), `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `MODEL_ALERT_EMAIL`, `RESEND_API_KEY`,
`EMAIL_FROM`.
