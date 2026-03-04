"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import useSWR from "swr"
import { ArrowLeft, Server, Activity, Database, AlertCircle, PlayCircle, Loader2, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import {
    fetchSystemHealth,
    fetchConfigurations,
    fetchJobsSummary,
    triggerScrape,
    API_BASE
} from "@/lib/api"
import toast from "react-hot-toast"

export default function SystemPage() {
    const router = useRouter()

    // Data Fetching
    const { data: health, error: healthError } = useSWR('system-health', fetchSystemHealth, { refreshInterval: 60000 })
    const { data: configs, error: configsError } = useSWR('system-configs', fetchConfigurations)
    const { data: jobsSummary, error: jobsError, mutate: mutateJobs } = useSWR('system-jobs-summary', () => fetchJobsSummary(7), { refreshInterval: 30000 })

    const [triggering, setTriggering] = React.useState(false)

    const handleTriggerScrape = async () => {
        setTriggering(true)
        try {
            const res = await triggerScrape()
            toast.success(res.message || "Scraping pipeline triggered successfully")
            mutateJobs()
        } catch (err: any) {
            toast.error(err.message || "Failed to trigger scraping pipeline")
        } finally {
            setTriggering(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white border-b px-8 py-4 sticky top-0 z-20 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.push('/')} className="h-9 w-9 text-gray-500 hover:text-gray-900">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-100 p-2 rounded-lg">
                            <Server className="h-5 w-5 text-indigo-700" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 leading-tight">System Data Engine</h1>
                            <p className="text-sm font-medium text-gray-500">Manage scrapers, APIs, and infrastructure health</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-8">

                {/* Health Overview */}
                <section>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Activity className="h-5 w-5 text-gray-400" />
                        Infrastructure Health
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${health?.status === 'healthy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    <Server className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">API Status</p>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {health ? (health.status === 'healthy' ? 'Operational' : 'Degraded') : 'Checking...'}
                                        </h3>
                                        {health?.status === 'healthy' && <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Online</Badge>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${health?.database === 'connected' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                                    <Database className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Database Connection</p>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {health ? (health.database === 'connected' ? 'Connected' : 'Disconnected') : 'Checking...'}
                                        </h3>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-purple-100 text-purple-700">
                                    <Activity className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Total Tenders Indexed</p>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {health ? health.tenders_count.toLocaleString() : '---'}
                                        </h3>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <Separator />

                {/* Scraper Controls */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-6">
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <Server className="h-5 w-5 text-gray-400" />
                            Scraping Pipeline
                        </h2>

                        <Card className="border-indigo-100 shadow-sm overflow-hidden">
                            <div className="bg-indigo-50/50 p-6 border-b border-indigo-100">
                                <h3 className="font-semibold text-indigo-900 mb-2">Manual Data Ingestion</h3>
                                <p className="text-sm text-indigo-700/80 mb-6">Force the backend crawlers to run immediately to fetch the latest tenders from configured sources.</p>

                                <Button
                                    size="lg"
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all gap-2"
                                    onClick={handleTriggerScrape}
                                    disabled={triggering}
                                >
                                    {triggering ? <Loader2 className="h-5 w-5 animate-spin" /> : <PlayCircle className="h-5 w-5" />}
                                    {triggering ? 'Initializing Pipeline...' : 'Run Data Scraper Now'}
                                </Button>
                            </div>
                            <div className="bg-white p-4">
                                <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-3">
                                    <Info className="h-4 w-4" />
                                    Active Configurations
                                </div>
                                <div className="space-y-2">
                                    {!configs && !configsError && <p className="text-sm text-gray-400">Loading configs...</p>}
                                    {configs?.map(config => (
                                        <div key={config.id} className="flex items-center justify-between p-2 rounded-lg border border-gray-100 bg-gray-50/50">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${config.is_active ? 'bg-green-500' : 'bg-gray-300'}`} />
                                                <span className="text-sm font-medium text-gray-700">{config.name}</span>
                                            </div>
                                            <Badge variant="secondary" className="text-[10px] bg-white">Every {config.schedule_interval_minutes}m</Badge>
                                        </div>
                                    ))}
                                    {configs?.length === 0 && <p className="text-sm text-gray-500">No scraper configurations found.</p>}
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <Activity className="h-5 w-5 text-gray-400" />
                                Recent Job Executions
                            </h2>
                            {jobsSummary && (
                                <div className="flex items-center gap-3 text-sm">
                                    <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                                        {jobsSummary.completed_jobs} Completed
                                    </Badge>
                                    <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">
                                        {jobsSummary.failed_jobs} Failed
                                    </Badge>
                                </div>
                            )}
                        </div>

                        <Card className="overflow-hidden shadow-sm border-gray-200">
                            <Table>
                                <TableHeader className="bg-gray-50/50">
                                    <TableRow>
                                        <TableHead className="w-[100px]">Job ID</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Started At</TableHead>
                                        <TableHead>Duration</TableHead>
                                        <TableHead className="text-right">Tenders Found</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {!jobsSummary && !jobsError && (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-8 text-gray-400">
                                                <div className="flex flex-col items-center justify-center">
                                                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                                                    <span>Loading recent jobs...</span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {(jobsSummary?.recent_jobs || []).map((job: any) => {
                                        const start = job.started_at ? new Date(job.started_at) : null;
                                        const end = job.completed_at ? new Date(job.completed_at) : null;
                                        const duration = (start && end) ? Math.round((end.getTime() - start.getTime()) / 1000) + 's' : '-';

                                        return (
                                            <TableRow key={job.id}>
                                                <TableCell className="font-medium text-gray-900">#{job.id}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            job.status === 'completed' ? 'border-green-200 text-green-700 bg-green-50' :
                                                                job.status === 'failed' ? 'border-red-200 text-red-700 bg-red-50' :
                                                                    'border-blue-200 text-blue-700 bg-blue-50'
                                                        }
                                                    >
                                                        {job.status.replace('_', ' ').toUpperCase()}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-gray-500">
                                                    {start ? start.toLocaleString() : 'Pending'}
                                                </TableCell>
                                                <TableCell className="text-gray-500">{duration}</TableCell>
                                                <TableCell className="text-right font-medium text-gray-900">
                                                    {job.status === 'completed' ? job.tenders_found : '-'}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                    {(!jobsSummary?.recent_jobs || jobsSummary.recent_jobs.length === 0) && (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-12 text-gray-500 bg-gray-50/30">
                                                No recent jobs found in the last 7 days.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </Card>
                    </div>
                </section>
            </main>
        </div>
    )
}

