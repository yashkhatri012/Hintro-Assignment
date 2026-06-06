# AI Approach

## Prompt Design

The prompt instructs Gemini to:

* Use only transcript information.
* Avoid inventing facts.
* Generate structured JSON.
* Produce summaries, decisions, follow ups, and action items.
* Attach citations to every generated insight.

The model is explicitly instructed to return valid JSON only.

---

## Citation Strategy

Every generated insight must reference transcript timestamps.

Example:

{
"text": "Launch planned for next Friday.",
"citations": [
{
"timestamp": "00:10"
}
]
}

This allows outputs to be traced back to source evidence.

---

## Hallucination Prevention Approach

Several safeguards were implemented:

* Explicit grounding instructions.
* Transcript only reasoning.
* No external knowledge allowed.
* Citation requirements.
* Structured output format.

Prompt instruction example:

"Use ONLY information explicitly present in the transcript."

---

## Output Validation Strategy

After generation:

* Markdown wrappers are removed.
* JSON is parsed.
* Invalid outputs trigger errors.
* Analysis is stored only after successful validation.

---

## Known Limitations

* Gemini may occasionally return unavailable errors.
* Due dates are not always inferable from transcripts.
* Transcript quality directly affects extraction quality.
* Complex meeting discussions may require human review.
