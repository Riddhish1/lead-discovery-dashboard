export interface EvaluationStepSummary {
    step_name: string
    step_type: string
    decision: string
    decision_reason: string
    status: string
    step_response: Record<string, unknown>
    completed_at: string | null
}

// ── Full Tender model ──
export interface Tender {
    id: string
    source_tender_id: string
    tender_id: string
    tender_reference_number: string
    title: string
    description: string
    organisation: string
    location: string
    state: string
    city: string
    portal_name: string
    tender_value: string | null
    emd_fee: string | null
    currency: string
    tender_category: string
    status: string
    publish_date: string | null
    bid_submission_end: string | null
    bid_opening_date: string | null
    is_details_fetched: boolean
    is_documents_downloaded: boolean
    needs_review: boolean
    days_until_deadline: number | null
    is_expired: boolean
    created_at: string
    updated_at: string
}

// ── TenderEvaluationStep (full model) ──
export interface TenderEvaluationStep {
    id: string
    tender: string | null
    source_tender_id: string
    tender_reference_number: string
    step_number: 1 | 2 | 3 | 4
    step_type: "product_match" | "pricing_analysis" | "competitor_check" | "legal_review"
    step_name: string
    is_decision_step: boolean
    decision: "yes" | "no" | null
    decision_reason: string
    status: "pending" | "running" | "completed" | "failed"
    step_response: Record<string, unknown> | null
    previous_steps_data: Record<string, unknown> | null
    prompt_used: string
    request_payload: Record<string, unknown> | null
    response_status: string
    error_message: string
    retry_count: number
    started_at: string | null
    completed_at: string | null
    created_at: string
    updated_at: string
}

// ── FailedEvaluationItem (custom shape from /evaluations/failed/) ──
export interface FailedEvaluationItem {
    tender_id: string | null
    source_tender_id: string
    tender_reference_number: string
    tender_title: string
    tender_organisation: string
    failed_step_number: 1 | 2 | 3 | 4
    failed_step_name: string
    failed_step_type: string
    decision: "yes" | "no" | null
    decision_reason: string
    status: string
    error_message: string
    step_response: Record<string, unknown> | null
    updated_at: string
}

// ── StepRawItem — when ?raw=true is used on step-specific endpoints ──
export interface StepRawItem {
    decision?: "yes" | "no" | null
    response: Record<string, unknown> | null
}

// ── Full TenderEvaluationResult model ──
export interface TenderEvaluationResult {
    id: string
    tender: string | null
    source_tender_id: string
    tender_reference_number: string
    tender_title: string
    status: "pending" | "running" | "completed" | "failed"
    groq_model: string
    // Step 1
    step1_status: "pending" | "running" | "completed" | "failed"
    step1_started_at: string | null
    step1_completed_at: string | null
    step1_prompt: string
    step1_request_payload: Record<string, unknown> | null
    step1_response: Record<string, unknown> | null
    step1_response_text: string
    step1_error: string
    step1_retry_count: number
    step1_tender_overview: Record<string, unknown> | null
    step1_products_analysis: Record<string, unknown> | null
    step1_organisation_analysis: Record<string, unknown> | null
    step1_opportunities: unknown[] | null
    step1_risks: unknown[] | null
    step1_recommendation: string
    step1_confidence_level: string
    // Step 2
    step2_status: "pending" | "running" | "completed" | "failed"
    step2_started_at: string | null
    step2_completed_at: string | null
    step2_prompt: string
    step2_request_payload: Record<string, unknown> | null
    step2_response: Record<string, unknown> | null
    step2_response_text: string
    step2_error: string
    step2_retry_count: number
    step2_competitive_analysis: Record<string, unknown> | null
    step2_commercial_analysis: Record<string, unknown> | null
    step2_risk_assessment: Record<string, unknown> | null
    step2_strategic_recommendation: string
    step2_executive_summary: string
    // Final
    final_decision: "bid" | "no_bid" | null
    final_decision_reason: string
    documents_analyzed: unknown[] | null
    documents_count: number
    // Computed
    duration_seconds: number | null
    is_complete: boolean
    should_proceed_to_step2: boolean
    // Timestamps
    started_at: string | null
    completed_at: string | null
    created_at: string
    updated_at: string
}

// ── Slim step response shapes ──
export interface EvaluationResultStep1Response {
    step1_status: string
    step1_response: Record<string, unknown> | null
    step1_recommendation: string
    step1_confidence_level: string
    step1_tender_overview: Record<string, unknown> | null
    step1_products_analysis: Record<string, unknown> | null
    opportunities: unknown[] | null
    risks: unknown[] | null
}

export interface EvaluationResultStep2Response {
    step2_status: string
    step2_response: Record<string, unknown> | null
    step2_competitive_analysis: Record<string, unknown> | null
    step2_commercial_analysis: Record<string, unknown> | null
    step2_risk_assessment: Record<string, unknown> | null
    step2_strategic_recommendation: string
    step2_executive_summary: string
}

// ── Step-endpoint response wrapper (non-paginated) ──
export interface StepListResponse<T> {
    raw_response: boolean
    count: number
    results: T[]
}

// ── Failed-endpoint response (non-paginated) ──
export interface FailedEvaluationsResponse {
    count: number
    message: string
    results: FailedEvaluationItem[]
}

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

export interface RawTender {
    tender_id?: string
    source_tender_id?: string
    bid_submission_end?: string
    tender_value?: string
    city?: string[]
    state?: string[]
    location?: string
    tender_category?: string
    title?: string
    organisation?: string
    publish_date?: string
    status?: string
    portal_name?: string
    extended_data?: Record<string, any>
    boq_data?: Record<string, any>
    tender_html?: string
}

export interface SystemHealth {
    status: string
    database: string
    active_tenders: number
    tenders_count: number
    timestamp: string
}

export interface ScraperConfig {
    id: number
    name: string
    is_active: boolean
    target_url: string
    schedule_interval_minutes: number
    last_run_at: string | null
    created_at: string
    updated_at: string
}

export interface ScraperJob {
    id: number
    configuration: number
    status: "pending" | "started" | "in_progress" | "completed" | "failed"
    started_at: string | null
    completed_at: string | null
    tenders_found: number
    tenders_processed: number
    error_log: string | null
    created_at: string
    updated_at: string
}

export interface ScraperJobSummary {
    total_jobs: number
    completed_jobs: number
    failed_jobs: number
    in_progress_jobs: number
    tenders_found: number
    recent_jobs: ScraperJob[]
}
