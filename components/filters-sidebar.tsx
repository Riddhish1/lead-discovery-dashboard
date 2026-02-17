"use client"

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
import type { FilterSection } from "@/data/filters"

interface FiltersSidebarProps {
  filters: FilterSection[]
  onCheckboxChange: (sectionId: string, optionId: string, checked: boolean) => void
  onClearAll: () => void
}

export function FiltersSidebar({ filters, onCheckboxChange, onClearAll }: FiltersSidebarProps) {
  const applyFilters = () => {
    // badh meh karte hai ig 
  }

  return (
    <Sidebar collapsible="offcanvas" className="border-r">
      <SidebarHeader className="border-b px-4 py-3 shrink-0">
        <h2 className="text-base font-semibold">Filters</h2>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4 overflow-y-auto scrollbar-hide">
        <SidebarGroup className="p-0">
          <Accordion 
            type="multiple" 
            className="w-full" 
            defaultValue={["type-of-steel", "type-of-client"]}
          >            {filters.map((section) => (
              <AccordionItem key={section.id} value={section.id}>
                <AccordionTrigger className="px-2 text-sm font-medium hover:no-underline">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>
                  {section.options.length > 0 ? (
                    <div className="space-y-2 px-2">
                      {section.options.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`${section.id}-${option.id}`}
                            checked={option.checked}
                            onCheckedChange={(checked) =>
                              onCheckboxChange(
                                section.id,
                                option.id,
                                checked as boolean
                              )
                            }
                          />
                          <Label
                            htmlFor={`${section.id}-${option.id}`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-2 text-sm text-muted-foreground">
                      No options available
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4 shrink-0">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClearAll}
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
