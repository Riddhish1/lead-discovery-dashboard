export interface FilterOption {
  id: string
  label: string
  checked: boolean
}

export interface FilterSection {
  id: string
  title: string
  options: FilterOption[]
}

export const initialFilters: FilterSection[] = [
  {
    id: "type-of-steel",
    title: "Type of Steel",
    options: [
      { id: "tmt", label: "TMT", checked: false },
      { id: "flat", label: "Flat", checked: false },
      { id: "long", label: "Long", checked: false },
      { id: "electrical", label: "Electrical", checked: false },
      { id: "hr", label: "HR", checked: false },
      { id: "cr", label: "CR", checked: false },
    ],
  },
  {
    id: "type-of-client",
    title: "Type of Client",
    options: [
      { id: "psu", label: "PSU", checked: false },
      { id: "central-govt", label: "Central Govt", checked: false },
      { id: "state-govt", label: "State Govt", checked: false },
      { id: "autonomous-bodies", label: "Autonomous Bodies", checked: false },
      { id: "govt-institutions", label: "Govt Institutions", checked: false },
    ],
  },
  {
    id: "value",
    title: "Value (INR)",
    options: [],
  },
  {
    id: "quantity",
    title: "Quantity (MT)",
    options: [],
  },
  {
    id: "boq-status",
    title: "BOQ Status",
    options: [],
  },
  {
    id: "organization",
    title: "Organization",
    options: [],
  },
  {
    id: "lead-propensity",
    title: "Lead Propensity",
    options: [],
  },
  {
    id: "bid-decision",
    title: "Bid Decision",
    options: [],
  },
  {
    id: "location",
    title: "Location",
    options: [],
  },
  {
    id: "specification",
    title: "Specification",
    options: [],
  },
  {
    id: "past-sales",
    title: "Past Sales",
    options: [],
  },
  {
    id: "competition",
    title: "Competition",
    options: [],
  },
  {
    id: "source",
    title: "Source",
    options: [],
  },
  {
    id: "deadline",
    title: "Deadline",
    options: [],
  },
]
