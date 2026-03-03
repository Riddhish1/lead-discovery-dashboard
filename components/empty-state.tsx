import { SearchX } from "lucide-react"

export function EmptyState({ tab }: { tab: string }) {
    const titles: Record<string, string> = {
        "tender-discovery": "No Fully Passed Tenders",
        "tender-wins": "No Tender Wins Found",
        "all-tenders": "No Tenders Found",
        "failed-evaluations": "No Failed Evaluations",
    }
    const description = "We couldn't find any data matching your criteria at this time."

    return (
        <div className="flex flex-col items-center justify-center h-full p-20 text-center">
            <div className="bg-gray-100 p-6 rounded-full mb-6">
                <SearchX className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {titles[tab] || "No Data Available"}
            </h3>
            <p className="text-gray-500 max-w-sm">{description}</p>
        </div>
    )
}
