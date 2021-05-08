export interface Post {
    title: string,
    description: string,
    content: PostType,
    notSafeForWork: boolean,
    spoiler: boolean,
    originalContent: boolean,
    flairs: string[],
    imageUrl: string
}

export enum PostType {
	TEXT, VIDEO_IMAGE, LINK, POLL
}
 