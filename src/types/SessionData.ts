import type { UrlData } from './UrlData';

interface SessionData {
    route: string
    count: number
    urlData: UrlData[]
}

export { SessionData }