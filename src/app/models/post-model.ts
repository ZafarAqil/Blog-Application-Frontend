export interface Post {
    title: string,
    description: string,
    content: string,
    notSafeForWork: boolean,
    Spoiler: boolean,
    originalContent: boolean,
    flairs: string[]
}