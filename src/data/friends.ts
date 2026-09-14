export interface Friend {
  name: string;
  href: string;
}

export const friends = [
  { name: 'Aaron "david" Worsnop', href: "https://aaronworsnop.com" },
  { name: 'Abbey "trust" Martinez', href: "https://abbeymartinez.com" },
  { name: 'Alanna "saptoso" Santoso', href: "https://alanna.nz" },
  { name: 'Aleck "performative" Shen', href: "https://aleckshen.com" },
  { name: 'Andrew "tea" Qiu', href: "https://andrewqiu.com" },
  { name: 'Anton "atlassian" Garay', href: "https://antga.dev" },
  { name: 'Ashlee "dim" Shum', href: "https://ashleeshum.com" },
  { name: 'Bethany "google" Yates', href: "https://bethany.nz" },
  { name: 'Eric "disaster" Zheng', href: "https://ericzheng.nz" },
  { name: 'Jos "chad" Badenas', href: "https://josbadenas.com" },
  { name: 'Kay "tired" Tang', href: "https://kaytang.com" },
  { name: 'Owen "olimetry" Li', href: "https://voxelfs.com" },
  { name: 'Tyler "tyou" Young', href: "https://tyou.dev" },
  {
    name: 'Yoyo "banned" Chen',
    href: "https://www.youtube.com/watch?v=xvFZjo5PgG0",
  },
] as const satisfies readonly Friend[];
