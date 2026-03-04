"use client"

import * as React from "react"
import useSWR from "swr"
import {
    fetcher,
    getFullyPassedTendersUrl,
    getTenderWinsUrl,
    getTendersUrl,
    getFailedEvaluationsUrl,
    type FullyPassedTender,
    type EvaluationResult,
    type FailedEvaluationStep,
    type PaginatedResponse,
    type RawTender
} from "@/lib/api"
import type { TenderData } from "@/data/tenders"

function mapFullyPassedToTenderData(tender: FullyPassedTender): TenderData {
    // Derive days left from bid_submission_end
    let daysLeft = 0
    let deadline = "—"
    if (tender.bid_submission_end) {
        const end = new Date(tender.bid_submission_end)
        const now = new Date()
        daysLeft = Math.max(0, Math.floor((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
        deadline = end.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    }

    // Format tender value (e.g., "12500000" → "₹1.25 Cr")
    let totalValue = "—"
    let totalValueAmount = 0
    if (tender.tender_value) {
        const val = parseFloat(tender.tender_value)
        totalValueAmount = val
        if (val >= 10000000) {
            totalValue = `₹${(val / 10000000).toFixed(2)} Cr`
        } else if (val >= 100000) {
            totalValue = `₹${(val / 100000).toFixed(2)} L`
        } else {
            totalValue = `₹${val.toLocaleString("en-IN")}`
        }
    }

    // Build requirements from evaluation step responses
    const requirements: { category: string; detail: string }[] = []
    const step1 = tender.evaluation_steps?.step_1
    if (step1?.step_response) {
        const resp = step1.step_response as Record<string, unknown>
        // Try to extract matched products from step1 response
        const products = (resp.matched_products || resp.products || resp.items) as unknown[]
        if (Array.isArray(products)) {
            products.slice(0, 4).forEach((p: unknown) => {
                const prod = p as Record<string, unknown>
                requirements.push({
                    category: String(prod.category || prod.product_type || prod.name || "Product"),
                    detail: String(prod.detail || prod.description || prod.specification || ""),
                })
            })
        }
    }
    // Fallback requirement from tender category
    if (requirements.length === 0) {
        requirements.push({
            category: tender.tender_category || "Goods/Services",
            detail: tender.title.slice(0, 100),
        })
    }

    // AI quote from step2 decision reason or step1
    const step2 = tender.evaluation_steps?.step_2
    const step3 = tender.evaluation_steps?.step_3
    const step4 = tender.evaluation_steps?.step_4
    const quote =
        step4?.decision_reason ||
        step3?.decision_reason ||
        step2?.decision_reason ||
        step1?.decision_reason ||
        "All evaluation steps passed. This tender is a recommended lead."

    // Lead score — derive from steps confidence if available, else default 80
    const step1Resp = (step1?.step_response || {}) as Record<string, unknown>
    const leadScore =
        typeof step1Resp.confidence_score === "number"
            ? Math.round(step1Resp.confidence_score * 100)
            : typeof step1Resp.lead_score === "number"
                ? step1Resp.lead_score as number
                : 82

    const leadProbability =
        leadScore >= 90 ? "Very High" : leadScore >= 75 ? "High Probability" : "Moderate"

    // Location: join state/city if available
    const locationParts: string[] = []
    if (tender.city?.length) locationParts.push(tender.city[0])
    if (tender.state?.length) locationParts.push(tender.state[0])
    const location = locationParts.join(", ") || tender.location || "India"

    return {
        id: tender.tender_id,
        winningCompany: tender.organisation || "Unknown Organisation",
        location,
        date: tender.publish_date
            ? new Date(tender.publish_date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
            : "",
        dateISO: tender.publish_date || undefined,
        status: tender.status === "active" ? "Open Bidding" : tender.status,
        title: tender.title,
        requirements,
        leadScore,
        leadProbability,
        totalValue,
        totalValueAmount,
        valueSource: "Estimated tender value",
        deadline,
        daysLeft,
        nearestSupply: "—",
        logisticsDetail: "",
        sourcePortal: tender.portal_name || "TenderKart",
        quote,
        aiAction: "AI Decision Logic",
        contractValue: totalValueAmount,
        reasoningSteps: undefined,
    }
}

function mapEvalResultToTenderData(result: EvaluationResult): TenderData {
    const overview = (result.step1_tender_overview || {}) as Record<string, unknown>
    const products = (result.step1_products_analysis || {}) as Record<string, unknown>

    const requirements: { category: string; detail: string }[] = []
    const productList = (products.products || products.items || []) as unknown[]
    if (Array.isArray(productList)) {
        productList.slice(0, 4).forEach((p: unknown) => {
            const prod = p as Record<string, unknown>
            requirements.push({
                category: String(prod.category || prod.name || "Product"),
                detail: String(prod.detail || prod.description || ""),
            })
        })
    }
    if (requirements.length === 0) {
        requirements.push({
            category: "Evaluated Tender",
            detail: result.tender_title.slice(0, 100),
        })
    }

    const estValue = (overview.estimated_value as string) || "—"
    const leadScore = result.step1_confidence_level === "high" ? 88 : result.step1_confidence_level === "medium" ? 72 : 60
    const leadProbability =
        result.final_decision === 'bid' ? "Very High" :
            result.final_decision === "review_required" ? "Review Needed" : "Moderate"

    return {
        id: result.id,
        winningCompany: String(overview.organisation || result.tender_reference_number || "Organisation"),
        location: String(overview.location || "India"),
        date: result.created_at
            ? new Date(result.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
            : "",
        status: "Evaluation Complete",
        title: result.tender_title || result.tender_reference_number,
        requirements,
        leadScore,
        leadProbability,
        totalValue: estValue,
        totalValueAmount: 0,
        valueSource: "AI Estimated",
        deadline: "—",
        daysLeft: 0,
        nearestSupply: "—",
        logisticsDetail: "",
        sourcePortal: "TenderKart",
        quote: result.step2_executive_summary || result.final_decision_reason || "2-step AI evaluation completed. Recommended lead.",
        aiAction: "AI Decision Logic",
        contractValue: 0,
    }
}

function mapRawTenderToTenderData(tender: RawTender): TenderData {
    let daysLeft = 0
    let deadline = "—"
    if (tender.bid_submission_end) {
        const end = new Date(tender.bid_submission_end)
        const now = new Date()
        daysLeft = Math.max(0, Math.floor((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
        deadline = end.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    }

    let totalValue = "—"
    let totalValueAmount = 0
    if (tender.tender_value) {
        const val = parseFloat(tender.tender_value)
        totalValueAmount = val
        if (val >= 10000000) {
            totalValue = `₹${(val / 10000000).toFixed(2)} Cr`
        } else if (val >= 100000) {
            totalValue = `₹${(val / 100000).toFixed(2)} L`
        } else {
            totalValue = `₹${val.toLocaleString("en-IN")}`
        }
    }

    const locationParts: string[] = []
    if (tender.city && tender.city.length) locationParts.push(tender.city[0])
    if (tender.state && tender.state.length) locationParts.push(tender.state[0])
    const location = locationParts.join(", ") || tender.location || "India"

    const requirements = [{
        category: tender.tender_category || "General",
        detail: tender.title?.slice(0, 100) || "No title"
    }]

    return {
        id: tender.tender_id || tender.source_tender_id,
        winningCompany: tender.organisation || "Unknown Organisation",
        location,
        date: tender.publish_date
            ? new Date(tender.publish_date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
            : "",
        status: tender.status === "active" ? "Open Bidding" : (tender.status || "Unknown"),
        title: tender.title || "Untitled Tender",
        requirements,
        leadScore: 50,
        leadProbability: "Pending AI Evaluation",
        totalValue,
        totalValueAmount,
        valueSource: "Raw Source Data",
        deadline,
        daysLeft,
        nearestSupply: "—",
        logisticsDetail: "",
        sourcePortal: tender.portal_name || "TenderKart",
        quote: "Tender imported. Pending deep AI evaluation.",
        aiAction: "Evaluate Tender",
        contractValue: totalValueAmount,
    }
}

function mapFailedEvalToTenderData(failed: FailedEvaluationStep): TenderData {
    return {
        id: failed.tender_id || failed.source_tender_id,
        winningCompany: failed.tender_organisation || "Unknown Result",
        location: "India",
        date: failed.updated_at
            ? new Date(failed.updated_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
            : "",
        status: "Evaluation Failed",
        title: failed.tender_title || failed.tender_reference_number || "Evaluation Failure",
        requirements: [{
            category: `Failed Step ${failed.failed_step_number}: ${failed.failed_step_name}`,
            detail: failed.decision_reason || failed.error_message || "Unknown error occurred"
        }],
        leadScore: 0,
        leadProbability: "Rejected/Failed",
        totalValue: "—",
        totalValueAmount: 0,
        valueSource: "N/A",
        deadline: "—",
        daysLeft: 0,
        nearestSupply: "—",
        logisticsDetail: "",
        sourcePortal: "TenderKart",
        quote: `Failed during ${failed.failed_step_name}. Reason: ${failed.error_message || failed.decision_reason}`,
        aiAction: "View Failure Reason",
        contractValue: 0,
    }
}

export function useTenderDiscovery(page = 1, search = "") {
    const { data: rawData, error, isLoading } = useSWR<{ results: FullyPassedTender[], count: number }>(
        getFullyPassedTendersUrl(page, search),
        fetcher,
        { keepPreviousData: true, refreshInterval: 30000 }
    )

    const data = React.useMemo(() => {
        if (!rawData?.results) return []
        return rawData.results.map(mapFullyPassedToTenderData)
    }, [rawData])

    return {
        data,
        loading: isLoading,
        error: error?.message || null,
        totalPages: rawData?.count ? Math.ceil(rawData.count / 10) : 1
    }
}

export function useTenderWins(page = 1, search = "") {
    const { data: rawData, error, isLoading } = useSWR<PaginatedResponse<EvaluationResult>>(
        getTenderWinsUrl(page, search),
        fetcher,
        { keepPreviousData: true }
    )

    const data = React.useMemo(() => {
        return rawData?.results ? rawData.results.map(mapEvalResultToTenderData) : []
    }, [rawData])

    return {
        data,
        loading: isLoading,
        error: error?.message || null,
        totalPages: rawData?.count ? Math.ceil(rawData.count / 10) : 1 // Assuming default page_size is 10
    }
}

export function useAllTenders(page = 1, search = "") {
    const { data: rawData, error, isLoading } = useSWR<PaginatedResponse<RawTender>>(
        getTendersUrl(page, search),
        fetcher,
        { keepPreviousData: true }
    )

    const data = React.useMemo(() => {
        return rawData?.results ? rawData.results.map(mapRawTenderToTenderData) : []
    }, [rawData])

    return {
        data,
        loading: isLoading,
        error: error?.message || null,
        totalPages: rawData?.count ? Math.ceil(rawData.count / 10) : 1
    }
}

export function useFailedEvaluations(page = 1, search = "") {
    const { data: rawData, error, isLoading } = useSWR<PaginatedResponse<FailedEvaluationStep>>(
        getFailedEvaluationsUrl(page, search),
        fetcher,
        { keepPreviousData: true, refreshInterval: 30000 }
    )

    const data = React.useMemo(() => {
        return rawData?.results ? rawData.results.map(mapFailedEvalToTenderData) : []
    }, [rawData])

    return {
        data,
        loading: isLoading,
        error: error?.message || null,
        totalPages: rawData?.count ? Math.ceil(rawData.count / 10) : 1
    }
}
