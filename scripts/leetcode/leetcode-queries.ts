export const DAILY_QUESTION_QUERY = `
query questionOfToday {
  activeDailyCodingChallengeQuestion {
    date
    link
    question {
      questionFrontendId
      title
      titleSlug
      difficulty
      topicTags {
        name
      }
    }
  }
}`;

export const QUESTION_LIST_QUERY = `
query problemsetQuestionList(
  $categorySlug: String
  $limit: Int
  $skip: Int
  $filters: QuestionListFilterInput
) {
  problemsetQuestionList: questionList(
    categorySlug: $categorySlug
    limit: $limit
    skip: $skip
    filters: $filters
  ) {
    questions: data {
      questionFrontendId
      title
      titleSlug
      difficulty
      topicTags {
        name
      }
    }
  }
}
`;

export const SUBMISSION_LIST_QUERY = `
query submissionList(
  $offset: Int!
  $limit: Int!
  $lastKey: String
  $questionSlug: String!
) {
  questionSubmissionList(
    offset: $offset
    limit: $limit
    lastKey: $lastKey
    questionSlug: $questionSlug
  ) {
    lastKey
    hasNext
    submissions {
      id
      statusDisplay
      lang
      timestamp
    }
  }
}
`;

export const SUBMISSION_DETAILS_QUERY = `
query submissionDetails($submissionId: Int!) {
  submissionDetails(submissionId: $submissionId) {
    code
    timestamp
    runtimeDisplay
    memoryDisplay
    totalCorrect
    totalTestcases
    lang {
      name
      verboseName
    }
  }
}
`;
