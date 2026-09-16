# local only helper - direct interpolation assumes question_id is trusted numeric input
leetcode question_id="":
  node scripts/leetcode/leetcode-question.ts {{question_id}}

submit question_id="":
  node --env-file=".env" scripts/leetcode/leetcode-submission.ts {{question_id}}
