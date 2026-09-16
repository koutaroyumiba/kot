import assert from "assert";
import { readFile, writeFile } from "node:fs/promises";
import {
  fetchDailyQuestion,
  fetchQuestionById,
  fetchLatestAcceptedSubmission,
  fetchSubmissionDetails,
} from "./leetcode-api.ts";
import type {
  LeetcodeCredentials,
  QuestionMetadata,
  SubmissionDetails,
} from "./leetcode-types.ts";

function loadCredentials(): LeetcodeCredentials {
  const session = process.env.LEETCODE_SESSION?.trim();
  const csrfToken = process.env.LEETCODE_CSRF_TOKEN?.trim();

  const missing: string[] = [];

  if (!session) {
    missing.push("LEETCODE_SESSION");
  }
  if (!csrfToken) {
    missing.push("LEETCODE_CSRF_TOKEN");
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }

  assert(session !== undefined);
  assert(csrfToken !== undefined);

  return { session, csrfToken };
}

function markdownLanguage(language: string): string {
  const languages: Record<string, string> = {
    c: "c",
    cpp: "cpp",
    csharp: "csharp",
    java: "java",
    python: "python",
    python3: "python3",
    javascript: "javascript",
    typescript: "typescript",
    golang: "go",
    rust: "rust",
    kotlin: "kotlin",
    swift: "swift",
    ruby: "ruby",
    php: "php",
  };

  return languages[language] ?? "text";
}

async function updateQuestionDraft(
  question: QuestionMetadata,
  details: SubmissionDetails,
): Promise<void> {
  const directory = new URL("../../src/content/leetcode/", import.meta.url);
  const target = new URL(`${question.questionId}.md`, directory);
  const source = await readFile(target, "utf8");

  const frontmatterMatch = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatterMatch) {
    throw new Error(`Missing frontmatter in ${question.questionId}.md`);
  }

  const frontmatter = frontmatterMatch[1];
  if (!/^draft: true$/m.test(frontmatter)) {
    throw new Error(
      `${question.questionId}.md is not a draft; refusing to overwrite it`,
    );
  }

  const emptyCodeFences = source.match(/^```[ \t]*\r?\n```[ \t]*$/gm) ?? [];
  if (emptyCodeFences.length !== 1) {
    throw new Error(
      `${question.questionId}.md must contain exactly one empty code fence`,
    );
  }

  const acceptedAt = new Date(details.timestamp * 1000);
  if (Number.isNaN(acceptedAt.valueOf())) {
    throw new Error(`Invalid submission timestamp: ${details.timestamp}`);
  }

  const solvedAt = acceptedAt.toISOString().slice(0, 10);
  const updatedFrontmatter = frontmatter.replace(
    /^solvedAt:.*$/m,
    `solvedAt: ${JSON.stringify(solvedAt)}`,
  );

  const fence = details.code.includes("```") ? "````" : "```";
  const codeBlock = [
    `${fence}${markdownLanguage(details.language.name)}`,
    details.code.trimEnd(),
    fence,
  ].join("\n");

  const statistics = [
    `> Runtime: \`${details.runtimeDisplay}\``,
    ">",
    `> Memory: \`${details.memoryDisplay}\``,
    ">",
    `> Tests Passed: \`${details.totalCorrect}/${details.totalTestcases}\``,
  ].join("\n");

  let updated = source.replace(
    frontmatterMatch[0],
    `---\n${updatedFrontmatter}\n---`,
  );

  updated = updated.replace(/^```[ \t]*\r?\n```[ \t]*$/m, codeBlock);
  updated = `${updated.trimEnd()}\n\n${statistics}\n`;

  await writeFile(target, updated, "utf8");
  console.log(`Updated ${target.pathname}`);
}

async function main(): Promise<void> {
  const credentials = loadCredentials();

  const args = process.argv;
  if (args.length > 3) {
    throw new Error(` usage: ${args[0]} ${args[1]} <questionId: int>`);
  }

  const questionId = args[2];
  if (questionId !== undefined && !/^[1-9]\d*$/.test(questionId)) {
    throw new Error(`Invalid question ID: ${questionId}`);
  }

  let question: QuestionMetadata;
  if (questionId === undefined) {
    console.log("Question source: daily challenge");
    question = await fetchDailyQuestion();
  } else {
    console.log(`Question source: question ${questionId}`);
    question = await fetchQuestionById(questionId);
  }

  const submission = await fetchLatestAcceptedSubmission(question, credentials);
  const details = await fetchSubmissionDetails(submission.id, credentials);

  await updateQuestionDraft(question, details);
  console.log(
    JSON.stringify(
      {
        questionId: question.questionId,
        title: question.title,
        submissionId: submission.id,
        language: details.language.name,
        codeLength: details.code.length,
        runtime: details.runtimeDisplay,
        memory: details.memoryDisplay,
        testsPassed: `${details.totalCorrect}/${details.totalTestcases}`,
      },
      null,
      2,
    ),
  );
}

main();
