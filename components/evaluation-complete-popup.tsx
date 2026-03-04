"use client"

import * as React from "react"
import { CheckCircle2, XCircle, ExternalLink, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PollResult } from "@/hooks/useEvaluationPoller"

interface EvaluationCompletePopupProps {
    result: PollResult | null
    onClose: () => void
    onViewResult: (result: PollResult) => void
}

export function EvaluationCompletePopup({ result, onClose, onViewResult }: EvaluationCompletePopupProps) {
    if (!result) return null

    const isPassed = result.outcome === "passed"
    const isFailed = result.outcome === "failed"

    return (
        <div className="fixed bottom-6 right-6 z-[9999] animate-in slide-in-from-bottom-4 fade-in duration-300">
            <div className={`
                relative w-[360px] rounded-2xl shadow-2xl border overflow-hidden
                ${isPassed
                    ? 'bg-white border-green-100'
                    : isFailed
                        ? 'bg-white border-red-100'
                        : 'bg-white border-blue-100'
                }
            `}>
                {/* Coloured top accent strip */}
                <div className={`h-1.5 w-full ${isPassed ? 'bg-green-500' : isFailed ? 'bg-red-500' : 'bg-blue-400'}`} />

                <div className="p-5">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close"
                    >
                        <X className="h-4 w-4" />
                    </button>

                    {/* Icon + heading */}
                    <div className="flex items-start gap-3 mb-4">
                        <div className={`p-2.5 rounded-xl flex-shrink-0 ${isPassed ? 'bg-green-50' : isFailed ? 'bg-red-50' : 'bg-blue-50'}`}>
                            {isPassed
                                ? <CheckCircle2 className="h-6 w-6 text-green-600" />
                                : isFailed
                                    ? <XCircle className="h-6 w-6 text-red-500" />
                                    : <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
                            }
                        </div>
                        <div className="flex-1 min-w-0 pr-6">
                            <p className="text-sm font-semibold text-gray-900 mb-0.5">
                                {isPassed ? "✅ AI Evaluation Passed" : isFailed ? "❌ Evaluation Failed" : "AI Evaluation Complete"}
                            </p>
                            <p className="text-xs text-gray-500 line-clamp-2">{result.tenderTitle}</p>
                        </div>
                    </div>

                    {/* Status message */}
                    <p className={`text-xs mb-4 px-3 py-2 rounded-lg ${isPassed ? 'bg-green-50 text-green-700' : isFailed ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}>
                        {isPassed
                            ? "This tender passed the AI screening and is now visible in the Tender Discovery tab."
                            : isFailed
                                ? "This tender was rejected by the AI pipeline. Check the Failed Evaluations tab for details."
                                : "Evaluation completed. Check the details for more information."
                        }
                    </p>

                    {/* CTA buttons */}
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            className={`flex-1 gap-2 text-xs font-semibold ${isPassed ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                            onClick={() => onViewResult(result)}
                        >
                            <ExternalLink className="h-3.5 w-3.5" />
                            View Result
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
                            onClick={onClose}
                        >
                            Dismiss
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Global store for evaluation complete popup (so it persists even when modal closes)
type StoreListener = (result: PollResult | null) => void
let _listeners: StoreListener[] = []
let _currentResult: PollResult | null = null

export const evaluationCompleteStore = {
    notify(result: PollResult | null) {
        _currentResult = result
        _listeners.forEach(l => l(result))
    },
    subscribe(listener: StoreListener) {
        _listeners.push(listener)
        return () => {
            _listeners = _listeners.filter(l => l !== listener)
        }
    },
    getSnapshot() {
        return _currentResult
    }
}
