export interface Community {
    title: string,
    communityDescription: string,
    postRulesAllowed: string[],
    postRulesDisallowed: string[],
    banningPolicy: string[],
    flairs: string[],
    imageUrl: string
}