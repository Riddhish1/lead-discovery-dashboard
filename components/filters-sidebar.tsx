"use client"

import * as React from "react"
import { Search, X } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
} from "@/components/ui/sidebar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { FilterSection } from "@/data/filters"

interface FiltersSidebarProps {
  filters: FilterSection[]
  onCheckboxChange: (sectionId: string, optionId: string, checked: boolean) => void
  onClearAll: () => void
}

// Per-section local state for range/date/search values
interface SectionState {
  min?: string
  max?: string
  sort?: string
  search?: string
  fromDate?: string
  toDate?: string
}

export function FiltersSidebar({ filters, onCheckboxChange, onClearAll }: FiltersSidebarProps) {
  const [sectionState, setSectionState] = React.useState<Record<string, SectionState>>({})

  const updateSection = (id: string, patch: Partial<SectionState>) => {
    setSectionState((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }))
  }

  const applyFilters = () => {
    // future implementation
  }

  const handleClearAll = () => {
    setSectionState({})
    onClearAll()
  }

  // Check if a sub-filter's parent option is selected
  const isParentSelected = (section: FilterSection) => {
    if (!section.isSubFilter || !section.parentId || !section.parentOptionId) return true
    const parent = filters.find((f) => f.id === section.parentId)
    if (!parent) return false
    return parent.options.some((o) => o.id === section.parentOptionId && o.checked)
  }

  const renderCheckbox = (section: FilterSection) => {
    const state = sectionState[section.id] || {}
    const currentSort = state.sort ?? section.defaultSort ?? (section.sortOptions?.[0] || "")

    return (
      <div className="space-y-2.5">
        <div className="space-y-2 px-2">
          {section.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={`${section.id}-${option.id}`}
                checked={option.checked}
                onCheckedChange={(checked) =>
                  onCheckboxChange(section.id, option.id, checked as boolean)
                }
              />
              <Label
                htmlFor={`${section.id}-${option.id}`}
                className="text-sm font-normal cursor-pointer leading-none"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
        {section.sortOptions && section.sortOptions.length > 0 && (
          <div className="px-2">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1.5 font-medium">Sort</p>
            <div className="flex flex-wrap gap-1.5">
              {section.sortOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => updateSection(section.id, { sort: opt })}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                    currentSort === opt
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderSearchableMulti = (section: FilterSection) => {
    const state = sectionState[section.id] || {}
    const query = state.search || ""
    const filtered = section.options.filter((o) =>
      o.label.toLowerCase().includes(query.toLowerCase())
    )
    const selected = section.options.filter((o) => o.checked)

    return (
      <div className="px-2 space-y-2">
        {/* Selected tags */}
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-1">
            {selected.map((o) => (
              <span
                key={o.id}
                className="flex items-center gap-1 text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 rounded px-2 py-0.5"
              >
                {o.label}
                <button
                  onClick={() => onCheckboxChange(section.id, o.id, false)}
                  className="hover:text-indigo-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 " />
          <Input
            value={query}
            onChange={(e) => updateSection(section.id, { search: e.target.value })}
            placeholder="Search..."
            className="h-8 pl-7 text-sm"
          />
        </div>
        {/* Options list */}
        <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300">
          {filtered.length === 0 ? (
            <p className="text-xs text-muted-foreground px-1">No results</p>
          ) : (
            filtered.map((option) => (
              <div key={option.id} className="flex items-center space-x-2 py-0.5">
                <Checkbox
                  id={`${section.id}-${option.id}`}
                  checked={option.checked}
                  onCheckedChange={(checked) =>
                    onCheckboxChange(section.id, option.id, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`${section.id}-${option.id}`}
                  className="text-sm font-normal cursor-pointer leading-none"
                >
                  {option.label}
                </Label>
              </div>
            ))
          )}
        </div>
      </div>
    )
  }

  const renderRange = (section: FilterSection) => {
    const state = sectionState[section.id] || {}
    const currentSort = state.sort ?? section.defaultSort ?? (section.sortOptions?.[0] || "")

    return (
      <div className="px-2 space-y-3">
        {/* Min / Max inputs */}
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-medium">
              {section.minLabel || "Min"}
            </p>
            <Input
              type="number"
              placeholder="—"
              value={state.min || ""}
              onChange={(e) => updateSection(section.id, { min: e.target.value })}
              className="h-8 text-sm"
            />
          </div>
          <span className="text-gray-400 mt-5">→</span>
          <div className="flex-1">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-medium">
              {section.maxLabel || "Max"}
            </p>
            <Input
              type="number"
              placeholder="—"
              value={state.max || ""}
              onChange={(e) => updateSection(section.id, { max: e.target.value })}
              className="h-8 text-sm"
            />
          </div>
        </div>
        {/* Sort pills */}
        {section.sortOptions && section.sortOptions.length > 0 && (
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1.5 font-medium">Sort</p>
            <div className="flex flex-wrap gap-1.5">
              {section.sortOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => updateSection(section.id, { sort: opt })}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                    currentSort === opt
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderDateRange = (section: FilterSection) => {
    const state = sectionState[section.id] || {}
    const currentSort = state.sort ?? section.defaultSort ?? (section.sortOptions?.[0] || "")

    return (
      <div className="px-2 space-y-3">
        {/* From date */}
        <div>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-medium">
            {section.minLabel || "From"}
          </p>
          <Input
            type="date"
            value={state.fromDate || ""}
            onChange={(e) => updateSection(section.id, { fromDate: e.target.value })}
            className="h-8 text-sm"
          />
        </div>
        {/* To date */}
        <div>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-medium">
            {section.maxLabel || "To"}
          </p>
          <Input
            type="date"
            value={state.toDate || ""}
            onChange={(e) => updateSection(section.id, { toDate: e.target.value })}
            className="h-8 text-sm"
          />
        </div>
        {/* Sort pills */}
        {section.sortOptions && section.sortOptions.length > 0 && (
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1.5 font-medium">Sort</p>
            <div className="flex flex-wrap gap-1.5">
              {section.sortOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => updateSection(section.id, { sort: opt })}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                    currentSort === opt
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderSectionContent = (section: FilterSection) => {
    const type = section.type ?? "checkbox"

    switch (type) {
      case "searchable-multi":
        return renderSearchableMulti(section)
      case "range":
        return renderRange(section)
      case "date-range":
        return renderDateRange(section)
      default:
        if (section.options.length === 0) {
          return <p className="px-2 text-sm text-muted-foreground">No options available</p>
        }
        return renderCheckbox(section)
    }
  }

  const visibleFilters = filters.filter((s) => !s.isSubFilter)

  return (
    <Sidebar collapsible="offcanvas" className="border-r bg-white">
      <SidebarHeader className="border-b px-4 py-3 shrink-0">
        <h2 className="text-lg font-bold">Filters</h2>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4 overflow-y-auto scrollbar-hide">
        <SidebarGroup className="p-0">
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={["type-of-steel", "type-of-client", "winning-company"]}
          >
            {visibleFilters.map((section) => {
              // Find sub-filters that belong to this section
              const subFilters = filters.filter(
                (s) => s.isSubFilter && s.parentId === section.id
              )

              return (
                <AccordionItem key={section.id} value={section.id}>
                  <AccordionTrigger className="px-2 text-sm font-medium hover:no-underline">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent className="pb-3">
                    {renderSectionContent(section)}

                    {/* Sub-filters: rendered inline below parent content */}
                    {subFilters.map((sub) =>
                      isParentSelected(sub) ? (
                        <div key={sub.id} className="mt-3 mx-2">
                          <div className="rounded-md border border-indigo-100 bg-indigo-50/40 overflow-hidden">
                            <div className="flex items-center gap-2 px-3 py-2 border-b border-indigo-100 bg-indigo-50">
                              <div className="w-1 h-3.5 rounded-full bg-indigo-400 shrink-0" />
                              <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                                {sub.title}
                              </span>
                            </div>
                            <div className="px-1 py-2">
                              {renderSectionContent(sub)}
                            </div>
                          </div>
                        </div>
                      ) : null
                    )}
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4 shrink-0">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleClearAll}
          >
            Clear All
          </Button>
          <Button
            className="flex-1 bg-black hover:bg-black/90 text-white"
            onClick={applyFilters}
          >
            Apply Filters
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
