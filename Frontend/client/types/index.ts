export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Status = 'Todo' | 'Attempted' | 'Solved';
export type SubmissionStatus = 'Queued' | 'Running' | 'Accepted' | 'WrongAnswer' | 'CompilationError' | 'RuntimeError' | 'TimeLimitExceeded' | 'MemoryLimitExceeded';
export type Language = 'javascript' | 'python' | 'cpp' | 'java' | 'go' | 'rust';
export type ContestStatus = 'Upcoming' | 'Live' | 'Ended';

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  status: Status;
  acceptance: number;
  submissions: number;
  topics: string[];
}

export interface ProblemDetail extends Problem {
  description: string;
  examples: Example[];
  constraints: string[];
  hints: string[];
}

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface Submission {
  id: string;
  problemId: string;
  status: SubmissionStatus;
  timestamp: Date;
  language: Language;
  memory?: number;
  time?: number;
  testResults?: TestResult[];
}

export interface TestResult {
  testCase: number;
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  passed: boolean;
}

export interface Contest {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  status: ContestStatus;
  startTime: Date;
  endTime: Date;
  duration: number;
  problemCount: number;
  participants: number;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  bio?: string;
  rating: number;
  problemsSolved: number;
  totalSubmissions: number;
  currentStreak: number;
  maxStreak: number;
}

export interface StatisticsCard {
  label: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
}
