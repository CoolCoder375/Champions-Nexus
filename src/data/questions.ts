import { type StrategyQuestion } from '../types/Champion';

export const strategyQuestions: StrategyQuestion[] = [
  {
    id: '1',
    question: 'How is this champion to play with? What are their key abilities and playstyle?',
    category: 'gameplay'
  },
  {
    id: '2',
    question: 'Which champions is this character good against? What are their ideal matchups?',
    category: 'counters'
  },
  {
    id: '3',
    question: 'Which champions is this character bad against? What matchups should be avoided?',
    category: 'counters'
  },
  {
    id: '4',
    question: 'What are the signature abilities and awakened abilities of this champion?',
    category: 'abilities'
  },
  {
    id: '5',
    question: 'What is the best strategy for using this champion?',
    category: 'general'
  },
  {
    id: '6',
    question: 'What masteries work best with this champion?',
    category: 'general'
  },
  {
    id: '7',
    question: 'What are the best synergy teams for this champion?',
    category: 'general'
  },
  {
    id:'8',
    question: 'What is the Class of this champion and what is counter of him and what this champion could counter',
    category:'general'
  }
];