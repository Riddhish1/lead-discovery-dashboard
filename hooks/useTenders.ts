"use client"

import * as React from "react"
import { fetchFullyPassedTenders, fetchTenderWins, type FullyPassedTender, type EvaluationResult } from "@/lib/api"
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
        result.final_decision === "recommended" ? "Very High" :
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
export function useTenderDiscovery() {
    const [data, setData] = React.useState<TenderData[]>([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState<string | null>(null)

    React.useEffect(() => {
        let cancelled = false
        setLoading(true)
        setError(null)

        fetchFullyPassedTenders()
            .then((res) => {
                if (!cancelled) {
                    setData(res.results.map(mapFullyPassedToTenderData))
                }
            })
            .catch((err: Error) => {
                if (!cancelled) {
                    setError(err.message)
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false)
            })

        return () => { cancelled = true }
    }, [])

    return { data, loading, error }
}

export function useTenderWins() {
    const [data, setData] = React.useState<TenderData[]>([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState<string | null>(null)

    React.useEffect(() => {
        let cancelled = false
        setLoading(true)
        setError(null)

        fetchTenderWins()
            .then((res) => {
                if (!cancelled) {
                    setData(res.results.map(mapEvalResultToTenderData))
                }
            })
            .catch((err: Error) => {
                if (!cancelled) {
                    setError(err.message)
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false)
            })

        return () => { cancelled = true }
    }, [])

    return { data, loading, error }
}
