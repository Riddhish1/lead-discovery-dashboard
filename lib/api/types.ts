export interface EvaluationStepSummary {
    step_name: string
    step_type: string
    decision: string
    decision_reason: string
    status: string
    step_response: Record<string, unknown>
    completed_at: string | null
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
}
