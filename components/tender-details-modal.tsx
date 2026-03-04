"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    fetchEvaluationSteps,
    triggerEvaluation,
    fetchTenderDetail,
    fetchEvaluationResultByTender,
    triggerEvaluationResult,
    type EvaluationStepSummary,
    type RawTender,
    type EvaluationResult,
} from "@/lib/api"
import {
    Loader2, CheckCircle2, XCircle, AlertCircle, PlayCircle,
    FileText, Database, Sparkles, Copy, ChevronDown, ChevronRight,
    X, TrendingUp, Shield, BarChart2, Gavel,
} from "lucide-react"
import toast from "react-hot-toast"
import { mutate } from "swr"
import { useEvaluationPoller } from "@/hooks/useEvaluationPoller"
import { evaluationCompleteStore } from "@/components/evaluation-complete-popup"

// ── types
interface TenderStepsData {
    error?: string
    step_1?: EvaluationStepSummary
    step_2?: EvaluationStepSummary
    step_3?: EvaluationStepSummary
    step_4?: EvaluationStepSummary
}

interface TenderDetailsModalProps {
    tenderId: string
    open: boolean
    onOpenChange: (open: boolean) => void
    tenderTitle: string
    cardVariant?: "tender-discovery" | "tender-wins" | "private-news"
}

// ── helpers
function copyToClipboard(json: unknown) {
    navigator.clipboard?.writeText(JSON.stringify(json, null, 2))
    toast.success("Copied to clipboard")
}

const STEP_META: Record<number, { icon: React.ElementType; color: string; bg: string; border: string }> = {
    1: { icon: TrendingUp,  color: "text-blue-700",   bg: "bg-blue-50",   border: "border-blue-200" },
    2: { icon: BarChart2,   color: "text-purple-700", bg: "bg-purple-50", border: "border-purple-200" },
    3: { icon: Shield,      color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" },
    4: { icon: Gavel,       color: "text-rose-700",   bg: "bg-rose-50",   border: "border-rose-200" },
}

// ── collapsible JSON block
function JsonBlock({ label, data }: { label: string; data: unknown }) {
    const [open, setOpen] = React.useState(false)
    const json = JSON.stringify(data, null, 2)
    return (
        <div className="rounded-xl border border-gray-200 overflow-hidden">
            <button
                onClick={() => setOpen(v => !v)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</span>
                <div className="flex items-center gap-2">
                    {open && (
                        <span
                            onClick={e => { e.stopPropagation(); copyToClipboard(data) }}
                            className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                            <Copy className="h-3 w-3" /> Copy
                        </span>
                    )}
                    {open ? <ChevronDown className="h-4 w-4 text-gray-400" /> : <ChevronRight className="h-4 w-4 text-gray-400" />}
                </div>
            </button>
            {open && (
                <div className="bg-[#0D1117] p-4 overflow-x-auto max-h-72 overflow-y-auto">
                    <pre className="text-xs text-[#E6EDF3] font-mono leading-relaxed whitespace-pre-wrap wrap-break-word">{json}</pre>
                </div>
            )}
        </div>
    )
}

// ── step card
function StepCard({ step, number }: { step: EvaluationStepSummary; number: number }) {
    const isPassed = ["passed", "completed", "success"].includes(step.status)
    const meta = STEP_META[number] ?? STEP_META[1]
    const Icon = meta.icon

    return (
        <div className={`rounded-2xl border-2 overflow-hidden transition-shadow hover:shadow-md ${isPassed ? meta.border : "border-red-200"}`}>
            <div className={`px-5 py-4 flex items-center justify-between ${isPassed ? meta.bg : "bg-red-50"}`}>
                <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-sm ${isPassed ? "bg-white" : "bg-red-100"}`}>
                        <Icon className={`h-5 w-5 ${isPassed ? meta.color : "text-red-500"}`} />
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900 text-sm leading-tight">{step.step_name || `Step ${number}`}</p>
                        <p className="text-xs text-gray-500 capitalize">{step.step_type?.replace(/_/g, " ")}</p>
                    </div>
                </div>
                <Badge className={`text-xs font-semibold px-3 py-1 rounded-full ${isPassed ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"}`} variant="outline">
                    {isPassed ? "Passed" : "Failed"}
                </Badge>
            </div>
            <div className="px-5 py-4 bg-white space-y-4">
                <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">AI Decision</p>
                    <p className="text-sm text-gray-800 leading-relaxed bg-gray-50 rounded-xl border border-gray-100 px-4 py-3">
                        {step.decision_reason || "No reasoning provided."}
                    </p>
                </div>
                <JsonBlock label="Step Response JSON" data={step.step_response} />
            </div>
        </div>
    )
}

// ── TwoStepResult
function TwoStepResult({ evalResult }: { evalResult: EvaluationResult }) {
    const isBid = evalResult.final_decision === "bid"
    return (
        <div className="space-y-5">
            <div className={`rounded-2xl border-2 p-5 flex items-start gap-4 ${isBid ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"}`}>
                <div className={`p-2 rounded-xl ${isBid ? "bg-green-100" : "bg-red-100"}`}>
                    {isBid ? <CheckCircle2 className="h-6 w-6 text-green-600" /> : <XCircle className="h-6 w-6 text-red-500" />}
                </div>
                <div>
                    <p className={`font-bold text-base capitalize ${isBid ? "text-green-800" : "text-red-700"}`}>
                        {isBid ? "Recommended — Proceed to Bid" : "Not Recommended"}
                    </p>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{evalResult.final_decision_reason}</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border-2 border-blue-200 overflow-hidden">
                <div className="px-5 py-4 bg-blue-50 flex items-center gap-3 border-b border-blue-100">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                        <p className="font-semibold text-gray-900 text-sm">Opportunity Assessment</p>
                        <p className="text-xs text-gray-500">
                            Confidence: <strong className="capitalize">{evalResult.step1_confidence_level}</strong>
                            {evalResult.step1_recommendation && <> · <strong className="capitalize">{evalResult.step1_recommendation}</strong></>}
                        </p>
                    </div>
                </div>
                <div className="p-5 space-y-4">
                    {((evalResult.step1_opportunities as string[] | undefined)?.length ?? 0) > 0 && (
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Opportunities</p>
                            <ul className="space-y-1.5">
                                {(evalResult.step1_opportunities as string[]).map((o, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />{o}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {((evalResult.step1_risks as string[] | undefined)?.length ?? 0) > 0 && (
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Risks</p>
                            <ul className="space-y-1.5">
                                {(evalResult.step1_risks as string[]).map((r, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                        <AlertCircle className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />{r}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <JsonBlock label="Full Step 1 JSON" data={{
                        overview: evalResult.step1_tender_overview,
                        products: evalResult.step1_products_analysis,
                        organisation: evalResult.step1_organisation_analysis,
                    }} />
                </div>
            </div>

            <div className="bg-white rounded-2xl border-2 border-purple-200 overflow-hidden">
                <div className="px-5 py-4 bg-purple-50 flex items-center gap-3 border-b border-purple-100">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                        <p className="font-semibold text-gray-900 text-sm">Competitive & Commercial Analysis</p>
                        <p className="text-xs text-gray-500">Executive summary</p>
                    </div>
                </div>
                <div className="p-5 space-y-4">
                    {evalResult.step2_executive_summary && (
                        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-xl border border-gray-100 px-4 py-3">
                            {evalResult.step2_executive_summary}
                        </p>
                    )}
                    <JsonBlock label="Full Step 2 JSON" data={{
                        competitive: evalResult.step2_competitive_analysis,
                        commercial: evalResult.step2_commercial_analysis,
                        risk: evalResult.step2_risk_assessment,
                        strategic: evalResult.step2_strategic_recommendation,
                    }} />
                </div>
            </div>
        </div>
    )
}

// ── Deep Data tab components

// Renders BOQ (string of newline-separated items) as a numbered list
function BoqCard({ boq }: { boq: string | null | undefined }) {
    const items = React.useMemo(() =>
        (boq || "").split("\n").map(l => l.trim()).filter(Boolean),
        [boq]
    )
    if (!items.length) return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b bg-gray-50 flex items-center gap-2">
                <Database className="w-4 h-4 text-violet-500" />
                <h3 className="font-semibold text-gray-800 text-sm">Bill of Quantities (BOQ)</h3>
            </div>
            <div className="p-5">
                <div className="text-sm text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200 px-4 py-8 text-center">
                    No BOQ mapping or structural data detected
                </div>
            </div>
        </div>
    )
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-violet-500" />
                    <h3 className="font-semibold text-gray-800 text-sm">Bill of Quantities (BOQ)</h3>
                </div>
                <span className="text-xs text-gray-400 font-medium bg-gray-100 px-2.5 py-0.5 rounded-full">{items.length} items</span>
            </div>
            <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                {items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                        <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-violet-100 text-violet-600 text-[10px] font-bold flex items-center justify-center">
                            {i + 1}
                        </span>
                        <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

// Renders raw_data object as a clean key-value table (excludes the boq key)
function RawDataCard({ raw }: { raw: Record<string, unknown> | null | undefined }) {
    const entries = React.useMemo(() => {
        if (!raw || typeof raw !== "object") return []
        return Object.entries(raw)
            .filter(([k]) => k !== "boq")
            .map(([k, v]) => ({
                key: k.replace(/_/g, " "),
                value: typeof v === "object" ? JSON.stringify(v) : String(v ?? "—"),
            }))
    }, [raw])

    if (!entries.length) return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b bg-gray-50 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-500" />
                <h3 className="font-semibold text-gray-800 text-sm">Raw Extracted Data</h3>
            </div>
            <div className="p-5">
                <div className="text-sm text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200 px-4 py-8 text-center">
                    No raw extracted data found
                </div>
            </div>
        </div>
    )
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-500" />
                    <h3 className="font-semibold text-gray-800 text-sm">Raw Extracted Data</h3>
                </div>
                <span className="text-xs text-gray-400 font-medium bg-gray-100 px-2.5 py-0.5 rounded-full">{entries.length} fields</span>
            </div>
            <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
                {entries.map(({ key, value }) => (
                    <div key={key} className="grid grid-cols-[160px_1fr] gap-3 px-5 py-2.5 hover:bg-gray-50 transition-colors">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide self-start pt-0.5 truncate capitalize">{key}</span>
                        <span className="text-sm text-gray-800 break-all leading-relaxed">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

// ── EmptyCard
function EmptyCard({ message }: { message: string }) {
    return (
        <div className="text-center py-16 text-gray-400 bg-white rounded-2xl border border-gray-200">
            <Sparkles className="h-8 w-8 mx-auto mb-3 text-gray-300" />
            <p className="text-sm font-medium">{message}</p>
        </div>
    )
}

// ── main modal
export function TenderDetailsModal({
    tenderId, open, onOpenChange, tenderTitle,
    cardVariant = "tender-discovery",
}: TenderDetailsModalProps) {
    const isTenderWins = cardVariant === "tender-wins"
    const [activeTab, setActiveTab] = React.useState("ai-evaluation")
    const [loading, setLoading] = React.useState(false)
    const [triggering, setTriggering] = React.useState(false)
    const [triggeringResult, setTriggeringResult] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const [data, setData] = React.useState<TenderStepsData | null>(null)
    const [deepTender, setDeepTender] = React.useState<RawTender | null>(null)
    const [evalResult, setEvalResult] = React.useState<EvaluationResult | null>(null)

    const loadData = React.useCallback(() => {
        if (!tenderId) return
        setLoading(true)
        Promise.all([
            fetchEvaluationSteps(tenderId).catch(err => ({ error: err.message })),
            fetchTenderDetail(tenderId).catch(() => null),
            fetchEvaluationResultByTender(tenderId).catch(() => null),
        ]).then(([evalRes, tenderRes, evalResultRes]) => {
            setData(evalRes)
            setDeepTender(tenderRes)
            setEvalResult(evalResultRes?.results?.[0] ?? null)
            setError(null)
        }).catch(err => setError(err.message))
          .finally(() => setLoading(false))
    }, [tenderId])

    React.useEffect(() => { if (open) loadData() }, [open, loadData])

    const { startPolling } = useEvaluationPoller({
        onComplete: (result) => {
            loadData()
            mutate((key) => typeof key === "string" && (
                key.includes("/evaluations/fully_passed") || key.includes("/evaluations/failed")
            ))
            evaluationCompleteStore.notify(result)
        },
    })

    const handleTrigger = async () => {
        try {
            setTriggering(true)
            await triggerEvaluation(tenderId)
            toast.success("AI Evaluation queued — we'll notify you when it's done!")
            startPolling(tenderId, tenderTitle)
        } catch (err: any) {
            toast.error(err.message || "Failed to trigger evaluation")
        } finally { setTriggering(false) }
    }

    const handleTriggerResult = async () => {
        try {
            setTriggeringResult(true)
            await triggerEvaluationResult(tenderId)
            toast.success("2-Step analysis queued — we'll notify you when it's done!")
            startPolling(tenderId, tenderTitle)
        } catch (err: any) {
            toast.error(err.message || "Failed to trigger 2-step analysis")
        } finally { setTriggeringResult(false) }
    }

    const hasNoSteps = data && !data.step_1 && !data.step_2 && !data.step_3 && !data.step_4
    const hasNoEvalResult = !evalResult

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl h-[90vh] p-0 gap-0 border-0 shadow-2xl rounded-2xl overflow-hidden flex flex-col bg-white [&>button]:hidden">
                {/* Visually-hidden title satisfies Radix accessibility requirement */}
                <DialogTitle className="sr-only">{tenderTitle ?? "Tender Details"}</DialogTitle>

                {/* Header */}
                <div className="shrink-0 bg-linear-to-br from-indigo-600 via-indigo-700 to-violet-800 px-7 py-5 relative">
                    <button
                        onClick={() => onOpenChange(false)}
                        className="absolute right-4 top-4 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                    <div className="flex items-start gap-4 pr-8">
                        <div className="mt-0.5 bg-white/15 p-2.5 rounded-xl">
                            <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <Badge className="bg-white/20 text-white border-0 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 mb-1.5 hover:bg-white/20">
                                {isTenderWins ? "2-Step Analysis" : "4-Step AI Evaluation"}
                            </Badge>
                            <h2 className="text-white font-bold text-lg leading-snug line-clamp-2">{tenderTitle}</h2>
                            <p className="text-indigo-200 text-xs mt-1.5 font-mono truncate">ID: {tenderId}</p>
                        </div>
                    </div>
                    {activeTab === "ai-evaluation" && (
                        isTenderWins
                            ? hasNoEvalResult && (
                                <Button onClick={handleTriggerResult} disabled={triggeringResult}
                                    className="mt-4 bg-white text-indigo-700 hover:bg-indigo-50 gap-2 font-semibold shadow-md h-9 text-sm">
                                    {triggeringResult ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlayCircle className="h-4 w-4" />}
                                    Run 2-Step Analysis
                                </Button>
                            )
                            : hasNoSteps && (
                                <Button onClick={handleTrigger} disabled={triggering}
                                    className="mt-4 bg-white text-indigo-700 hover:bg-indigo-50 gap-2 font-semibold shadow-md h-9 text-sm">
                                    {triggering ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlayCircle className="h-4 w-4" />}
                                    Run AI Evaluation
                                </Button>
                            )
                    )}
                </div>

                {/* Tab Bar */}
                <div className="shrink-0 border-b bg-white px-6">
                    <div className="flex gap-0">
                        {[
                            { value: "ai-evaluation", icon: <Sparkles className="h-4 w-4" />, label: "AI Analysis" },
                            { value: "deep-data",     icon: <Database className="h-4 w-4" />,  label: "Deep Data & BOQ" },
                        ].map(tab => (
                            <button
                                key={tab.value}
                                onClick={() => setActiveTab(tab.value)}
                                className={`flex items-center gap-2 px-1 py-3.5 mr-6 text-sm font-semibold border-b-2 transition-colors ${
                                    activeTab === tab.value
                                        ? "text-indigo-600 border-indigo-600"
                                        : "text-gray-500 border-transparent hover:text-gray-700"
                                }`}
                            >
                                {tab.icon}{tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto bg-[#F8FAFC]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400 py-24">
                            <Loader2 className="h-9 w-9 animate-spin text-indigo-400" />
                            <p className="text-sm font-medium">Loading evaluation data…</p>
                        </div>
                    ) : error ? (
                        <div className="m-6 p-5 bg-red-50 text-red-600 rounded-2xl border border-red-100 flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
                            <p className="text-sm">{error}</p>
                        </div>
                    ) : activeTab === "ai-evaluation" ? (
                        <div className="p-6 space-y-5">
                            {isTenderWins ? (
                                evalResult
                                    ? <TwoStepResult evalResult={evalResult} />
                                    : <EmptyCard message="No 2-step evaluation result found for this tender." />
                            ) : (
                                data?.error ? (
                                    <div className="p-5 bg-yellow-50 text-yellow-700 rounded-2xl border border-yellow-200 text-sm">{data.error}</div>
                                ) : (
                                    <div className="space-y-5">
                                        {data?.step_1 && <StepCard step={data.step_1} number={1} />}
                                        {data?.step_2 && <StepCard step={data.step_2} number={2} />}
                                        {data?.step_3 && <StepCard step={data.step_3} number={3} />}
                                        {data?.step_4 && <StepCard step={data.step_4} number={4} />}
                                        {hasNoSteps && <EmptyCard message="No evaluation steps have been completed for this tender." />}
                                    </div>
                                )
                            )}
                        </div>
                    ) : (
                        <div className="p-6 space-y-4">
                            {/* Tender Meta Summary */}
                            {deepTender && (
                                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4">
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {[
                                            { label: "Category",     value: (deepTender as any)?.tender_category || (deepTender as any)?.raw_data?.tender_category || "—" },
                                            { label: "Organisation", value: (deepTender as any)?.organisation || (deepTender as any)?.raw_data?.organisation || "—" },
                                            { label: "Portal",       value: (deepTender as any)?.portal_name || "—" },
                                            { label: "Product Type", value: (deepTender as any)?.raw_data?.product_category || "—" },
                                        ].map(({ label, value }) => (
                                            <div key={label}>
                                                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
                                                <p className="text-sm font-medium text-gray-800 truncate" title={String(value)}>{String(value)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* BOQ — full width, parsed as item list */}
                            <BoqCard boq={(deepTender as any)?.raw_data?.boq} />

                            {/* Raw fields key-value table */}
                            <RawDataCard raw={(deepTender as any)?.raw_data ?? (deepTender as any)?.extended_data} />

                            {/* Original HTML document if present */}
                            {deepTender?.tender_html && (
                                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                                    <div className="px-5 py-3.5 border-b bg-gray-50 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-gray-400" />
                                        <h3 className="font-semibold text-gray-800 text-sm">Original Extracted Document</h3>
                                    </div>
                                    <div className="p-5 prose prose-sm max-w-none prose-gray overflow-auto max-h-96"
                                        dangerouslySetInnerHTML={{ __html: deepTender.tender_html }} />
                                </div>
                            )}

                            {!deepTender && <EmptyCard message="No deep data available for this tender." />}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

