import { API_BASE } from './config'
import { isUUID } from './tenders'
import type {
    FailedEvaluationsResponse,
    TenderEvaluationStep,
    StepRawItem,
    StepListResponse,
    TenderEvaluationResult,
    EvaluationResultStep1Response,
    EvaluationResultStep2Response,
} from './types'

export const getFullyPassedTendersUrl = (page = 1, search = "") => {
    const params = new URLSearchParams({ page: String(page) })
    if (search.trim()) params.set('search', search.trim())
    return `${API_BASE}/evaluations/fully_passed/?${params}`
}

export const getTenderWinsUrl = (page = 1, search = "") => {
    const params = new URLSearchParams({
        final_decision: 'bid',
        page: String(page),
    })
    if (search.trim()) params.set('search', search.trim())
    return `${API_BASE}/evaluation-results/?${params}`
}

export const getFailedEvaluationsUrl = (page = 1, search = "") => {
    const params = new URLSearchParams({ page: String(page) })
    if (search.trim()) params.set('search', search.trim())
    return `${API_BASE}/evaluations/failed/?${params}`
}

export async function fetchEvaluationSteps(tenderId: string) {
    // The API accepts ?tender= (UUID) or ?source_tender_id= (string reference)
    const param = isUUID(tenderId) ? `tender=${tenderId}` : `source_tender_id=${encodeURIComponent(tenderId)}`
    const res = await fetch(`${API_BASE}/evaluations/?${param}`, {
        cache: 'no-store',
    })
    if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`)
    const data = await res.json()

    // If the API already returns keyed format {step_1, step_2, …} return as-is
    if (data.step_1 || data.step_2 || data.step_3 || data.step_4) return data

    // Otherwise it's a paginated list: { count, results: [{step_number:1,…}, …] }
    // Normalise into {step_1, step_2, step_3, step_4}
    const results: Array<Record<string, unknown>> =
        Array.isArray(data.results) ? data.results : Array.isArray(data) ? data : []
    const keyed: Record<string, unknown> = {}
    for (const step of results) {
        if (step.step_number) keyed[`step_${step.step_number}`] = step
    }
    return keyed
}

// Fetch evaluation-results list filtered by tender (paginated)
export async function fetchEvaluationResultByTender(tenderId: string) {
    const param = isUUID(tenderId) ? `tender=${tenderId}` : `source_tender_id=${encodeURIComponent(tenderId)}`
    const res = await fetch(`${API_BASE}/evaluation-results/?${param}`, {
        cache: 'no-store',
    })
    if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`)
    return res.json()
}

export async function triggerEvaluation(tenderId: string) {
    // Send tender_id for UUIDs, source_tender_id for human-readable string references
    const body = isUUID(tenderId)
        ? { tender_id: tenderId }
        : { source_tender_id: tenderId }

    const res = await fetch(`${API_BASE}/evaluations/trigger/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })

    if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || `Failed to trigger eval: ${res.status}`)
    }
    return res.json()
}

export async function triggerEvaluationResult(tenderId: string) {
    const body = isUUID(tenderId)
        ? { tender_id: tenderId }
        : { source_tender_id: tenderId }

    const res = await fetch(`${API_BASE}/evaluation-results/trigger/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })

    if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || `Failed to trigger result eval: ${res.status}`)
    }
    return res.json()
}

// ── B3/B4. GET /evaluations/failed/ with optional filters ──
export async function fetchFailedEvaluationsFiltered(params?: {
    tender?: string
    source_tender_id?: string
    step_number?: 1 | 2 | 3 | 4
}): Promise<FailedEvaluationsResponse> {
    const qs = new URLSearchParams()
    if (params?.tender) qs.append('tender', params.tender)
    if (params?.source_tender_id) qs.append('source_tender_id', params.source_tender_id)
    if (params?.step_number) qs.append('step_number', String(params.step_number))
    const url = `${API_BASE}/evaluations/failed/${qs.toString() ? `?${qs}` : ''}`
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`)
    return res.json()
}

// ── B5–B8. Step-specific endpoints ──
async function fetchStepEndpoint<T>(
    stepPath: string,
    params?: { tender?: string; raw?: boolean }
): Promise<StepListResponse<T>> {
    const qs = new URLSearchParams()
    if (params?.tender) qs.append('tender', params.tender)
    if (params?.raw) qs.append('raw', 'true')
    const url = `${API_BASE}/evaluations/${stepPath}/${qs.toString() ? `?${qs}` : ''}`
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`)
    return res.json()
}

export function fetchStep1ProductMatch(params?: { tender?: string; raw?: boolean }) {
    return fetchStepEndpoint<TenderEvaluationStep | StepRawItem>('step1_product_match', params)
}

export function fetchStep2PricingAnalysis(params?: { tender?: string; raw?: boolean }) {
    return fetchStepEndpoint<TenderEvaluationStep | StepRawItem>('step2_pricing_analysis', params)
}

export function fetchStep3CompetitorCheck(params?: { tender?: string; raw?: boolean }) {
    return fetchStepEndpoint<TenderEvaluationStep | StepRawItem>('step3_competitor_check', params)
}

export function fetchStep4LegalReview(params?: { tender?: string; raw?: boolean }) {
    return fetchStepEndpoint<TenderEvaluationStep | StepRawItem>('step4_legal_review', params)
}

// ── B9. GET /evaluation-results/{uuid}/ ──
export async function fetchEvaluationResultById(
    resultId: string
): Promise<TenderEvaluationResult> {
    const res = await fetch(`${API_BASE}/evaluation-results/${resultId}/`, {
        cache: 'no-store',
    })
    if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`)
    return res.json()
}

// ── B10. GET /evaluation-results/{uuid}/step1_response/ ──
export async function fetchEvaluationResultStep1(
    resultId: string
): Promise<EvaluationResultStep1Response> {
    const res = await fetch(
        `${API_BASE}/evaluation-results/${resultId}/step1_response/`,
        { cache: 'no-store' }
    )
    if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`)
    return res.json()
}

// ── B11. GET /evaluation-results/{uuid}/step2_response/ ──
export async function fetchEvaluationResultStep2(
    resultId: string
): Promise<EvaluationResultStep2Response> {
    const res = await fetch(
        `${API_BASE}/evaluation-results/${resultId}/step2_response/`,
        { cache: 'no-store' }
    )
    if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`)
    return res.json()
}
