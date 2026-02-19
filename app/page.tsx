"use client"

import * as React from "react"
import { SidebarProvider, SidebarInset, useSidebar } from "@/components/ui/sidebar"
import { FiltersSidebar } from "@/components/filters-sidebar"
import { AppHeader } from "@/components/app-header"
import { ActiveFilters } from "@/components/active-filters"
import { TenderCard } from "@/components/tender-card"
import { initialFilters, tenderWinsFilters, privateNewsFilters, type FilterSection } from "@/data/filters"
import { tenders, tenderWinsTenders, privateNewsTenders } from "@/data/tenders"

function getFiltersForTab(tab: string): FilterSection[] {
  if (tab === "tender-wins") return tenderWinsFilters
  if (tab === "private-news") return privateNewsFilters
  return initialFilters
}

function DashboardContent({ activeTab }: { activeTab: string }) {
  const { toggleSidebar } = useSidebar()
  const [filters, setFilters] = React.useState<FilterSection[]>(() => getFiltersForTab(activeTab))

  // Reset filters when tab changes
  React.useEffect(() => {
    setFilters(getFiltersForTab(activeTab))
  }, [activeTab])

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
      <SidebarInset className="flex-1 overflow-auto" style={{ backgroundColor: '#F8FAFC80' }}>
        <ActiveFilters
          filters={activeFilters}
          onToggleSidebar={toggleSidebar}
          activeTab={activeTab}
        />
        <div className="pt-6 px-8 pb-0 space-y-7">
          {activeTab === "private-news"
            ? privateNewsTenders.map((item, index) => (
              <TenderCard
                key={index}
                cardVariant="private-news"
                // required base props with sensible defaults
                winningCompany={item.winningCompany}
                location={item.location}
                date=""
                status=""
                title={item.title}
                requirements={item.requirements}
                leadScore={item.leadScore}
                leadProbability={item.leadProbability}
                totalValue=""
                valueSource=""
                deadline=""
                daysLeft={0}
                nearestSupply=""
                logisticsDetail=""
                sourcePortal=""
                quote={item.quote}
                aiAction={item.aiAction}
                contractValue={0}
                // private news specific props
                priority={item.priority}
                estSteelValue={item.estSteelValue}
                steelValueConfidence={item.steelValueConfidence}
                steelStart={item.steelStart}
                steelStartRelative={item.steelStartRelative}
                nearestPlant={item.nearestPlant}
                plantDistance={item.plantDistance}
                sourceName={item.sourceName}
                publishedDate={item.publishedDate}
                sourceArticleUrl={item.sourceArticleUrl}
                reasoningSteps={item.reasoningSteps}
              />
            ))
            : activeTab === "tender-wins"
              ? tenderWinsTenders.map((tender, index) => (
                <TenderCard
                  key={index}
                  {...tender}
                  cardVariant="tender-wins"
                />
              ))
              : tenders.map((tender, index) => (
                <TenderCard
                  key={index}
                  {...tender}
                  cardVariant="tender-discovery"
                />
              ))
          }
        </div>
      </SidebarInset>
    </div>
  )
}

export default function Home() {
  const [activeTab, setActiveTab] = React.useState("tender-discovery")

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col">
      <AppHeader activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 overflow-hidden">
        <SidebarProvider className="h-full">
          <DashboardContent activeTab={activeTab} />
        </SidebarProvider>
      </div>
    </div>
  )
}
