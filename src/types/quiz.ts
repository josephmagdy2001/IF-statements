export type GradeLevel = 'Grade 4' | 'Grade 5' | 'Grade 6';

export type QuestionDifficulty = 'easy' | 'medium' | 'hard';

export type Language = 'en' | 'ar';

export interface Question {
  id: string;
  grade: GradeLevel;
  difficulty: QuestionDifficulty;
  points: number;
  title: string;
  titleArabic?: string;
  topic: string;
  topicArabic?: string;
  question: string;
  questionArabic?: string;
  codeSnippet?: string;
  options: string[];
  optionsArabic?: string[];
  correctIndex: number;
  explanation: string;
  explanationArabic?: string;
  hint?: string;
  hintArabic?: string;
}

export interface StudentSession {
  studentName: string;
  grade: GradeLevel;
  startTime: number;
  remainingLives: number;
  currentQuestionIndex: number;
  answers: Record<string, number>; // questionId -> selectedOptionIndex
  isCompleted: boolean;
  score: number;
  correctCount: number;
  incorrectCount: number;
  timeSpentSeconds: number;
  violationsCount: number;
}

export interface LeaderboardEntry {
  id: string;
  studentName: string;
  grade: GradeLevel;
  score: number;
  correctCount: number;
  incorrectCount: number;
  totalQuestions: number;
  percentage: number;
  remainingLives: number;
  completionTimeSeconds: number;
  completedAt: string; // ISO date string
}

export type MascotMood = 'happy' | 'thinking' | 'celebrating' | 'sad' | 'warning' | 'cool';
