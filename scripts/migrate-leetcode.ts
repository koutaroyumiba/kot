/**
 * One-time migration script to migrate leetcode entries to the new format.
 *
 * Retained for reference and not part of the normal dev workflow
 */

import { access, readdir, readFile, writeFile } from "node:fs/promises";

type LeetcodeType = "daily" | "neetcode-150";
type MigrationAction = "create" | "skip";

interface MigrationPlanEntry {
  source: string;
  target: string;
  type: LeetcodeType;
  action: MigrationAction;
  content: string;
}

interface ParsedMarkdown {
  fields: Record<string, string>;
  body: string;
}

const sourceRoot = new URL("../public/leetcode/", import.meta.url);
const targetRoot = new URL("../src/content/leetcode/", import.meta.url);
const writeMode = process.argv.includes("--write");

try {
  await access(sourceRoot);
} catch {
  throw new Error(
    "Legacy leetcode entries are unavailable. Restore public/leetcode from commit 25fa434 before running the migration",
  );
}

const typeByMonth: Record<string, LeetcodeType> = {
  "2025-03": "daily",
  "2025-04": "daily",
  "2025-05": "daily",
  "2025-11": "neetcode-150",
  "2025-12": "neetcode-150",
};

const targetFiles: Set<string> = new Set(await readdir(targetRoot));
const questionIds: Set<string> = new Set();
const migrationPlan: MigrationPlanEntry[] = [];

function parseFrontmatter(source: string, sourcePath: string): ParsedMarkdown {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    throw new Error(`Missing frontmatter: ${sourcePath}`);
  }

  const fields: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) {
      continue;
    }
    const separator = line.indexOf(":");
    if (separator === -1) {
      throw new Error(`Invalid frontmatter line in ${sourcePath}: ${line}`);
    }

    const name = line.slice(0, separator).trim();
    const value = line
      .slice(separator + 1)
      .trim()
      .replace(/^"(.*)"$/, "$1");

    fields[name] = value;
  }

  const body = source.slice(match[0].length).replace(/^(?:\r?\n)+/, "");
  return { fields, body };
}

function createCollectionContent(
  fields: Record<string, string>,
  solvedAt: string,
  type: LeetcodeType,
  body: string,
): string {
  return [
    "---",
    `title: ${JSON.stringify(fields.title)}`,
    `questionId: ${JSON.stringify(fields.question_id)}`,
    `questionUrl: ${JSON.stringify(fields.question_link)}`,
    `difficulty: ${JSON.stringify(fields.difficulty)}`,
    `type: ${JSON.stringify(type)}`,
    "topics: []",
    `solvedAt: ${JSON.stringify(solvedAt)}`,
    "draft: false",
    "---",
    "",
    body,
  ].join("\n");
}

for (const [month, type] of Object.entries(typeByMonth)) {
  const directory = new URL(`${month}/`, sourceRoot);
  const filenames = (await readdir(directory))
    .filter((filename: string) => filename.endsWith(".md"))
    .sort();

  for (const filename of filenames) {
    const sourcePath = `${month}/${filename}`;
    const source = await readFile(new URL(filename, directory), "utf8");
    const { fields, body } = parseFrontmatter(source, sourcePath);

    const requiredFields = [
      "title",
      "question_id",
      "question_link",
      "difficulty",
    ];

    for (const field of requiredFields) {
      if (!fields[field]) {
        throw new Error(`Missing ${field}: ${sourcePath}`);
      }
    }
    if (!/^\d+$/.test(fields.question_id)) {
      throw new Error(`Invalid question ID: ${sourcePath}`);
    }
    if (questionIds.has(fields.question_id)) {
      throw new Error(`Duplicate question ID: ${fields.question_id}`);
    }
    if (!["Easy", "Medium", "Hard"].includes(fields.difficulty)) {
      throw new Error(`Invalid difficulty: ${sourcePath}`);
    }

    const solvedAt = filename.replace(/\.md$/, "");
    const parsedDate = new Date(`${solvedAt}T00:00:00Z`);
    if (
      Number.isNaN(parsedDate.valueOf()) ||
      !parsedDate.toISOString().startsWith(solvedAt)
    ) {
      throw new Error(`Invalid solved date: ${sourcePath}`);
    }

    questionIds.add(fields.question_id);

    const targetFilename = `${fields.question_id}.md`;
    migrationPlan.push({
      source: sourcePath,
      target: targetFilename,
      type,
      action: targetFiles.has(targetFilename) ? "skip" : "create",
      content: createCollectionContent(fields, solvedAt, type, body),
    });
  }
}

const filesToCreate = migrationPlan.filter(
  (entry) => entry.action === "create",
);
const dailyCount = migrationPlan.filter(
  (entry) => entry.type === "daily",
).length;
const neetcodeCount = migrationPlan.filter(
  (entry) => entry.type === "neetcode-150",
).length;

console.table(migrationPlan.map(({ content, ...entry }) => entry));
console.log(`Validated: ${migrationPlan.length}`);
console.log(`Daily: ${dailyCount}`);
console.log(`Neetcode 150: ${neetcodeCount}`);
console.log(`Already migrated: ${migrationPlan.length - filesToCreate.length}`);
console.log(`Files to create: ${filesToCreate.length}`);

if (!writeMode) {
  console.log("[dry run] Use --write to create the files");
} else {
  for (const entry of filesToCreate) {
    await writeFile(new URL(entry.target, targetRoot), entry.content, {
      flag: "wx",
    });
  }

  console.log(`Created ${filesToCreate.length} files.`);
}
