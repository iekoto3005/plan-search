

import { GoogleGenAI, Type } from "@google/genai";
import { GeminiFilterOptions } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export async function parseQueryWithGemini(query: string, options: GeminiFilterOptions): Promise<any> {
  const model = "gemini-2.5-flash";

  const systemInstruction = `あなたは建築プランの検索アシスタントです。ユーザーの自然言語クエリを解析し、指定されたJSONスキーマに従って検索条件を抽出してください。
ユーザーが指定しなかった項目は省略してください。面積は平方メートル（m2, 平米）で解釈してください。
利用可能なオプション:
- planType: ${options.planTypes.join(', ')}
- floor: ${options.floors.join(', ')}
- orientation: ${options.orientations.join(', ')}
- area: 0から${options.maxArea}m2まで`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: query,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            planType: {
              type: Type.STRING,
              description: `プランの種別。利用可能な値: ${options.planTypes.join(', ')}`,
              enum: options.planTypes
            },
            floor: {
              type: Type.STRING,
              description: `階数。利用可能な値: ${options.floors.join(', ')}`,
              enum: options.floors
            },
            orientation: {
              type: Type.STRING,
              description: `方位。利用可能な値: ${options.orientations.join(', ')}`,
              enum: options.orientations
            },
            minArea: {
              type: Type.NUMBER,
              description: "最小面積（平方メートル）。"
            },
            maxArea: {
              type: Type.NUMBER,
              description: "最大面積（平方メートル）。"
            }
          }
        },
      }
    });

    const jsonString = response.text.trim();
    if (!jsonString) {
        throw new Error("Gemini API returned an empty response.");
    }
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to parse query with Gemini API.");
  }
}
