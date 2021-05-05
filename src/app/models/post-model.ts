export interface Post {
    title: string,
    description: string,
    content: string,
    notSafeForWork: boolean,
    spoiler: boolean,
    originalContent: boolean,
    flairs: string[]
}