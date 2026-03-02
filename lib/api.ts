

const API_BASE = '/api/backend'


export interface EvaluationStepSummary {
    step_name: string
    step_type: string
    decision: string
    decision_reason: string
    status: string
    step_response: Record<string, unknown>
    completed_at: string | null
}

/** A tender that has passed all 4 evaluation steps (Tender Discovery tab) */
export interface FullyPassedTender {
    tender_id: string
    source_tender_id: string
    tender_reference_number: string
    title: string
    organisation: string
    location: string
    state: string[]
    city: string[]
    tender_value: string | null
    emd_fee: string | null
    currency: string
    tender_category: string
    status: string
    publish_date: string | null
    bid_submission_end: string | null
    bid_opening_date: string | null
    portal_name: string
    all_steps_passed: true
    evaluation_steps: {
        step_1?: EvaluationStepSummary
        step_2?: EvaluationStepSummary
        step_3?: EvaluationStepSummary
        step_4?: EvaluationStepSummary
    }
}

/** A tender where a step failed (Failed Evaluations API) */
export interface FailedEvaluationStep {
    tender_id: string | null
    source_tender_id: string
    tender_reference_number: string
    tender_title: string
    tender_organisation: string
    failed_step_number: number
    failed_step_name: string
    failed_step_type: string
    decision: string
    decision_reason: string
    status: string
    error_message: string
    step_response: Record<string, unknown>
    updated_at: string | null
}

/** Evaluation result (2-step) — for Tender Wins tab */
export interface EvaluationResult {
    id: string
    tender: string
    source_tender_id: string
    tender_reference_number: string
    tender_title: string
    status: string
    final_decision: string
    final_decision_reason: string
    step1_recommendation: string
    step1_confidence_level: string
    step1_tender_overview: Record<string, unknown>
    step1_products_analysis: Record<string, unknown>
    step1_organisation_analysis: Record<string, unknown>
    step1_opportunities: unknown[]
    step1_risks: unknown[]
    step2_competitive_analysis: Record<string, unknown>
    step2_commercial_analysis: Record<string, unknown>
    step2_risk_assessment: Record<string, unknown>
    step2_strategic_recommendation: Record<string, unknown>
    step2_executive_summary: string
    documents_count: number
    started_at: string | null
    completed_at: string | null
    created_at: string
    updated_at: string
}

export interface PaginatedResponse<T> {
    count: number
    next: string | null
    previous: string | null
    results: T[]
    message?: string
}

export async function fetchFullyPassedTenders(): Promise<{
    count: number
    message: string
    results: FullyPassedTender[]
}> {
    const res = await fetch(`${API_BASE}/evaluations/fully_passed/`, {
        cache: 'no-store',
    })
    if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`)
    return res.json()
}
export async function fetchTenderWins(page = 1): Promise<PaginatedResponse<EvaluationResult>> {
    const params = new URLSearchParams({
        status: 'completed',
        decision: 'recommended',
        page: String(page),
    })
    const res = await fetch(`${API_BASE}/evaluation-results/?${params}`, {
        cache: 'no-store',
    })
    if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`)
    return res.json()
}

export async function fetchFailedEvaluations(params?: {
    tender?: string
    source_tender_id?: string
    step_number?: number
}): Promise<{ count: number; message: string; results: FailedEvaluationStep[] }> {
    const searchParams = new URLSearchParams()
    if (params?.tender) searchParams.set('tender', params.tender)
    if (params?.source_tender_id) searchParams.set('source_tender_id', params.source_tender_id)
    if (params?.step_number) searchParams.set('step_number', String(params.step_number))

    const url = `${API_BASE}/evaluations/failed/${searchParams.toString() ? '?' + searchParams : ''}`
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`)
    return res.json()
}

export async function fetchTenders(params?: {
    status?: string
    search?: string
    page?: number
    page_size?: number
}) {
    const searchParams = new URLSearchParams()
    if (params?.status) searchParams.set('status', params.status)
    if (params?.search) searchParams.set('search', params.search)
    if (params?.page) searchParams.set('page', String(params.page))
    if (params?.page_size) searchParams.set('page_size', String(params.page_size))

    const url = `${API_BASE}/tenders/${searchParams.toString() ? '?' + searchParams : ''}`
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`)
    return res.json()
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
