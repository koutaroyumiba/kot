export interface BookHallOfFameSelection {
  slug: string;
  reason: string;
  notes: readonly string[];
}

export const bookHallOfFameSelections = [
  {
    slug: "the-giver",
    reason: "first book",
    notes: [
      "first ever book that got me into reading",
      "good introduction to the more utopia/dystopia novels",
      "makes you think deeply about the importance of colour and emotion",
    ],
  },
  {
    slug: "1984",
    reason: "personal favourite novel",
    notes: [
      "personal favourite book of all time",
      "newspeak (importance of language) and the concept of being a slave to freedom",
      "control by fear and power (in contrast to Brave New World)",
    ],
  },
  {
    slug: "the-alchemist",
    reason: "reflection of my general mindset",
    notes: [
      "everyone has their own Personal Legends and the world will conspire to help you",
      "makes you want to think about your own potential and urges you to strive for it",
    ],
  },
  {
    slug: "brave-new-world",
    reason: "another perspective of 'dystopia'",
    notes: [
      "the concept of utopia as a 'good place that does not exist'",
      "most probable dystopian society that could occur in the modern world",
      "the dialogue between John and Mustapha Mond might be one of the greatest dialogues",
    ],
  },
  {
    slug: "the-love-song-of-j-alfred-prufrock",
    reason: "personal favourite poem",
    notes: [
      "my favourite poem (definitely not biased for analyzing it the most)",
      "presents the modernistic view of society",
    ],
  },
  {
    slug: "notes-from-underground",
    reason: "the best argument against utopia",
    notes: [
      "a story of a spiteful man - challenges the fundamental need of an utopia",
      "give a man the ultimate utopia and they will ruin it just to see something unexpected happen",
    ],
  },
  {
    slug: "12-rules-for-life",
    reason: "personal favourite non-fiction",
    notes: [
      "the only non-fiction book on this list",
      "provides principles to which you can translate to action",
    ],
  },
] as const satisfies readonly BookHallOfFameSelection[];
