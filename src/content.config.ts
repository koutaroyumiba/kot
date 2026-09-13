import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({
    base: "./src/content/projects",
    pattern: "**/*.md",
  }),

  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    publishedAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    status: z.enum(["active", "complete", "archived", "prototype"]),
    featured: z.boolean(),
    order: z.number().int().nonnegative().optional(),
    technologies: z.array(z.string().min(1)),
    repository: z.url().optional(),
    demo: z.url().optional(),
    draft: z.boolean(),
  }),
});

const writing = defineCollection({
  loader: glob({
    base: "./src/content/writing",
    pattern: "**/*.md",
  }),

  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    publishedAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    topic: z.string().min(1),
    tags: z.array(z.string().min(1)),
    draft: z.boolean(),
  }),
});

const leetcode = defineCollection({
  loader: glob({
    base: "./src/content/leetcode",
    pattern: "**/*.md",
  }),

  schema: z.object({
    title: z.string().min(1),
    questionId: z
      .string()
      .min(1)
      .regex(/^\d+$/, "Question ID must contain only digits"),
    questionUrl: z.url(),
    difficulty: z.enum(["Easy", "Medium", "Hard"]),
    type: z.enum(["daily", "neetcode-150", "random"]),
    topics: z.array(z.string().min(1)),
    solvedAt: z.coerce.date(),
    draft: z.boolean(),
  }),
});

export const collections = {
  projects,
  writing,
  leetcode,
};
