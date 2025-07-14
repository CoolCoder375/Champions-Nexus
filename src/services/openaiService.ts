import axios from 'axios';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export interface AIResponse {
  answer: string;
  error?: string;
}

export const getChampionAnalysis = async (
  championName: string,
  question: string
): Promise<AIResponse> => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error('Gemini API key is not configured');
    }

    const getOptimizedPrompt = (championName: string, question: string): string => {
      // Base prompt with formatting instructions
      const basePrompt = `You are an expert Marvel Contest of Champions (MCOC) strategy guide. Answer concisely with emojis, bullet points, and clear formatting.

Champion: ${championName}
Question: ${question}

Format your response as follows:`;

      // Question-specific prompts
      if (question.includes('good against') || question.includes('ideal matchups')) {
        return `${basePrompt}

🎯 **STRONG AGAINST:**
• **Champion Name 1** - Brief reason why
• **Champion Name 2** - Brief reason why

💡 **KEY MATCHUP TIPS:**
• Specific strategy point
• Important timing/technique

⚡ **BEST SCENARIOS:**
• When to use this champion`;
      }
      
      if (question.includes('bad against') || question.includes('should be avoided')) {
        return `${basePrompt}

❌ **WEAK AGAINST:**
• Champion Name 1** - Brief reason why
• **Champion Name 2** - Brief reason why

⚠️ **AVOID WHEN:**
• Specific scenarios to avoid

🛡️ **DEFENSIVE TIPS:**
• How to minimize weaknesses`;
      }

      if (question.includes('key abilities') || question.includes('playstyle')) {
        return `${basePrompt}

⚡ **KEY ABILITIES:**
• Ability 1 - Brief description
• Ability 2 - Brief description

🎮 **PLAYSTYLE:**
• Main strategy approach
• Combat rhythm/timing

🔥 **DAMAGE ROTATION:**
• Step 1
• Step 2
• Step 3`;
      }

      if (question.includes('signature abilities') || question.includes('awakened')) {
        return `${basePrompt}

🌟 **SIGNATURE ABILITY:**
• What it does
• Why it's important

📈 **AWAKENING PRIORITY:**
• High/Medium/Low priority
• Reasoning

💎 **SIG STONE INVESTMENT:**
• Recommended signature level`;
      }

      if (question.includes('best strategy')) {
        return `${basePrompt}

🎯 **OPTIMAL STRATEGY:**
• Primary approach
• Secondary tactics

⚡ **DAMAGE SEQUENCE:**
• Opening moves
• Mid-fight tactics
• Finishing moves

🛡️ **DEFENSIVE TIPS:**
• How to stay safe`;
      }

      if (question.includes('Alliance War') || question.includes('Alliance Quest')) {
        return `${basePrompt}

🏛️ **ALLIANCE WAR:**
• Best attack/defense role
• Ideal war placement

🗺️ **ALLIANCE QUEST:**
• Map sections where effective
• Energy efficiency

🎯 **TEAM SYNERGIES:**
• Best war/quest teammates`;
      }

      if (question.includes('masteries')) {
        return `${basePrompt}

🔥 **ESSENTIAL MASTERIES:**
• Must-have mastery 1
• Must-have mastery 2

💡 **RECOMMENDED SETUP:**
• Offense masteries
• Defense masteries

⚡ **PRIORITY ORDER:**
• First priority
• Second priority`;
      }

      if (question.includes('synergy teams')) {
        return `${basePrompt}

🤝 **BEST TEAM COMPOSITIONS:**
• **Team 1:** Champion names + synergy effect
• **Team 2:** Champion names + synergy effect

🌟 **KEY SYNERGIES:**
• Specific synergy benefit
• How it enhances performance

🎯 **TEAM ROLES:**
• Where ${championName} fits best`;
      }

      if (question.includes('base stats') || question.includes('7 star')) {
        return `${basePrompt}

📊 **7-STAR BASE STATS (Rank 1):**
• Health: ~XX,XXX
• Attack: ~X,XXX
• Critical Rating: ~XXX

📈 **NOTABLE STATS:**
• Standout attributes
• Comparison to similar champions

⭐ **STAT PRIORITIES:**
• Most important stats for this champion`;
      }

      // Default format for other questions
      return `${basePrompt}

📋 **ANSWER:**
• Key point 1
• Key point 2
• Key point 3

💡 **PRO TIPS:**
• Advanced tip 1
• Advanced tip 2`;
    };

    const prompt = getOptimizedPrompt(championName, question);

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