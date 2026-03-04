import { API_BASE } from './config'
import type { SystemHealth, ScraperConfig, PaginatedResponse, ScraperJob, ScraperJobSummary } from './types'

export async function fetchSystemHealth(): Promise<SystemHealth> {
    const res = await fetch(`${API_BASE}/health/`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch system health')
    return res.json()
}

export async function fetchConfigurations(): Promise<ScraperConfig[]> {
    const res = await fetch(`${API_BASE}/configurations/`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch configurations')
    const data = await res.json()
    return Array.isArray(data) ? data : (data.results || [])
}

export async function fetchJobs(page = 1, status?: string): Promise<PaginatedResponse<ScraperJob>> {
    const params = new URLSearchParams({ page: String(page) })
    if (status) params.append('status', status)

    const res = await fetch(`${API_BASE}/jobs/?${params}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch jobs')
    return res.json()
}

export async function fetchJobsSummary(days = 7): Promise<ScraperJobSummary> {
    const res = await fetch(`${API_BASE}/jobs/summary/?days=${days}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch jobs summary')
    return res.json()
}

export async function triggerScrape(): Promise<{ message: string, job_id: number }> {
    const res = await fetch(`${API_BASE}/trigger-scrape/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || errorData.detail || 'Failed to trigger scraper')
    }
    return res.json()
}
