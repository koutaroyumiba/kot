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
    description: "all about me #real",
    keywords: [],
    primary: true,
  },
  {
    title: "projects",
    href: "/projects",
    description: "some inspirational works... (or a lack thereof)",
    keywords: [],
    primary: true,
  },
  {
    title: "leetcode",
    href: "/leetcode",
    description: "the grind never stops",
    keywords: [],
    primary: true,
  },
  {
    title: "contents",
    href: "/contents",
    description: "directory of pages and external links",
    keywords: ["directory", "navigation", "sitemap"],
    primary: true,
  },
  // Eventually will become a proper findable page
  // {
  //   title: "thoughts",
  //   href: "/thoughts",
  //   description: "shower thoughts",
  //   keywords: [],
  //   primary: false,
  // },
  {
    title: "travel",
    href: "/travel",
    description: "trips, itineraries, and memories of the world",
    keywords: [],
    primary: false,
  },
  {
    title: "reading",
    href: "/reading",
    description: "wisdom from external sources",
    keywords: [],
    primary: false,
  },
  {
    title: "friends",
    href: "/friends",
    description: "who doesn't want to brag about their friends?!",
    keywords: [],
    primary: false,
  },
  {
    title: "checklist",
    href: "/checklist",
    description: "while we wait for those future updates...",
    keywords: [],
    primary: false,
  },
  {
    title: "changelog",
    href: "/changelog",
    description: "never miss a change on this website!!",
    keywords: [],
    primary: false,
  },
  {
    title: "github",
    href: "https://github.com/koutaroyumiba",
    description: "where all the magic happens",
    keywords: [],
    primary: false,
  },
  {
    title: "linkedin",
    href: "https://www.linkedin.com/in/koutaroyumiba",
    description: "lets connect!!",
    keywords: [],
    primary: false,
  },
] satisfies NavigationDestination[];
