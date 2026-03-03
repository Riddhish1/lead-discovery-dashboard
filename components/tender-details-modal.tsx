"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { fetchEvaluationSteps, type EvaluationStepSummary } from "@/lib/api"
import { Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react"

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
}

export function TenderDetailsModal({ tenderId, open, onOpenChange, tenderTitle }: TenderDetailsModalProps) {
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const [data, setData] = React.useState<TenderStepsData | null>(null)

    React.useEffect(() => {
        if (open && tenderId) {
            setLoading(true)
            fetchEvaluationSteps(tenderId)
                .then((res) => {
                    setData(res)
                    setError(null)
                })
                .catch((err: Error) => {
                    setError(err.message)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [open, tenderId])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col p-0 gap-0 border-0 bg-gray-50/50 backdrop-blur-xl shadow-2xl rounded-2xl">
                <DialogHeader className="px-6 py-5 border-b bg-white/80 stick top-0 z-10 rounded-t-2xl">
                    <div className="flex items-start gap-4">
                        <div className="bg-indigo-50 p-3 rounded-xl">
                            <CheckCircle2 className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-semibold text-gray-900 leading-tight">
                                4-Step AI Evaluation Details
                            </DialogTitle>
                            <DialogDescription className="text-sm font-medium text-gray-500 mt-1">
                                {tenderTitle}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center p-12 text-gray-400 space-y-4">
                            <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                            <p>Fetching deep evaluation metrics...</p>
                        </div>
                    ) : error ? (
                        <div className="p-6 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-3">
                            <AlertCircle className="h-5 w-5" />
                            <p>Error loading details: {error}</p>
                        </div>
                    ) : data ? (
                        <div className="space-y-6">
                            {data.error ? (
                                <div className="p-6 bg-yellow-50 text-yellow-700 rounded-xl border border-yellow-200">
                                    <p>{data.error}</p>
                                </div>
                            ) : (
                                <div className="grid gap-6">
                                    {/* Step 1 */}
                                    {data.step_1 && (
                                        <StepCard step={data.step_1} number={1} />
                                    )}
                                    {/* Step 2 */}
                                    {data.step_2 && (
                                        <StepCard step={data.step_2} number={2} />
                                    )}
                                    {/* Step 3 */}
                                    {data.step_3 && (
                                        <StepCard step={data.step_3} number={3} />
                                    )}
                                    {/* Step 4 */}
                                    {data.step_4 && (
                                        <StepCard step={data.step_4} number={4} />
                                    )}
                                    {!data.step_1 && !data.step_2 && !data.step_3 && !data.step_4 && (
                                        <div className="text-center p-8 text-gray-500 bg-white rounded-xl border border-gray-200">
                                            No evaluation steps have been completed for this tender.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : null}
                </div>
            </DialogContent>
        </Dialog>
    )
}

function StepCard({ step, number }: { step: EvaluationStepSummary; number: number }) {
    const isPassed = step.status === "passed"
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className={`px-5 py-3 border-b flex items-center justify-between ${isPassed ? 'bg-green-50/50' : 'bg-red-50/50'}`}>
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isPassed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {number}
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">{step.step_name}</h3>
                        <span className="text-xs text-gray-500 font-medium">{step.step_type}</span>
                    </div>
                </div>
                {isPassed ? <CheckCircle2 className="text-green-500 h-5 w-5" /> : <XCircle className="text-red-500 h-5 w-5" />}
            </div>
            <div className="p-5 space-y-4">
                <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">AI Decision Reason</p>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100 leading-relaxed font-medium">
                        {step.decision_reason || "No reasoning provided."}
                    </p>
                </div>

                <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Raw JSON Response</p>
                    <div className="bg-[#1E1E1E] rounded-lg p-4 overflow-x-auto">
                        <pre className="text-xs text-[#D4D4D4] font-mono leading-relaxed">
                            {JSON.stringify(step.step_response, null, 2)}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    )
}
