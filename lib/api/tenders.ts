import { API_BASE, fetcher } from './config'

export const getTendersUrl = (page = 1) => {
  const params = new URLSearchParams({ status: 'active', page: String(page) })
  return `${API_BASE}/tenders/?${params}`
}
