import type { UrlData } from './UrlData';

interface SessionData {
    route: string
    urlToAdd: string
    count: number
    urlData: UrlData[]
}

export { SessionData }