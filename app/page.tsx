"use client"

import * as React from "react"
import { SidebarProvider, SidebarInset, useSidebar } from "@/components/ui/sidebar"
import { FiltersSidebar } from "@/components/filters-sidebar"
import { AppHeader } from "@/components/app-header"
import { ActiveFilters } from "@/components/active-filters"
import { TenderCard } from "@/components/tender-card"
import { initialFilters, type FilterSection } from "@/data/filters"
import { tenders } from "@/data/tenders"

function DashboardContent() {
  const { toggleSidebar } = useSidebar()
  const [filters, setFilters] = React.useState<FilterSection[]>(initialFilters)

  const handleCheckboxChange = (
    sectionId: string,
    optionId: string,
    checked: boolean
  ) => {
    setFilters((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              options: section.options.map((option) =>
                option.id === optionId ? { ...option, checked } : option
              ),
            }
          : section
      )
    )
  }

  const clearAllFilters = () => {
    setFilters((prev) =>
      prev.map((section) => ({
        ...section,
        options: section.options.map((option) => ({
          ...option,
          checked: false,
        })),
      }))
    )
  }

  const removeFilter = (sectionId: string, optionId: string) => {
    handleCheckboxChange(sectionId, optionId, false)
  }

  // Get active filters for display
  const activeFilters = filters.flatMap((section) =>
    section.options
      .filter((option) => option.checked)
      .map((option) => ({
        id: option.id,
        label: option.label,
        sectionId: section.id,
      }))
  )

  return (
    <div className="flex flex-1 pt-16">
      <FiltersSidebar
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
        onClearAll={clearAllFilters}
      />
      <SidebarInset className="flex-1 overflow-auto">
        <ActiveFilters
          filters={activeFilters}
          onToggleSidebar={toggleSidebar}
        />
        <div className="pt-6 px-8 pb-0 space-y-7">
          {/* Tender Cards */}
          {tenders.map((tender, index) => (
            <TenderCard
              key={index}
              {...tender}
            />
          ))}
        </div>
      </SidebarInset>
    </div>
  )
}

export default function Home() {
  return (
    <div className="h-screen w-full overflow-hidden flex flex-col">
      <AppHeader />
      <div className="flex-1 overflow-hidden">
        <SidebarProvider className="h-full">
          <DashboardContent />
        </SidebarProvider>
      </div>
    </div>
  )
}
