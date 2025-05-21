export interface LeetcodeFrontmatter {
    title: string,
    question_id: string,
    question_link: string,
    difficulty: string,
}

export interface LeetcodeEntry {
    frontmatter: LeetcodeFrontmatter,
    Content: string,
    filename: string,
}
