export enum QuestionType {
  COUNTING_CUBES = 'COUNTING_CUBES',
  PATTERNS = 'PATTERNS',
  LOGIC = 'LOGIC',
  GEOMETRY = 'GEOMETRY',
  ARITHMETIC_VISUAL = 'ARITHMETIC_VISUAL',
  NUMBER_COMPARISON = 'NUMBER_COMPARISON',
  MISSING_NUMBER = 'MISSING_NUMBER',
  WORD_PROBLEM = 'WORD_PROBLEM'
}

export interface Option {
  id: string;
  value: string | number;
}

export interface Question {
  id: number;
  grade: number;
  type: QuestionType;
  text: string;
  imageUrl?: string;
  options: Option[];
  correctAnswer: string | number;
  explanation: string;
  visualData?: any;
}

export type GradeLevel = 1 | 2 | 3 | 4 | 5;
