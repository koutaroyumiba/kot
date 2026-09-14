export interface ChangelogRelease {
  version: string;
  date?: string;
  title: string;
  summary: string;
  changes?: string[];
}

export const changelogReleases = [
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
