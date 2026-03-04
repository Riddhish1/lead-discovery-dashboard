import useSWR from 'swr'
import {
    fetchTendersStatistics,
    fetchEvaluationsSummary,
    fetchEvaluationResultsSummary,
} from '@/lib/api/analytics'

export function useDashboardAnalytics() {
    const { data: tendersStats, error: tendersErr } = useSWR('analytics_tenders', fetchTendersStatistics, {
        refreshInterval: 60000, // refresh stats every minute
    })

    const { data: evaluationsStats, error: evalsErr } = useSWR('analytics_evals', fetchEvaluationsSummary, {
        refreshInterval: 60000,
    })

    const { data: winsStats, error: winsErr } = useSWR('analytics_wins', fetchEvaluationResultsSummary, {
        refreshInterval: 60000,
    })

    const loading = !tendersStats || !evaluationsStats || !winsStats
    const error = tendersErr || evalsErr || winsErr

    return {
        tendersStats,
        evaluationsStats,
        winsStats,
        loading,
        error
    }
}
