export interface NavigationDestination {
  title: string;
  href: string;
  description: string;
  keywords: string[];
  shortcut?: string;
  primary: boolean;
}

export const navigationDestinations = [
  {
    title: "home",
    href: "/",
    description: "About me",
    keywords: ["about", "profile", "homepage"],
    primary: true,
  },
  {
    title: "projects",
    href: "/projects",
    description: "Projects and technical work",
    keywords: ["work", "portfolio", "software"],
    primary: true,
  },
  {
    title: "thoughts",
    href: "/thoughts",
    description: "Writing and unfinished ideas",
    keywords: ["writing", "articles", "ideas"],
    primary: true,
  },
  {
    title: "books",
    href: "/books",
    description: "Books read and waiting to be read",
    keywords: ["reading", "library", "favourites"],
    primary: true,
  },
  {
    title: "leetcode",
    href: "/leetcode",
    description: "Leetcode solutions",
    keywords: ["algorithms", "data structures", "solutions"],
    primary: false,
  },
  {
    title: "friends",
    href: "/friends",
    description: "Friends and communities",
    keywords: ["people", "community"],
    primary: false,
  },
  {
    title: "checklist",
    href: "/checklist",
    description: "Plans and future website improvements",
    keywords: ["tasks", "todo", "roadmap"],
    primary: false,
  },
  {
    title: "changelog",
    href: "/changelog",
    description: "Website release history",
    keywords: ["changes", "versions", "releases"],
    primary: false,
  },
  {
    title: "contents",
    href: "/contents",
    description: "Directory of pages and external links",
    keywords: ["directory", "navigation", "sitemap"],
    primary: false,
  },
  {
    title: "github",
    href: "https://github.com/koutaroyumiba",
    description: "Projects and source code on GitHub",
    keywords: ["code", "repositories", "profile"],
    primary: false,
  },
  {
    title: "linkedin",
    href: "https://www.linkedin.com/in/koutaroyumiba",
    description: "Connect with me on LinkedIn",
    keywords: ["contact", "professional", "profile"],
    primary: false,
  },
] satisfies NavigationDestination[];
