import { type LeetcodeEntry } from "../types/types"

export function getLeetcodeEntries(): LeetcodeEntry[] {
    const modules = import.meta.glob("../leetcode/*/*.md", { eager: true })

    return Object.entries(modules).map(([path, mod]) => {
        const parts = path.split("/");
        const filename = parts[parts.length - 1];

        return {
            ...(mod as any),
            filename,
        };
    }) as LeetcodeEntry[];
}
