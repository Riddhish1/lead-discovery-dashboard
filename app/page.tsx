"use client"

import * as React from "react"
import { AppHeader } from "@/components/app-header"
import { ActiveFilters } from "@/components/active-filters"
import { TenderCard, TenderCardSkeleton } from "@/components/tender-card"
import { ErrorBanner } from "@/components/error-banner"
import { EmptyState } from "@/components/empty-state"
import { initialFilters, tenderWinsFilters, privateNewsFilters, type FilterSection } from "@/data/filters"
import { privateNewsTenders } from "@/data/tenders"
import { SidebarProvider, SidebarInset, useSidebar } from "@/components/ui/sidebar"
import { FiltersSidebar } from "@/components/filters-sidebar"
import { useTenderDiscovery, useTenderWins, useAllTenders, useFailedEvaluations } from "@/hooks/useTenders"
import { useDebounce } from "@/hooks/useDebounce"
import { PaginationControls } from "@/components/pagination-controls"
import type { TenderData } from "@/data/tenders"

function getFiltersForTab(tab: string): FilterSection[] {
  if (tab === "tender-wins") return tenderWinsFilters
  if (tab === "private-news") return privateNewsFilters
  return initialFilters
}


// ---------------------------------------------------------------------------
// All Tenders (Raw data before evaluation)
// ---------------------------------------------------------------------------
function AllTendersList({ searchQuery = "" }: { searchQuery?: string }) {
  const [page, setPage] = React.useState(1)
  // Reset to page 1 whenever the search query changes
  React.useEffect(() => { setPage(1) }, [searchQuery])
  const { data: rawData, loading, error, totalPages } = useAllTenders(page, searchQuery)

  // Client-side fallback: filter the loaded page in case the backend
  // doesn't have SearchFilter enabled on this endpoint
  const data = React.useMemo(() => {
    if (!searchQuery.trim()) return rawData
    const q = searchQuery.toLowerCase()
    return rawData.filter(t =>
      t.title?.toLowerCase().includes(q) ||
      t.winningCompany?.toLowerCase().includes(q) ||
      t.location?.toLowerCase().includes(q)
    )
  }, [rawData, searchQuery])

  if (loading && data.length === 0) {
    return (
      <div className="pt-6 px-8 pb-0 space-y-7">
        {[1, 2, 3].map((i) => <TenderCardSkeleton key={i} />)}
      </div>
    )
  }

  if (error) {
    return <ErrorBanner message={error} />
  }

  if (!data.length && !loading) {
    return <EmptyState tab="all-tenders" />
  }

  return (
    <div className="flex flex-col h-full">
      <div className="pt-6 px-8 pb-0 space-y-7 flex-1">
        {data.map((tender, index) => (
          <TenderCard
            key={tender.id || index}
            id={tender.id}
            cardVariant="private-news"
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
      <PaginationControls
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        isLoading={loading}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Failed Evaluations (Tenders that failed an AI step)
// ---------------------------------------------------------------------------
function FailedEvaluationsList({ searchQuery = "" }: { searchQuery?: string }) {
  const [page, setPage] = React.useState(1)
  React.useEffect(() => { setPage(1) }, [searchQuery])
  const { data: rawData, loading, error, totalPages } = useFailedEvaluations(page, searchQuery)

  const data = React.useMemo(() => {
    if (!searchQuery.trim()) return rawData
    const q = searchQuery.toLowerCase()
    return rawData.filter(t =>
      t.title?.toLowerCase().includes(q) ||
      t.winningCompany?.toLowerCase().includes(q) ||
      t.location?.toLowerCase().includes(q)
    )
  }, [rawData, searchQuery])

  if (loading && data.length === 0) {
    return (
      <div className="pt-6 px-8 pb-0 space-y-7">
        {[1, 2].map((i) => <TenderCardSkeleton key={i} />)}
      </div>
    )
  }

  if (error) {
    return <ErrorBanner message={error} />
  }

  if (!data.length && !loading) {
    return <EmptyState tab="failed-evaluations" />
  }

  return (
    <div className="flex flex-col h-full">
      <div className="pt-6 px-8 pb-0 space-y-7 flex-1">
        {data.map((tender, index) => (
          <TenderCard
            key={tender.id || index}
            id={tender.id}
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
          />
        ))}
      </div>
      <PaginationControls
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        isLoading={loading}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Tender Discovery cards (all 4 steps passed)
// ---------------------------------------------------------------------------
function TenderDiscoveryList({ searchQuery = "" }: { searchQuery?: string }) {
  const [page, setPage] = React.useState(1)
  React.useEffect(() => { setPage(1) }, [searchQuery])  
  const { data: rawData, loading, error, totalPages } = useTenderDiscovery(page, searchQuery)

  const data = React.useMemo(() => {
    if (!searchQuery.trim()) return rawData
    const q = searchQuery.toLowerCase()
    return rawData.filter(t =>
      t.title?.toLowerCase().includes(q) ||
      t.winningCompany?.toLowerCase().includes(q) ||
      t.location?.toLowerCase().includes(q)
    )
  }, [rawData, searchQuery])

  if (loading && data.length === 0) {
    return (
      <div className="pt-6 px-8 pb-0 space-y-7">
        {[1, 2, 3].map((i) => <TenderCardSkeleton key={i} />)}
      </div>
    )
  }

  if (error) {
    return <ErrorBanner message={error} />
  }

  if (!data.length && !loading) {
    return <EmptyState tab="tender-discovery" />
  }

  return (
    <div className="flex flex-col h-full">
      <div className="pt-6 px-8 pb-0 space-y-7 flex-1">
        {data.map((tender, index) => (
          <TenderCard
            key={tender.id || index}
            id={tender.id}
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
      <PaginationControls
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        isLoading={loading}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Tender Wins cards (2-step recommended)
// ---------------------------------------------------------------------------
function TenderWinsList({ searchQuery = "" }: { searchQuery?: string }) {
  const [page, setPage] = React.useState(1)
  React.useEffect(() => { setPage(1) }, [searchQuery])
  const { data: rawData, loading, error, totalPages } = useTenderWins(page, searchQuery)

  const data = React.useMemo(() => {
    if (!searchQuery.trim()) return rawData
    const q = searchQuery.toLowerCase()
    return rawData.filter(t =>
      t.title?.toLowerCase().includes(q) ||
      t.winningCompany?.toLowerCase().includes(q) ||
      t.location?.toLowerCase().includes(q)
    )
  }, [rawData, searchQuery])

  if (loading && data.length === 0) {
    return (
      <div className="pt-6 px-8 pb-0 space-y-7">
        {[1, 2, 3, 4].map((i) => <TenderCardSkeleton key={i} />)}
      </div>
    )
  }

  if (error) {
    return <ErrorBanner message={error} />
  }

  if (!data.length && !loading) {
    return <EmptyState tab="tender-wins" />
  }

  return (
    <div className="flex flex-col h-full">
      <div className="pt-6 px-8 pb-0 space-y-7 flex-1">
        {data.map((tender, index) => (
          <TenderCard
            key={tender.id || index}
            id={tender.id}
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
      <PaginationControls
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        isLoading={loading}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Dashboard Content
// ---------------------------------------------------------------------------
function DashboardContent({ activeTab, searchQuery }: { activeTab: string; searchQuery: string }) {
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

        {activeTab === "private-news" ? (
          <div className="pt-6 px-8 pb-0 space-y-7">
            {privateNewsTenders
              .filter(item => {
                if (!searchQuery.trim()) return true
                const q = searchQuery.toLowerCase()
                return (
                  item.title?.toLowerCase().includes(q) ||
                  item.winningCompany?.toLowerCase().includes(q)
                )
              })
              .map((item, index) => (
              <TenderCard
                key={index}
                id={item.id}
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
          <TenderWinsList searchQuery={searchQuery} />
        ) : activeTab === "all-tenders" ? (
          <AllTendersList searchQuery={searchQuery} />
        ) : activeTab === "failed-evaluations" ? (
          <FailedEvaluationsList searchQuery={searchQuery} />
        ) : (
          <TenderDiscoveryList searchQuery={searchQuery} />
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
  const [searchQuery, setSearchQuery] = React.useState("")
  // Debounce: only fire a new API request 400ms after the user stops typing
  const debouncedSearch = useDebounce(searchQuery, 400)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setSearchQuery("")
  }

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col">
      <AppHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <div className="flex-1 overflow-hidden">
        <SidebarProvider className="h-full">
          <DashboardContent activeTab={activeTab} searchQuery={debouncedSearch} />
        </SidebarProvider>
      </div>
    </div>
  )
}
