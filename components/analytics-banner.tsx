"use client"

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { useDashboardAnalytics } from "@/hooks/useAnalytics"
import { Loader2, TrendingUp, CheckCircle, Search, Target } from "lucide-react"

export function AnalyticsBanner() {
    const { tendersStats, evaluationsStats, winsStats, loading, error } = useDashboardAnalytics()

    if (error) {
        return null; // Fail silently if analytics don't load so we don't break the main dashboard
    }

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="bg-white/50 animate-pulse border-gray-100 shadow-sm h-[104px]" />
                ))}
            </div>
        )
    }

    // Safely parse values with fallbacks
    const totalTenders = tendersStats?.total_count || 0
    const activeTenders = tendersStats?.by_status?.['active'] || 0

    // Total evaluated (pending + processing + yes + no)
    const evaluatedTenders = evaluationsStats?.total_steps ? Math.ceil(evaluationsStats.total_steps / 4) : 0

    // Fully passed steps are effectively step 4 yes decisions or completed results that lead to wins
    const fullyPassedTenders = winsStats?.total_results || 0

    const successRate = evaluatedTenders > 0
        ? ((fullyPassedTenders / evaluatedTenders) * 100).toFixed(1)
        : "0.0"

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <StatCard
                title="Total Active Tenders"
                value={activeTenders.toLocaleString()}
                subtitle={`${totalTenders.toLocaleString()} all-time scraped`}
                icon={<Search className="h-5 w-5 text-blue-600" />}
                trend="neutral"
            />
            <StatCard
                title="Tenders Evaluated"
                value={evaluatedTenders.toLocaleString()}
                subtitle="By 4-step AI Pipeline"
                icon={<Target className="h-5 w-5 text-indigo-600" />}
                trend="neutral"
            />
            <StatCard
                title="Recommended Leads"
                value={fullyPassedTenders.toLocaleString()}
                subtitle="High-probability wins"
                icon={<CheckCircle className="h-5 w-5 text-green-600" />}
                trend="positive"
            />
            <StatCard
                title="AI Success Rate"
                value={`${successRate}%`}
                subtitle="Of evaluated tenders"
                icon={<TrendingUp className="h-5 w-5 text-emerald-600" />}
                trend="positive"
            />
        </div>
    )
}

function StatCard({
    title,
    value,
    subtitle,
    icon,
    trend
}: {
    title: string;
    value: string;
    subtitle: string;
    icon: React.ReactNode;
    trend: 'positive' | 'negative' | 'neutral'
}) {
    return (
        <Card className="bg-white border-gray-200 shadow-sm overflow-hidden group hover:shadow-md transition-all duration-200">
            <CardContent className="p-5">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 group-hover:scale-110 transition-transform duration-200">
                        {icon}
                    </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-500">
                        {subtitle}
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}
