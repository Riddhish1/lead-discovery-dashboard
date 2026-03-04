import { API_BASE } from './config'

export interface TendersStatistics {
    total_count: number;
    by_status: Record<string, number>;
    by_category: { tender_category: string, count: number }[];
    published_today: number;
}

export interface EvaluationsSummary {
    total_steps: number;
    by_status: Record<string, number>;
    by_decision: Record<string, number>;
}

export interface EvaluationResultsSummary {
    total_results: number;
    by_status: Record<string, number>;
    by_decision: Record<string, number>;
}

export async function fetchTendersStatistics(): Promise<TendersStatistics> {
    const res = await fetch(`${API_BASE}/tenders/statistics/`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch tender statistics')
    return res.json()
}

export async function fetchEvaluationsSummary(): Promise<EvaluationsSummary> {
    const res = await fetch(`${API_BASE}/evaluations/summary/`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch evaluations summary')
    return res.json()
}

export async function fetchEvaluationResultsSummary(): Promise<EvaluationResultsSummary> {
    const res = await fetch(`${API_BASE}/evaluation-results/summary/`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch evaluation results summary')
    return res.json()
}
