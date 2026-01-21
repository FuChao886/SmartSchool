
import { GoogleGenAI, Type } from "@google/genai";

export const MODELS = {
  FAST: 'gemini-3-flash-preview',
  PRO: 'gemini-3-pro-preview',
};

function getAI() {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
}

export async function* askTutorStream(question: string, context?: string) {
  const ai = getAI();
  const systemInstruction = `You are a helpful university academic tutor. 
    Break down complex concepts into simple steps. 
    If asked to solve a problem, show the logical derivation.
    Language: Professional Chinese.
    Context: ${context || 'General university subjects'}`;

  const response = await ai.models.generateContentStream({
    model: MODELS.PRO,
    contents: question,
    config: { systemInstruction }
  });
  
  for await (const chunk of response) {
    yield chunk.text;
  }
}

export async function* summarizeNotesStream(rawText: string) {
  const ai = getAI();
  const systemInstruction = "You are a note-taking expert. Convert the following transcript or text into a structured, hierarchical set of notes with key takeaways and definitions. Use Markdown formatting. Language: Chinese.";
  
  const response = await ai.models.generateContentStream({
    model: MODELS.FAST,
    contents: `Summarize this text: ${rawText}`,
    config: { systemInstruction }
  });

  for await (const chunk of response) {
    yield chunk.text;
  }
}

export async function* generateStudyPlanStream(goals: string, currentStatus: string) {
  const ai = getAI();
  const response = await ai.models.generateContentStream({
    model: MODELS.PRO,
    contents: `Goals: ${goals}. Current status: ${currentStatus}`,
    config: {
      systemInstruction: "You are a learning strategist. Create a detailed 7-day study plan with daily tasks, breakdown of concepts, and rest intervals. Use clear Chinese Markdown.",
    },
  });

  for await (const chunk of response) {
    yield chunk.text;
  }
}

export async function askTutor(question: string, context?: string) {
  const ai = getAI();
  const systemInstruction = `You are a helpful university academic tutor. 
    Context: ${context || 'General subjects'}`;

  const response = await ai.models.generateContent({
    model: MODELS.PRO,
    contents: question,
    config: { systemInstruction }
  });
  return response.text;
}

export async function summarizeNotes(rawText: string) {
  const ai = getAI();
  const systemInstruction = "You are a note-taking expert. Summarize this text in Markdown.";
  
  const response = await ai.models.generateContent({
    model: MODELS.FAST,
    contents: rawText,
    config: { systemInstruction }
  });
  return response.text;
}

export async function analyzeMood(text: string) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: MODELS.FAST,
    contents: `Analyze the mood of this journal entry: "${text}"`,
    config: {
      systemInstruction: "Analyze mood and return JSON with sentiment, feedback, and tip.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          sentiment: { type: Type.STRING },
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
    return { sentiment: 'Unknown', feedback: 'I hear you.', tip: 'Take a deep breath.' };
  }
}

export async function analyzeStudySession(subject: string, duration: string, details: string, confidence: string) {
  const ai = getAI();
  const prompt = `Student studied ${subject} for ${duration} minutes. Details: ${details}. Confidence level: ${confidence}/5.`;
  const response = await ai.models.generateContent({
    model: MODELS.PRO,
    contents: prompt,
    config: {
      systemInstruction: "Analyze study session and return JSON with summary, gaps, recommendation, and efficiencyScore.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          gaps: { type: Type.ARRAY, items: { type: Type.STRING } },
          recommendation: { type: Type.STRING },
          efficiencyScore: { type: Type.NUMBER }
        },
        required: ["summary", "gaps", "recommendation", "efficiencyScore"]
      }
    }
  });
  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    return null;
  }
}

export async function generateStudyPlan(goals: string, currentStatus: string) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: MODELS.PRO,
    contents: `Goals: ${goals}. Current status: ${currentStatus}`,
    config: {
      systemInstruction: "Create a 7-day study plan in Chinese Markdown.",
    },
  });
  return response.text;
}

export async function generateComprehensiveReport(data: any) {
  const ai = getAI();
  const prompt = `Based on study: ${JSON.stringify(data.study)}, mood: ${JSON.stringify(data.mood)}.`;
  const response = await ai.models.generateContent({
    model: MODELS.PRO,
    contents: prompt,
    config: {
      systemInstruction: "Generate comprehensive growth report JSON.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          healthScore: { type: Type.NUMBER },
          studyScore: { type: Type.NUMBER },
          insight: { type: Type.STRING },
          warning: { type: Type.STRING },
          nextWeekGoal: { type: Type.STRING }
        },
        required: ["healthScore", "studyScore", "insight", "nextWeekGoal"]
      }
    }
  });
  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    return null;
  }
}

export async function generateExamRevisionPlan(exams: any[]) {
  const ai = getAI();
  const examsStr = exams.map(e => `${e.subject} on ${e.date}`).join(', ');
  const response = await ai.models.generateContent({
    model: MODELS.PRO,
    contents: `Create revision schedule: ${examsStr}`,
    config: {
      systemInstruction: "Create a revision schedule JSON.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          overview: { type: Type.STRING },
          schedule: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.STRING },
                subject: { type: Type.STRING },
                focus: { type: Type.STRING },
                duration: { type: Type.STRING }
              },
              required: ["day", "subject", "focus", "duration"]
            }
          }
        },
        required: ["overview", "schedule"]
      }
    }
  });
  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    return null;
  }
}
