import { AlertCircle } from "lucide-react"

export function ErrorBanner({ message }: { message: string }) {
    return (
        <div className="flex flex-col items-center justify-center h-full p-12 text-center">
            <div className="bg-red-50 p-4 rounded-full mb-4">
                <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Failed to load data</h3>
            <p className="text-gray-500 mt-2 max-w-sm">{message}</p>
        </div>
    )
}
