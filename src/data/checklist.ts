export type ChecklistStatus = "pending" | "completed";

export interface ChecklistItem {
  title: string;
  status: ChecklistStatus;
  note?: string;
  href?: string;
  completedAt?: string;
}

export const checklistItems = [
  {
    title: "add search and sorting to leetcode/projects/reading",
    status: "pending",
    note: "what happened to finding the book I was reading??",
  },
  {
    title:
      "expand :jump to search headings and entries and to execute commands",
    status: "pending",
    note: "what happened to navigating at blazingly fast speed",
  },
  {
    title: "finish the write-ups for all projects",
    status: "pending",
    href: "/projects",
    note: "what happened to showcasing all my grand projects to the wider community??",
  },
  {
    title: "set up an RSS feed for changelog",
    status: "pending",
    note: "what happened to knowing what even is an RSS feed??",
  },
  {
    title: "verify the mobile layout",
    status: "completed",
    completedAt: "2026-09-15",
    note: "what happened to mobile first development??",
  },
  {
    title: "implement light and dark mode",
    status: "completed",
    completedAt: "2025-05-23",
    note: "what happened to accessibility (i dont want to be blinded)??",
  },
  {
    title: "publish the first travel log",
    status: "pending",
    note: "what happened to being a curious tourist??",
  },
  {
    title: "publish the first blog",
    status: "pending",
    note: "what happened to sharing knowledge to fans??",
  },
  {
    title: "start a new books page",
    status: "completed",
    completedAt: "2025-07-09",
    note: "what happened to reading in this economy??",
  },
] as const satisfies readonly ChecklistItem[];
