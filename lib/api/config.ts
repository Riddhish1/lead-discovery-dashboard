export const API_BASE = '/api/backend'

export const fetcher = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error(`API error ${res.status}: ${res.statusText}`)
    }
    return res.json()
}
