"use client"

import * as React from "react"
import { SidebarProvider, SidebarInset, useSidebar } from "@/components/ui/sidebar"
import { FiltersSidebar } from "@/components/filters-sidebar"
import { AppHeader } from "@/components/app-header"
import { ActiveFilters } from "@/components/active-filters"
import { TenderCard } from "@/components/tender-card"
import { initialFilters, tenderWinsFilters, privateNewsFilters, type FilterSection } from "@/data/filters"
import { privateNewsTenders } from "@/data/tenders"
import { useTenderDiscovery, useTenderWins } from "@/hooks/useTenders"
import type { TenderData } from "@/data/tenders"

function getFiltersForTab(tab: string): FilterSection[] {
  if (tab === "tender-wins") return tenderWinsFilters
  if (tab === "private-news") return privateNewsFilters
  return initialFilters
}

function TenderCardSkeleton() {
  return (
    <div className="border rounded-xl overflow-hidden bg-white animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px]">
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-xl" />
            <div className="space-y-2">
              <div className="h-4 w-48 bg-gray-200 rounded" />
              <div className="h-3 w-32 bg-gray-100 rounded" />
            </div>
          </div>
          <div className="h-5 w-3/4 bg-gray-200 rounded" />
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-1">
                <div className="h-3 w-20 bg-gray-100 rounded" />
                <div className="h-4 w-36 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
        <div className="border-l bg-gray-50 p-5 space-y-4">
          <div className="h-24 bg-gray-200 rounded-xl" />
          <div className="h-4 w-28 bg-gray-100 rounded" />
          <div className="h-8 w-36 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="border-t bg-gray-50 px-5 py-4">
        <div className="h-9 w-32 bg-gray-200 rounded-xl" />
      </div>
    </div>
  )
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="mx-8 mt-4 p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm flex items-center gap-2">
      <span>⚠️</span>
      <span>
        Could not load live data from API: <strong>{message}</strong>. Check that the Django server is running at{" "}
        <code className="bg-red-100 px-1 rounded">localhost:8000</code>.
      </span>
    </div>
  )
}

function EmptyState({ tab }: { tab: string }) {
  const label =
    tab === "tender-wins"
      ? "No tender wins found where both AI evaluation steps are completed and recommended."
      : "No tenders found where all 4 AI evaluation steps passed."

  return (
    <div className="mx-8 mt-8 p-10 rounded-2xl border-2 border-dashed border-gray-200 text-center text-gray-500">
      <div className="text-4xl mb-3">✅</div>
      <p className="font-semibold text-gray-700 mb-1">We're good to go — nothing pending!</p>
      <p className="text-sm">{label}</p>
      <p className="text-xs mt-2 text-gray-400">
        Tenders appear here only after all AI evaluation steps have passed.
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Tender Discovery cards (all 4 steps passed)
// ---------------------------------------------------------------------------
function TenderDiscoveryList() {
  const { data, loading, error } = useTenderDiscovery()

  if (loading) {
    return (
      <div className="pt-6 px-8 pb-0 space-y-7">
        {[1, 2, 3].map((i) => <TenderCardSkeleton key={i} />)}
      </div>
    )
  }

  if (error) {
    return <ErrorBanner message={error} />
  }

  if (!data.length) {
    return <EmptyState tab="tender-discovery" />
  }

  return (
    <div className="pt-6 px-8 pb-0 space-y-7">
      {data.map((tender, index) => (
        <TenderCard
          key={tender.id || index}
          cardVariant="tender-discovery"
          winningCompany={tender.winningCompany}
          location={tender.location}
          date={tender.date}
          status={tender.status}
          title={tender.title}
          requirements={tender.requirements}
          leadScore={tender.leadScore}
          leadProbability={tender.leadProbability}
          totalValue={tender.totalValue}
          valueSource={tender.valueSource}
          deadline={tender.deadline}
          daysLeft={tender.daysLeft}
          nearestSupply={tender.nearestSupply}
          logisticsDetail={tender.logisticsDetail}
          sourcePortal={tender.sourcePortal}
          quote={tender.quote}
          aiAction={tender.aiAction}
          contractValue={tender.contractValue}
          reasoningSteps={tender.reasoningSteps}
        />
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Tender Wins cards (2-step recommended)
// ---------------------------------------------------------------------------
function TenderWinsList() {
  const { data, loading, error } = useTenderWins()

  if (loading) {
    return (
      <div className="pt-6 px-8 pb-0 space-y-7">
        {[1, 2].map((i) => <TenderCardSkeleton key={i} />)}
      </div>
    )
  }

  if (error) {
    return <ErrorBanner message={error} />
  }

  if (!data.length) {
    return <EmptyState tab="tender-wins" />
  }

  return (
    <div className="pt-6 px-8 pb-0 space-y-7">
      {data.map((tender: TenderData, index: number) => (
        <TenderCard
          key={tender.id || index}
          cardVariant="tender-wins"
          winningCompany={tender.winningCompany}
          location={tender.location}
          date={tender.date}
          status={tender.status}
          title={tender.title}
          requirements={tender.requirements}
          leadScore={tender.leadScore}
          leadProbability={tender.leadProbability}
          totalValue={tender.totalValue}
          valueSource={tender.valueSource}
          deadline={tender.deadline}
          daysLeft={tender.daysLeft}
          nearestSupply={tender.nearestSupply}
          logisticsDetail={tender.logisticsDetail}
          sourcePortal={tender.sourcePortal}
          quote={tender.quote}
          aiAction={tender.aiAction}
          contractValue={tender.contractValue}
        />
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Dashboard Content
// ---------------------------------------------------------------------------
function DashboardContent({ activeTab }: { activeTab: string }) {
  const { toggleSidebar } = useSidebar()
  const [filters, setFilters] = React.useState<FilterSection[]>(() => getFiltersForTab(activeTab))

  React.useEffect(() => {
    setFilters(getFiltersForTab(activeTab))
  }, [activeTab])

  const handleCheckboxChange = (sectionId: string, optionId: string, checked: boolean) => {
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
        options: section.options.map((option) => ({ ...option, checked: false })),
      }))
    )
  }

  const removeFilter = (sectionId: string, optionId: string) => {
    handleCheckboxChange(sectionId, optionId, false)
  }

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

        {/* Private News: still uses static mock data */}
        {activeTab === "private-news" ? (
          <div className="pt-6 px-8 pb-0 space-y-7">
            {privateNewsTenders.map((item, index) => (
              <TenderCard
                key={index}
                cardVariant="private-news"
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
            ))}
          </div>
        ) : activeTab === "tender-wins" ? (
          <TenderWinsList />
        ) : (
          <TenderDiscoveryList />
        )}
      </SidebarInset>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page Root
// ---------------------------------------------------------------------------
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
