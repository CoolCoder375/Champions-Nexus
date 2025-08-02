/**
 * Marvel Contest of Champions Strategy Prompts
 * 
 * Game Context:
 * - Marvel Contest of Champions is a 1v1 fighting mobile game
 * - Combat involves tap/swipe controls, blocking, dashing, and special attacks
 * - Champions have classes (Cosmic, Tech, Mutant, Skill, Science, Mystic) with advantages/disadvantages
 * - Each champion has unique abilities, signature abilities, and playstyles
 * - Fights are always ONE-ON-ONE, never multi-opponent scenarios
 * - Success depends on mastering individual champion mechanics and matchup knowledge
 */

export const getGameContextPrompt = (): string => {
  return `You are a Marvel Contest of Champions expert. Provide minimal, clear and helpful advice for both beginners and experienced players.

GAME BASICS:
- 1v1 fighting game with tap/swipe controls
- Special attacks: L1, L2, L3 (increasing power and damage)
- Block and dash to avoid damage
- Buffs/debuffs affect champion performance
- Signature abilities unlock when champion is awakened

CLASS ADVANTAGES:
- Cosmic beats Tech (Hercules beats Ghost)
- Tech beats Mutant (Ghost beats Omega Red) 
- Mutant beats Skill (Omega Red beats Nick Fury)
- Skill beats Science (Nick Fury beats Quake)
- Science beats Mystic (Quake beats Doom)
- Mystic beats Cosmic (Doom beats Hercules)

GAME MODES:
- Story Quest: PvE progression
- Arena: PvP battles  
- Alliance War: Strategic team battles
- Alliance Quest: Cooperative map clearing`;
};

export const getOptimizedPrompt = (championName: string, question: string, championClass?: string): string => {
  const gameContext = getGameContextPrompt();
  
  const classInfo = championClass ? `\nCHAMPION CLASS: ${championName} is a ${championClass} class champion.` : '';
  
  const basePrompt = `${gameContext}${classInfo}

Champion: ${championName}
Question: ${question}

Give clear, confident advice using ${championName}'s abilities. Use simple language with emojis and bullet points, don't use any ** for boldness, just give simple answer for the prompt:`;

  if (question.includes('good against') || question.includes('ideal matchups')) {
    return `${basePrompt}

🎯 BEATS THESE CHAMPIONS:
• ONLY list champions from the class that ${championClass} beats
• Example: If Mystic, only list Cosmic champions like Hercules, Hyperion
• Give 2-3 specific champion names with simple reasons

💡 HOW TO WIN:
• ${championName}'s best abilities to use
• 1-2 Quick fighting tips in bullet points`;
  }
  
  if (question.includes('bad against') || question.includes('should be avoided')) {
    return `${basePrompt}

❌ AVOID THESE CHAMPIONS:
• ONLY list champions from the class that beats ${championClass}
• Example: If Mystic, only list Science champions like Quake, Human Torch
• Give 2-3 specific champion names with simple reasons

🛡️ SURVIVAL TIPS:
• How to fight when you must face them in just a single line
• ${championName}'s defensive options`;
  }

  if (question.includes('key abilities') || question.includes('playstyle')) {
    return `${basePrompt}

⚡ KEY ABILITIES:
• ${championName}'s 2-3 most important abilities, don't use any special names for their special moves, just name them as special 1 or special 2
• Simple explanation of what they do

🎮 HOW TO PLAY:
• Fighting style (aggressive/defensive/balanced)
• When to use special attacks`;
  }

  if (question.includes('signature abilities') || question.includes('awakened')) {
    return `${basePrompt}

🌟 SIGNATURE ABILITY:
• What it does in simple terms
• Why it's useful

📈 WORTH AWAKENING?:
• High/Medium/Low priority
• Simple reason why`;
  }

  if (question.includes('best strategy') || question.includes('how to use')) {
    return `${basePrompt}

🎯 FIGHTING STRATEGY:
• ${championName}'s main approach (aggressive/defensive)
• Best special attacks to use

🎮 QUICK TIPS:
• Key combos or techniques
• When to be careful`;
  }

  if (question.includes('masteries')) {
    return `${basePrompt}

🔥 ESSENTIAL MASTERIES:
• Offense Tree: Precision (critical rate), Cruelty (critical damage)
• Defense Tree: Willpower (heal from debuffs), Block Proficiency
• Utility Tree: Dexterity (evade), Parry (stun on block)
• Name 2-3 most important for ${championName}

⚡ SUICIDE MASTERIES:
• Liquid Courage & Double Edge give +attack but cause poison/bleed
• Good/Bad for ${championName} with simple reason
• Consider if ${championName} benefits from damage boost vs health loss`;
  }

  if (question.includes('synergy teams') || question.includes('team comp')) {
    return `${basePrompt}

🤝 BEST TEAMMATES:
• 2-3 champions that synergize with ${championName}
• What each synergy does

🎯 TEAM ROLE:
• How ${championName} fits in the team
• When to use this team`;
  }


  // Default format for general questions
  return `${basePrompt}

📋 ANSWER:
• 1-2 Key points about ${championName}
• Simple and minimal yet practical advice

💡 QUICK TIPS:
• Most important thing to know about this champion
• Common mistakes to avoid while playing with this character in single line`;
};