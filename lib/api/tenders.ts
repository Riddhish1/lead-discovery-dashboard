import { API_BASE } from './config'
import type { Tender, PaginatedResponse } from './types'

/** Returns true if the string is a valid UUID v4 */
export function isUUID(str: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str)
}

export const getTendersUrl = (page = 1, search = "") => {
  const params = new URLSearchParams({ status: 'active', page: String(page) })
  if (search.trim()) params.set('search', search.trim())
  return `${API_BASE}/tenders/?${params}`
}

export async function fetchTenderDetail(tenderId: string) {
  if (isUUID(tenderId)) {
    // Direct detail endpoint when we have the database UUID
    const res = await fetch(`${API_BASE}/tenders/${tenderId}/`, { cache: 'no-store' })
    if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`)
    return res.json()
  } else {
    // Fall back to list filter when we only have the source_tender_id string
    const res = await fetch(
      `${API_BASE}/tenders/?source_tender_id=${encodeURIComponent(tenderId)}`,
      { cache: 'no-store' }
    )
    if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`)
    const data = await res.json()
    return data.results?.[0] ?? null
  }
}

// B1. GET /tenders/?source_tender_id=X
export async function fetchTenderBySourceId(
  sourceTenderId: string,
  page = 1
): Promise<PaginatedResponse<Tender>> {
  const params = new URLSearchParams({
    source_tender_id: sourceTenderId,
    page: String(page),
  })
  const res = await fetch(`${API_BASE}/tenders/?${params}`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`)
  return res.json()
}

// B2. GET /tenders/upcoming/?days=N — returns a plain array, NOT paginated
export async function fetchUpcomingTenders(days = 7): Promise<Tender[]> {
  const res = await fetch(`${API_BASE}/tenders/upcoming/?days=${days}`, {
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`)
  return res.json()
}
