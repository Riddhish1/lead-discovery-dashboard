import { API_BASE } from './config'

export const getFullyPassedTendersUrl = () => `${API_BASE}/evaluations/fully_passed/`

export const getTenderWinsUrl = (page = 1) => {
    const params = new URLSearchParams({
        status: 'completed',
        decision: 'recommended',
        page: String(page),
    })
    return `${API_BASE}/evaluation-results/?${params}`
}

export const getFailedEvaluationsUrl = (page = 1) => {
    const params = new URLSearchParams({ page: String(page) })
    return `${API_BASE}/evaluations/failed/?${params}`
}

export async function fetchEvaluationSteps(tenderId: string) {
    const res = await fetch(`${API_BASE}/evaluations/?tender=${tenderId}`, {
        cache: 'no-store',
    })
    if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`)
    return res.json()
}

export async function fetchEvaluationResult(tenderId: string) {
    const res = await fetch(`${API_BASE}/evaluation-results/?tender=${tenderId}`, {
        cache: 'no-store',
    })
    if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`)
    return res.json()
}
