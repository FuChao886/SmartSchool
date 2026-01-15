
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const MODELS = {
  FAST: 'gemini-3-flash-preview',
  PRO: 'gemini-3-pro-preview',
};

export async function askTutor(question: string, context?: string) {
  const systemInstruction = `You are a helpful university academic tutor. 
    Break down complex concepts into simple steps. 
    If asked to solve a problem, show the logical derivation.
    Context: ${context || 'General subjects'}`;

  const response = await ai.models.generateContent({
    model: MODELS.PRO,
    contents: question,
    config: { systemInstruction }
  });
  return response.text;
}

export async function summarizeNotes(rawText: string) {
  const systemInstruction = "You are a note-taking expert. Convert the following transcript or text into a structured, hierarchical set of notes with key takeaways and definitions. Use Markdown formatting.";
  
  const response = await ai.models.generateContent({
    model: MODELS.FAST,
    contents: `Summarize this text: ${rawText}`,
    config: { systemInstruction }
  });
  return response.text;
}

export async function analyzeMood(text: string) {
  const response = await ai.models.generateContent({
    model: MODELS.FAST,
    contents: `Analyze the mood of this journal entry and provide empathetic feedback and one small actionable self-care tip. Journal: "${text}"`,
    config: {
      systemInstruction: "You are a warm, supportive campus mental health assistant. Be empathetic, non-judgmental, and constructive.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          sentiment: { type: Type.STRING, description: "One word sentiment (e.g., Happy, Stressed, Anxious)" },
          feedback: { type: Type.STRING },
          tip: { type: Type.STRING }
        },
        required: ["sentiment", "feedback", "tip"]
      }
    }
  });
  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    return { sentiment: 'Unknown', feedback: 'I hear you. Let me know more.', tip: 'Take a deep breath.' };
  }
}

export async function generateStudyPlan(goals: string, currentStatus: string) {
  const response = await ai.models.generateContent({
    model: MODELS.PRO,
    contents: `Generate a study plan for: ${goals}. Current status: ${currentStatus}`,
    config: {
      systemInstruction: "Create a personalized 7-day study plan. Balance intensity with rest periods.",
    }
  });
  return response.text;
}
