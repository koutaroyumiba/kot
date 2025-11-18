import { type LeetcodeEntry } from "../types/types"

export function getLeetcodeEntries(): LeetcodeEntry[] {
    const modules = import.meta.glob("../../public/leetcode/*/*.md", { eager: true })

    return Object.entries(modules).map(([path, mod]) => {
        const parts = path.split("/");
        const tmp = parts[parts.length - 1];
        const filename = tmp.substring(0, tmp.length - 3)

        return {
            ...(mod as any),
            filename,
        };
    }) as LeetcodeEntry[];
}
