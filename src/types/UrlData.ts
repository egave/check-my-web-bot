import { ACTION } from '../config'

type UrlData = {
    url: string
    action: ACTION
    content_type: string | undefined
    last_status: number
    last_md5?: string | undefined
}

export { UrlData }