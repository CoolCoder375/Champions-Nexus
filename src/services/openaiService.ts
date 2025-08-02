import axios from 'axios';
import { getOptimizedPrompt } from './prompt';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent';

export interface AIResponse {
  answer: string;
  error?: string;
}

export const getChampionAnalysis = async (
  championName: string,
  question: string,
  championClass?: string
): Promise<AIResponse> => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error('Gemini API key is not configured');
    }
   
    const prompt = getOptimizedPrompt(championName, question, championClass);

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${apiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      answer: response.data.candidates[0].content.parts[0].text.trim()
    };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    
    if (axios.isAxiosError(error)) {
      return {
        answer: '',
        error: error.response?.data?.error?.message || 'Failed to get analysis from Gemini'
      };
    }
    
    return {
      answer: '',
      error: 'An unexpected error occurred'
    };
  }
};