"use client"

import { Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface ActiveFilter {
  id: string
  label: string
  sectionId: string
}

interface ActiveFiltersProps {
  filters: ActiveFilter[]
  onToggleSidebar: () => void
}

export function ActiveFilters({ filters, onToggleSidebar }: ActiveFiltersProps) {
  const visibleFilters = filters.slice(0, 3)
  const remainingCount = filters.length - 3

  return (
    <div className="flex items-center justify-between px-8 py-2 mt-5 bg-background">
      <div className="flex items-center gap-2.5">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleSidebar}
          className="flex items-center gap-1.5 h-[34px] px-3 bg-[#F1F5F9] border-[#CAD5E2] text-[#0F172B]"
        >
          <Filter className="h-3.5 w-3.5" />
          <span className="text-sm font-medium">Filters</span>
        </Button>

        <Separator orientation="vertical" className="h-6" />

        {filters.length > 0 && (
          <>
            <span className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">
              ROLE PRESETS:
            </span>

            <div className="flex items-center gap-2">
              {visibleFilters.map((filter) => (
                <Badge
                  key={`${filter.sectionId}-${filter.id}`}
                  variant="secondary"
                  className="px-2.5 py-0.5 text-sm font-medium bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-0 rounded"
                >
                  {filter.label}
                </Badge>
              ))}

              {remainingCount > 0 && (
                <span className="text-sm text-gray-500">
                  +{remainingCount}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium underline">
        Download list of sources
      </button>
    </div>
  )
}
