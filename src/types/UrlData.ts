type UrlData = {
    url: string
    check_type: string
    content_type: string | undefined
    last_status: number
    last_md5?: string | undefined
}

export { UrlData }