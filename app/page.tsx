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
function AllTendersList() {
  const [page, setPage] = React.useState(1)
  const { data, loading, error, totalPages } = useAllTenders(page)

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
function FailedEvaluationsList() {
  const [page, setPage] = React.useState(1)
  const { data, loading, error, totalPages } = useFailedEvaluations(page)

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
// Tender Discovery cards (all 4 steps passed)
// ---------------------------------------------------------------------------
function TenderDiscoveryList() {
  const [page, setPage] = React.useState(1)
  const { data, loading, error, totalPages } = useTenderDiscovery(page) // Pagination not yet heavily needed but ready

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
function TenderWinsList() {
  const [page, setPage] = React.useState(1)
  const { data, loading, error, totalPages } = useTenderWins(page)

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

        {activeTab === "private-news" ? (
          <div className="pt-6 px-8 pb-0 space-y-7">
            {privateNewsTenders.map((item, index) => (
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
          <TenderWinsList />
        ) : activeTab === "all-tenders" ? (
          <AllTendersList />
        ) : activeTab === "failed-evaluations" ? (
          <FailedEvaluationsList />
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
