import Groq from "groq-sdk";

export const analyzeMeeting = async (meeting) => {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  const transcript = meeting.transcript
    .map((line) => `[${line.timestamp}] ${line.speaker}: ${line.text}`)
    .join("\n");

  const meetingDate = new Date(meeting.meetingDate).toISOString().split("T")[0];

  const prompt = `
You are a meeting analysis assistant.

Meeting Date: ${meetingDate}

Rules:
- Use ONLY information explicitly present in the transcript.
- Do not invent attendees, action items, decisions, or outcomes.
- Every item must contain at least one citation timestamp.
- For actionItems, always extract a dueDate if ANY deadline, date, or timeframe is mentioned (e.g. "by Friday", "next week", "end of month", "in 3 days").
- If a relative date is mentioned (e.g. "by Friday", "next week"), calculate the actual date based on the Meeting Date provided above and return it in YYYY-MM-DD format.
- If absolutely no deadline or timeframe is mentioned for an action item, set dueDate to null.
- Return ONLY valid raw JSON. Do not wrap in markdown or code blocks.

The response MUST match this schema exactly:

{
  "summary": [
    {
      "text": "string",
      "citations": [{ "timestamp": "string" }]
    }
  ],
  "decisions": [
    {
      "text": "string",
      "citations": [{ "timestamp": "string" }]
    }
  ],
  "followUps": [
    {
      "text": "string",
      "citations": [{ "timestamp": "string" }]
    }
  ],
  "actionItems": [
    {
      "task": "string",
      "assignee": "string",
      "dueDate": "YYYY-MM-DD or null",
      "citations": [{ "timestamp": "string" }]
    }
  ]
}

Transcript:
${transcript}
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });

  let text = response.choices[0].message.content.trim();
  text = text.replace(/```json/g, "").replace(/```/g, "").trim();

  const analysis = JSON.parse(text);
  return analysis;
};