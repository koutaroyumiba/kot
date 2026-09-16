import {
  DAILY_QUESTION_QUERY,
  QUESTION_LIST_QUERY,
  SUBMISSION_DETAILS_QUERY,
  SUBMISSION_LIST_QUERY,
} from "./leetcode-queries.ts";
import type {
  DailyQuestionResponse,
  SubmissionDetailsResponse,
  LeetcodeCredentials,
  LeetcodeResponse,
  QuestionListResponse,
  QuestionMetadata,
  SubmissionDetails,
  SubmissionListResponse,
  SubmissionSummary,
} from "./leetcode-types.ts";

const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql/";

async function fetchLeetcode<T extends LeetcodeResponse>(
  ref: string,
  query: string,
  variables: any = null,
): Promise<T> {
  let body: string;
  if (variables === null) {
    body = JSON.stringify({ query: query });
  } else {
    body = JSON.stringify({ query: query, variables: variables });
  }
  const response = await fetch(LEETCODE_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      referer: ref,
    },
    body: body,
  });

  if (!response.ok) {
    throw new Error(
      `Leetcode request failed: ${response.status} ${response.statusText}`,
    );
  }

  const payload = (await response.json()) as T;
  if (payload.errors?.length) {
    throw new Error(
      `Leetcode GraphQL error: ${payload.errors.map((error) => error.message).join("; ")}`,
    );
  }

  return payload;
}

async function fetchLeetcodeWithCredentials<T extends LeetcodeResponse>(
  credentials: LeetcodeCredentials,
  ref: string,
  query: string,
  variables: any = null,
): Promise<T> {
  let body: string;
  if (variables === null) {
    body = JSON.stringify({ query: query });
  } else {
    body = JSON.stringify({ query: query, variables: variables });
  }
  const response = await fetch(LEETCODE_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      cookie: [
        `LEETCODE_SESSION=${credentials.session}`,
        `csrftoken=${credentials.csrfToken}`,
      ].join("; "),
      "x-csrftoken": credentials.csrfToken,
      origin: "https://leetcode.com",
      referer: ref,
    },
    body: body,
  });

  if (!response.ok) {
    throw new Error(
      `Leetcode request failed: ${response.status} ${response.statusText}`,
    );
  }

  const payload = (await response.json()) as T;
  if (payload.errors?.length) {
    throw new Error(
      `Leetcode GraphQL error: ${payload.errors.map((error) => error.message).join("; ")}`,
    );
  }

  return payload;
}

export async function fetchDailyQuestion(): Promise<QuestionMetadata> {
  const payload = await fetchLeetcode<DailyQuestionResponse>(
    "https://leetcode.com/",
    DAILY_QUESTION_QUERY,
  );

  const challenge = payload.data?.activeDailyCodingChallengeQuestion;
  if (!challenge) {
    throw new Error("Leetcode did not return a daily question");
  }

  return {
    questionId: challenge.question.questionFrontendId,
    title: challenge.question.title,
    slug: challenge.question.titleSlug,
    questionUrl: new URL(challenge.link, "https://leetcode.com").href,
    difficulty: challenge.question.difficulty,
    topics: challenge.question.topicTags.map((topic) => topic.name),
    challengeDate: challenge.date,
  };
}

export async function fetchQuestionById(
  questionId: string,
): Promise<QuestionMetadata> {
  const payload = await fetchLeetcode<QuestionListResponse>(
    "https://leetcode.com/problemset/",
    QUESTION_LIST_QUERY,
    {
      categorySlug: "",
      limit: 20,
      skip: 0,
      filters: {
        searchKeywords: questionId,
      },
    },
  );

  const questions = payload.data?.problemsetQuestionList?.questions ?? [];
  const question = questions.find(
    (candidate) => candidate.questionFrontendId === questionId,
  );

  if (!question) {
    throw new Error(`Leetcode question ${questionId} was not found`);
  }

  return {
    questionId: question.questionFrontendId,
    title: question.title,
    slug: question.titleSlug,
    questionUrl: `https://leetcode.com/problems/${question.titleSlug}/`,
    difficulty: question.difficulty,
    topics: question.topicTags.map((topic) => topic.name),
  };
}

export async function fetchLatestAcceptedSubmission(
  question: QuestionMetadata,
  credentials: LeetcodeCredentials,
): Promise<SubmissionSummary> {
  const limit = 20;
  let offset = 0;
  let lastKey: string | null = null;

  while (true) {
    const payload: SubmissionListResponse =
      await fetchLeetcodeWithCredentials<SubmissionListResponse>(
        credentials,
        `${question.questionUrl}submissions/`,
        SUBMISSION_LIST_QUERY,
        { offset, limit, lastKey, questionSlug: question.slug },
      );

    const submissionList = payload.data?.questionSubmissionList;
    const submissions = submissionList?.submissions;
    if (submissions === null || submissions === undefined) {
      throw new Error(
        "Leetcode did not return submissions; verify your session credentials",
      );
    }

    const latestAccepted = submissions
      .filter((submission) => submission.statusDisplay === "Accepted")
      .sort(
        (first, second) => Number(second.timestamp) - Number(first.timestamp),
      )[0];

    if (latestAccepted) {
      return latestAccepted;
    }

    if (!submissionList?.hasNext || !submissionList.lastKey) {
      break;
    }

    offset += submissions.length;
    lastKey = submissionList.lastKey;
  }
  throw new Error(
    `No accepted submission found for question ${question.questionId}`,
  );
}

export async function fetchSubmissionDetails(
  submissionId: string,
  credentials: LeetcodeCredentials,
): Promise<SubmissionDetails> {
  const numericSubmissionId = Number(submissionId);

  if (!Number.isSafeInteger(numericSubmissionId)) {
    throw new Error(`Invalid submission ID: ${submissionId}`);
  }

  const payload = await fetchLeetcodeWithCredentials<SubmissionDetailsResponse>(
    credentials,
    `https://leetcode.com/submissions/detail/${submissionId}/`,
    SUBMISSION_DETAILS_QUERY,
    { submissionId: numericSubmissionId },
  );

  const details = payload.data?.submissionDetails;
  if (!details?.code) {
    throw new Error(
      `Leetcode did not return source code for submission ${submissionId}`,
    );
  }

  return {
    code: details.code,
    timestamp: details.timestamp,
    runtimeDisplay: details.runtimeDisplay,
    memoryDisplay: details.memoryDisplay,
    totalCorrect: details.totalCorrect,
    totalTestcases: details.totalTestcases,
    language: details.lang,
  };
}
