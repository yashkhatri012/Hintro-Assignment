import { GoogleGenAI } from "@google/genai";


export const analyzeMeeting = async (meeting) => {
    console.log("GEMINI API KEY ",process.env.GEMINI_API_KEY);

    const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

  const transcript = meeting.transcript
    .map(
      (line) =>
        `[${line.timestamp}] ${line.speaker}: ${line.text}`
    )
    .join("\n");

  const prompt = `
You are a meeting analysis assistant.

Rules:
- Use ONLY information explicitly present in the transcript.
- Do not invent attendees.
- Do not invent action items.
- Do not invent decisions.
- Do not invent outcomes.
- Every item must contain at least one citation timestamp.
- Return ONLY valid JSON.

Response format:
Return ONLY valid JSON.

The response MUST match this schema exactly:

{
  "summary": [
    {
      "text": "string",
      "citations": [
        {
          "timestamp": "string"
        }
      ]
    }
  ],
  "decisions": [
    {
      "text": "string",
      "citations": [
        {
          "timestamp": "string"
        }
      ]
    }
  ],
  "followUps": [
    {
      "text": "string",
      "citations": [
        {
          "timestamp": "string"
        }
      ]
    }
  ],
  "actionItems": [
    {
      "task": "string",
      "assignee": "string",
      "citations": [
        {
          "timestamp": "string"
        }
      ]
    }
  ]
}

Do not wrap the JSON in markdown.

Return raw JSON only

Transcript:
${transcript}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  let text = response.text.trim();

text = text.replace(/```json/g, "");
text = text.replace(/```/g, "");

const analysis = JSON.parse(text);

return analysis;
  
};