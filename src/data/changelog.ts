export interface ChangelogRelease {
  version: string;
  date?: string;
  title: string;
  summary: string;
  changes?: string[];
}

export const changelogReleases = [
  {
    version: "3.0.0",
    date: "2026-09-15",
    title: "complete site redesign",
    summary:
      "complete overhaul while keeping the site fast, static and unmistakably personal",
    changes: [
      "redesigned all pages",
      "added structured project, writing, reading, and Leetcode collections",
      "migrated Leetcode solutions to typed content and question ID routes",
      "added the keyboard accessible :jump command palette",
      "renamed the books section to reading with compatibility redirects",
      "rebuilt the dark and light themes using proper Rose Pine palette",
      "improved responsive layouts, keyboard navigation, metadata and error recovery",
      "drastically improved the maintainability of the site",
    ],
  },
  {
    version: "2.0.0",
    date: "2025-09-30",
    title: "complete theme rework",
    summary: "(colour scheme changed to rose pine)",
    changes: [],
  },
  {
    version: "1.1.0",
    date: "2025-07-09",
    title: "new books page",
    summary: "to keep track of all the books",
  },
  {
    version: "1.0.0",
    date: "2025-05-22",
    title: "official launch",
    summary: "version 1 release!",
  },
] satisfies ChangelogRelease[];
