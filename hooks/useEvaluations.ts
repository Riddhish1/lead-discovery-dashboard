"use client"

import useSWR from "swr"
import { API_BASE, fetcher } from "@/lib/api/config"
import type {
    Tender,
    TenderEvaluationStep,
    TenderEvaluationResult,
    StepRawItem,
    StepListResponse,
    FailedEvaluationsResponse,
    EvaluationResultStep1Response,
    EvaluationResultStep2Response,
    PaginatedResponse,
} from "@/lib/api/types"

// ── C1. useTenderBySourceId ──
export function useTenderBySourceId(sourceTenderId: string | null, page = 1) {
    const url = sourceTenderId
        ? `${API_BASE}/tenders/?source_tender_id=${encodeURIComponent(sourceTenderId)}&page=${page}`
        : null

    const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<Tender>>(
        url,
        fetcher,
        { keepPreviousData: true }
    )

    return {
        data: data?.results ?? [],
        isLoading,
        error: error?.message ?? null,
        totalPages: data?.count ? Math.ceil(data.count / 10) : 1,
        refetch: mutate,
    }
}

// ── C2. useUpcomingTenders ──
// NOTE: /tenders/upcoming/ returns a plain array, NOT paginated
export function useUpcomingTenders(days = 7) {
    const { data, error, isLoading, mutate } = useSWR<Tender[]>(
        `${API_BASE}/tenders/upcoming/?days=${days}`,
        fetcher,
        { keepPreviousData: true }
    )

    return {
        data: data ?? [],
        isLoading,
        error: error?.message ?? null,
        refetch: mutate,
    }
}

// ── C3. useFailedEvaluationsFiltered ──
// Parameterised version with optional filter params (differs from page-based useFailedEvaluations in useTenders.ts)
export function useFailedEvaluationsFiltered(params?: {
    tender?: string
    source_tender_id?: string
    step_number?: 1 | 2 | 3 | 4
}) {
    const qs = new URLSearchParams()
    if (params?.tender) qs.append("tender", params.tender)
    if (params?.source_tender_id) qs.append("source_tender_id", params.source_tender_id)
    if (params?.step_number) qs.append("step_number", String(params.step_number))

    const url = `${API_BASE}/evaluations/failed/${qs.toString() ? `?${qs}` : ""}`

    const { data, error, isLoading, mutate } = useSWR<FailedEvaluationsResponse>(
        url,
        fetcher,
        { keepPreviousData: true }
    )

    return {
        data: data?.results ?? [],
        count: data?.count ?? 0,
        message: data?.message ?? null,
        isLoading,
        error: error?.message ?? null,
        refetch: mutate,
    }
}

// ── C4–C7. Step-specific hooks ──
function useStepHook<T = TenderEvaluationStep | StepRawItem>(
    stepPath: string,
    params?: { tender?: string; raw?: boolean }
) {
    const qs = new URLSearchParams()
    if (params?.tender) qs.append("tender", params.tender)
    if (params?.raw) qs.append("raw", "true")

    const url = `${API_BASE}/evaluations/${stepPath}/${qs.toString() ? `?${qs}` : ""}`

    const { data, error, isLoading, mutate } = useSWR<StepListResponse<T>>(
        url,
        fetcher,
        { keepPreviousData: true }
    )

    return {
        data: data?.results ?? [],
        count: data?.count ?? 0,
        isLoading,
        error: error?.message ?? null,
        refetch: mutate,
    }
}

export function useStep1ProductMatch(params?: { tender?: string; raw?: boolean }) {
    return useStepHook("step1_product_match", params)
}

export function useStep2PricingAnalysis(params?: { tender?: string; raw?: boolean }) {
    return useStepHook("step2_pricing_analysis", params)
}

export function useStep3CompetitorCheck(params?: { tender?: string; raw?: boolean }) {
    return useStepHook("step3_competitor_check", params)
}

export function useStep4LegalReview(params?: { tender?: string; raw?: boolean }) {
    return useStepHook("step4_legal_review", params)
}

// ── C8. useEvaluationResult (by result UUID) ──
// Returns a single TenderEvaluationResult. 404 = "not evaluated yet".
export function useEvaluationResult(resultId: string | null) {
    const { data, error, isLoading, mutate } = useSWR<TenderEvaluationResult>(
        resultId ? `${API_BASE}/evaluation-results/${resultId}/` : null,
        fetcher,
        { keepPreviousData: true }
    )

    return {
        data: data ?? null,
        isLoading,
        error: error?.message ?? null,
        refetch: mutate,
    }
}

// ── C9. useEvaluationResultStep1 ──
export function useEvaluationResultStep1(resultId: string | null) {
    const { data, error, isLoading, mutate } = useSWR<EvaluationResultStep1Response>(
        resultId ? `${API_BASE}/evaluation-results/${resultId}/step1_response/` : null,
        fetcher,
        { keepPreviousData: true }
    )

    return {
        data: data ?? null,
        isLoading,
        error: error?.message ?? null,
        refetch: mutate,
    }
}

// ── C10. useEvaluationResultStep2 ──
export function useEvaluationResultStep2(resultId: string | null) {
    const { data, error, isLoading, mutate } = useSWR<EvaluationResultStep2Response>(
        resultId ? `${API_BASE}/evaluation-results/${resultId}/step2_response/` : null,
        fetcher,
        { keepPreviousData: true }
    )

    return {
        data: data ?? null,
        isLoading,
        error: error?.message ?? null,
        refetch: mutate,
    }
}
