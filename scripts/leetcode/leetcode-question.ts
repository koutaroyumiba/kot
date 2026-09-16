import { execFile } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { promisify } from "node:util";

import { fetchDailyQuestion, fetchQuestionById } from "./leetcode-api.ts";
import type { QuestionMetadata } from "./leetcode-types.ts";

type LeetcodeType = "daily" | "random";

const execFileAsync = promisify(execFile);

async function openInDefaultBrowser(url: string): Promise<void> {
  if (process.platform === "win32") {
    await execFileAsync("cmd", ["/c", "start", "", url]);
    return;
  }

  const command = process.platform === "darwin" ? "open" : "xdg-open";
  await execFileAsync(command, [url]);
}

async function createQuestionDraft(
  question: QuestionMetadata,
  type: LeetcodeType,
): Promise<void> {
  const solvedAt =
    question.challengeDate ?? new Date().toISOString().slice(0, 10);

  const content = [
    "---",
    `title: ${JSON.stringify(question.title)}`,
    `questionId: ${JSON.stringify(question.questionId)}`,
    `questionUrl: ${JSON.stringify(question.questionUrl)}`,
    `difficulty: ${JSON.stringify(question.difficulty)}`,
    `type: ${JSON.stringify(type)}`,
    `topics: ${JSON.stringify(question.topics)}`,
    `solvedAt: ${JSON.stringify(solvedAt)}`,
    "draft: true",
    "---",
    "",
    "```",
    "```",
    "",
    "> Time Complexity: `O()`",
    ">",
    "> Space Complexity: `O()`",
    ">",
    "> Time Taken: ``",
  ].join("\n");

  const directory = new URL("../../src/content/leetcode/", import.meta.url);
  const target = new URL(`${question.questionId}.md`, directory);

  try {
    await writeFile(target, content, { flag: "wx" });
    console.log(`Created ${target.pathname}`);
  } catch (err) {
    console.log(`[error] ${err}`);
  }
}

async function main(): Promise<void> {
  const args = process.argv;
  if (args.length > 3) {
    throw new Error(` usage: ${args[0]} ${args[1]} <questionId: int>`);
  }

  const questionId = args[2];
  if (questionId !== undefined && !/^[1-9]\d*$/.test(questionId)) {
    throw new Error(`Invalid question ID: ${questionId}`);
  }

  let question: QuestionMetadata;
  let type: LeetcodeType;
  if (questionId === undefined) {
    console.log("Question source: daily challenge");
    question = await fetchDailyQuestion();
    type = "daily";
  } else {
    console.log(`Question source: question ${questionId}`);
    question = await fetchQuestionById(questionId);
    type = "random";
  }

  console.log(JSON.stringify(question, null, 2));
  await createQuestionDraft(question, type);
  await openInDefaultBrowser(question.questionUrl);
}

main();
