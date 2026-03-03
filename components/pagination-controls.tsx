import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationControlsProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    isLoading?: boolean
}

export function PaginationControls({ currentPage, totalPages, onPageChange, isLoading }: PaginationControlsProps) {
    if (totalPages <= 1) return null

    return (
        <div className="flex items-center justify-between px-8 py-6">
            <div className="text-sm text-gray-500 font-medium">
                Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="h-9 px-4 text-gray-700 bg-white shadow-sm border-gray-200"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage <= 1 || isLoading}
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-9 px-4 text-gray-700 bg-white shadow-sm border-gray-200"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages || isLoading}
                >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
            </div>
        </div>
    )
}
