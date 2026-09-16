import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({
    base: "./src/content/projects",
    pattern: "**/*.md",
  }),

  schema: ({ image }) =>
    z.object({
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
      screenshots: z
        .array(z.object({ src: image(), alt: z.string().min(1) }))
        .default([]),
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

const travel = defineCollection({
  loader: glob({
    base: "./src/content/travel",
    pattern: "**/index.md",
  }),

  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      status: z.enum(["upcoming", "complete"]),
      countries: z.array(z.string().min(1)),
      cities: z.array(z.string().min(1)),
      cover: z
        .object({
          src: image(),
          alt: z.string().min(1),
        })
        .optional(),
      activities: z
        .array(
          z.object({
            name: z.string().min(1),
            location: z.string().min(1),
            category: z.enum(["cafe", "food", "activities", "other"]),
            rating: z.number().min(0).max(10),
            note: z.string().optional(),
            url: z.url().optional(),
          }),
        )
        .default([]),
      photos: z
        .array(
          z.object({
            src: image(),
            alt: z.string().min(1),
            caption: z.string().optional(),
          }),
        )
        .default([]),
      featured: z.boolean().default(false),
      draft: z.boolean(),
    }),
});

const itinerary = defineCollection({
  loader: glob({
    base: "./src/content/travel",
    pattern: "**/itinerary/*.md",
  }),

  schema: z.object({
    day: z.number().int().positive(),
    date: z.coerce.date().optional(),
    location: z.string().min(1),
    stops: z.array(z.string().min(1)).default([]),
  }),
});

export const collections = {
  projects,
  writing,
  leetcode,
  travel,
  itinerary,
};
