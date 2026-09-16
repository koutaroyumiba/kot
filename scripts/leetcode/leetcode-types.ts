export type Difficulty = "Easy" | "Medium" | "Hard";
export type LeetcodeResponse =
  | DailyQuestionResponse
  | QuestionListResponse
  | SubmissionListResponse
  | SubmissionDetailsResponse;

export interface LeetcodeCredentials {
  session: string;
  csrfToken: string;
}

export interface QuestionMetadata {
  questionId: string;
  title: string;
  slug: string;
  questionUrl: string;
  difficulty: Difficulty;
  topics: string[];
  challengeDate?: string;
}

export interface SubmissionSummary {
  id: string;
  statusDisplay: string;
  lang: string;
  timestamp: string;
}

export interface SubmissionDetails {
  code: string;
  timestamp: number;
  runtimeDisplay: string;
  memoryDisplay: string;
  totalCorrect: number;
  totalTestcases: number;
  language: {
    name: string;
    verboseName: string;
  };
}

export interface DailyQuestionResponse {
  data?: {
    activeDailyCodingChallengeQuestion: {
      date: string;
      link: string;
      question: {
        questionFrontendId: string;
        title: string;
        titleSlug: string;
        difficulty: "Easy" | "Medium" | "Hard";
        topicTags: Array<{ name: string }>;
      };
    } | null;
  };
  errors?: Array<{ message: string }>;
}

export interface QuestionListResponse {
  data?: {
    problemsetQuestionList: {
      questions: Array<{
        questionFrontendId: string;
        title: string;
        titleSlug: string;
        difficulty: "Easy" | "Medium" | "Hard";
        topicTags: Array<{ name: string }>;
      }>;
    } | null;
  };
  errors?: Array<{ message: string }>;
}

export interface SubmissionListResponse {
  data?: {
    questionSubmissionList: {
      lastKey: string | null;
      hasNext: boolean | null;
      submissions: SubmissionSummary[] | null;
    } | null;
  };
  errors?: Array<{ message: string }>;
}

export interface SubmissionDetailsResponse {
  data?: {
    submissionDetails: {
      code: string;
      timestamp: number;
      runtimeDisplay: string;
      memoryDisplay: string;
      totalCorrect: number;
      totalTestcases: number;
      lang: {
        name: string;
        verboseName: string;
      };
    } | null;
  };
  errors?: Array<{ message: string }>;
}
