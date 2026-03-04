"use client"

import * as React from "react"
import { API_BASE } from "@/lib/api/config"
import { isUUID } from "@/lib/api/tenders"

export type EvaluationOutcome = "passed" | "failed" | "pending"

export interface PollResult {
    outcome: EvaluationOutcome
    tenderTitle: string
    tenderId: string
    step1Decision?: string
}

interface RawStep {
    step_number: number
    status: string
    decision: string | null
    completed_at: string | null
}

interface UseEvaluationPollerOptions {
    onComplete: (result: PollResult) => void
    maxAttempts?: number
    intervalMs?: number
}

/** A step counts as "done" if status is completed/passed/success OR completed_at is set */
function isStepDone(s: RawStep): boolean {
    if (s.completed_at) return true
    const st = (s.status || '').toLowerCase()
    return st === 'completed' || st === 'passed' || st === 'success'
}

/** Normalise the /evaluations/ response into a flat array of steps.
 *
 *  Shape A – keyed dict from fully_passed / detail endpoint:
 *    { step_1: { status, decision, completed_at, ... }, step_2: ... }
 *  Shape B – paginated list:  { count, results: [ { step_number, ... } ] }
 *  Shape C – plain array:     [ { step_number, ... } ]
 */
function normaliseSteps(data: any): RawStep[] {
    if (data && typeof data === 'object' && !Array.isArray(data)
        && (data.step_1 || data.step_2 || data.step_3 || data.step_4)) {
        // Shape A
        return [1, 2, 3, 4]
            .map((n): RawStep | null => {
                const s = data[`step_${n}`]
                if (!s) return null
                return {
                    step_number: n,
                    status: s.status || '',
                    decision: s.decision ?? null,
                    completed_at: s.completed_at ?? null,
                }
            })
            .filter((s): s is RawStep => s !== null)
    }
    if (data?.results && Array.isArray(data.results)) return data.results  // Shape B
    if (Array.isArray(data)) return data                                     // Shape C
    return []
}

async function fetchStepsRaw(tenderId: string): Promise<RawStep[]> {
    const param = isUUID(tenderId)
        ? `tender=${tenderId}`
        : `source_tender_id=${encodeURIComponent(tenderId)}`
    const res = await fetch(`${API_BASE}/evaluations/?${param}`, { cache: 'no-store' })
    if (!res.ok) throw new Error(`API ${res.status}`)
    const data = await res.json()
    return normaliseSteps(data)
}

export function useEvaluationPoller({ onComplete, maxAttempts = 36, intervalMs = 5000 }: UseEvaluationPollerOptions) {
    const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null)
    const attemptsRef = React.useRef(0)
    const onCompleteRef = React.useRef(onComplete)
    onCompleteRef.current = onComplete

    const stopPolling = React.useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
        attemptsRef.current = 0
    }, [])

    const startPolling = React.useCallback((tenderId: string, tenderTitle: string) => {
        stopPolling()
        attemptsRef.current = 0

        const check = async () => {
            attemptsRef.current += 1

            if (attemptsRef.current > maxAttempts) {
                console.warn("[EvalPoller] Max attempts reached, stopping.")
                stopPolling()
                return
            }

            try {
                const steps = await fetchStepsRaw(tenderId)
                console.log("[EvalPoller] Attempt", attemptsRef.current, "→ steps:", steps.length, steps.map(s => `step${s.step_number}:${s.status}`))

                if (steps.length === 0) return // Not started yet

                // Filter only completed steps
                const completedSteps = steps.filter(isStepDone)

                // Wait until we have at least 1 completed step
                if (completedSteps.length === 0) return

                // Group by step_number to handle duplicates if any
                const uniqueCompletedSteps = new Set(completedSteps.map((s: RawStep) => s.step_number))
                // Find step 1 (careful if there are duplicates)
                const step1 = completedSteps.find((s: RawStep) => s.step_number === 1)
                const step1Decision = step1?.decision ?? undefined

                // The evaluation is completely done IF:
                // A) Step 1 explicitly failed (early exit)
                // B) All 4 steps have successfully completed
                // C) We timed out (handled by attempts check)

                let outcome: EvaluationOutcome | null = null

                if (step1Decision === 'no') {
                    outcome = 'failed'
                } else if (uniqueCompletedSteps.size >= 4) {
                    outcome = 'passed'
                }

                // If we haven't reached a final state yet (passed or failed), keep polling
                if (!outcome) {
                    console.log(`[EvalPoller] In progress. Completed steps: ${uniqueCompletedSteps.size}/4`)
                    return
                }

                console.log(`[EvalPoller] Evaluation finished with outcome: ${outcome}`)
                stopPolling()
                onCompleteRef.current({ outcome, tenderTitle, tenderId, step1Decision })
            } catch (err) {
                console.warn("[EvalPoller] Poll error (retrying):", err)
            }
        }

        // First check after a 3s delay (give backend time to register the job)
        setTimeout(check, 3000)
        intervalRef.current = setInterval(check, intervalMs)
    }, [stopPolling, maxAttempts, intervalMs])

    React.useEffect(() => {
        return () => stopPolling()
    }, [stopPolling])

    return { startPolling, stopPolling }
}
