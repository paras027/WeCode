import { Problem, User, Contest, Submission } from '@/types';

export const mockProblems: Problem[] = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    status: 'Solved',
    acceptance: 47.3,
    submissions: 8234,
    topics: ['Array', 'Hash Table'],
  },
  {
    id: '2',
    title: 'Reverse String',
    difficulty: 'Easy',
    status: 'Solved',
    acceptance: 85.2,
    submissions: 4521,
    topics: ['String', 'Two Pointers'],
  },
  {
    id: '3',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    status: 'Attempted',
    acceptance: 31.4,
    submissions: 2154,
    topics: ['Array', 'Binary Search', 'Divide and Conquer'],
  },
  {
    id: '4',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    status: 'Todo',
    acceptance: 34.8,
    submissions: 5682,
    topics: ['String', 'Sliding Window', 'Hash Table'],
  },
  {
    id: '5',
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    status: 'Todo',
    acceptance: 32.3,
    submissions: 4231,
    topics: ['String', 'Dynamic Programming'],
  },
  {
    id: '6',
    title: 'ZigZag Conversion',
    difficulty: 'Medium',
    status: 'Solved',
    acceptance: 41.2,
    submissions: 3421,
    topics: ['String'],
  },
];

export const mockUser: User = {
  id: '1',
  username: 'CodeMaster',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CodeMaster',
  bio: 'Passionate about solving problems and learning new algorithms.',
  rating: 1856,
  problemsSolved: 156,
  totalSubmissions: 312,
  currentStreak: 7,
  maxStreak: 23,
};

export const mockContests: Contest[] = [
  {
    id: '1',
    title: 'Weekly Contest 423',
    description: 'Regular weekly programming contest',
    difficulty: 'Medium',
    status: 'Upcoming',
    startTime: new Date(Date.now() + 86400000 * 2),
    endTime: new Date(Date.now() + 86400000 * 2 + 5400000),
    duration: 90,
    problemCount: 4,
    participants: 12434,
  },
  {
    id: '2',
    title: 'Biweekly Contest 210',
    description: 'Biweekly programming contest',
    difficulty: 'Hard',
    status: 'Upcoming',
    startTime: new Date(Date.now() + 86400000 * 14),
    endTime: new Date(Date.now() + 86400000 * 14 + 5400000),
    duration: 90,
    problemCount: 5,
    participants: 8234,
  },
  {
    id: '3',
    title: 'Code Challenge 2024',
    description: 'Annual championship',
    difficulty: 'Hard',
    status: 'Live',
    startTime: new Date(Date.now() - 3600000),
    endTime: new Date(Date.now() + 7200000),
    duration: 180,
    problemCount: 6,
    participants: 15234,
  },
];

export const mockSubmissions: Submission[] = [
  {
    id: '1',
    problemId: '1',
    status: 'Accepted',
    timestamp: new Date(Date.now() - 3600000),
    language: 'javascript',
    memory: 45.2,
    time: 102,
  },
  {
    id: '2',
    problemId: '2',
    status: 'Accepted',
    timestamp: new Date(Date.now() - 7200000),
    language: 'python',
    memory: 52.1,
    time: 156,
  },
  {
    id: '3',
    problemId: '6',
    status: 'Accepted',
    timestamp: new Date(Date.now() - 86400000),
    language: 'cpp',
    memory: 38.5,
    time: 89,
  },
  {
    id: '4',
    problemId: '3',
    status: 'WrongAnswer',
    timestamp: new Date(Date.now() - 172800000),
    language: 'java',
  },
];

export const leaderboardData = [
  { rank: 1, username: 'Algorithm.Master', solved: 245, penalty: 1234, rating: 2450 },
  { rank: 2, username: 'PythonGuru', solved: 238, penalty: 1456, rating: 2380 },
  { rank: 3, username: 'CodeNinja', solved: 235, penalty: 1678, rating: 2340 },
  { rank: 4, username: 'CodeMaster', solved: 156, penalty: 2341, rating: 1856 },
  { rank: 5, username: 'DataWizard', solved: 189, penalty: 2145, rating: 2100 },
  { rank: 6, username: 'JSKing', solved: 167, penalty: 2456, rating: 1890 },
  { rank: 7, username: 'GoFast', solved: 145, penalty: 2678, rating: 1750 },
  { rank: 8, username: 'RustLover', solved: 134, penalty: 2890, rating: 1650 },
];

export const dashboardStats = [
  { label: 'Problems Solved', value: 156, change: 5 },
  { label: 'Acceptance Rate', value: '68%', change: 2 },
  { label: 'Current Streak', value: 7, change: 1 },
  { label: 'Global Rank', value: '12,456', change: -234 },
];
