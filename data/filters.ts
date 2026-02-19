export interface FilterOption {
  id: string
  label: string
  checked: boolean
}

export type FilterType =
  | "checkbox"
  | "searchable-multi"
  | "range"
  | "date-range"

export interface FilterSection {
  id: string
  title: string
  type?: FilterType
  options: FilterOption[]
  // range / date-range
  minLabel?: string
  maxLabel?: string
  sortOptions?: string[]
  defaultSort?: string
  // sub-filter (shown only when parent option is selected)
  isSubFilter?: boolean
  parentId?: string
  parentOptionId?: string
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

export const tenderWinsFilters: FilterSection[] = [
  {
    id: "winning-company",
    title: "Winning Company",
    type: "searchable-multi",
    options: [
      { id: "lt", label: "L&T", checked: false },
      { id: "afcon", label: "Afcon Infrastructure", checked: false },
      { id: "pnc", label: "PNC Infratech", checked: false },
      { id: "dilip", label: "Dilip Buildcon", checked: false },
      { id: "kec", label: "KEC International", checked: false },
    ],
  },
  {
    id: "type-of-steel",
    title: "Type of Steel",
    type: "checkbox",
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
    id: "client-type",
    title: "Client Type",
    type: "checkbox",
    options: [
      { id: "psu", label: "PSU", checked: false },
      { id: "central-govt", label: "Central Govt", checked: false },
      { id: "state-govt", label: "State Govt", checked: false },
      { id: "autonomous-bodies", label: "Autonomous Bodies", checked: false },
      { id: "govt-institutions", label: "Govt Institutions", checked: false },
    ],
  },
  {
    id: "steel-deal-value",
    title: "Steel Deal Value (INR)",
    type: "range",
    options: [],
    minLabel: "Min",
    maxLabel: "Max",
    sortOptions: ["High to Low", "Low to High"],
    defaultSort: "High to Low",
  },
  {
    id: "quantity",
    title: "Quantity (MT)",
    type: "range",
    options: [],
    minLabel: "Min",
    maxLabel: "Max",
    sortOptions: ["High to Low", "Low to High"],
    defaultSort: "High to Low",
  },
  {
    id: "boq-availability",
    title: "BOQ Availability",
    type: "checkbox",
    options: [
      { id: "all", label: "All", checked: false },
      { id: "no-boq", label: "No BOQ", checked: false },
      { id: "with-boq", label: "With BOQ", checked: false },
    ],
  },
  {
    id: "steel-calculation-method",
    title: "Steel Calculation Method",
    type: "checkbox",
    isSubFilter: true,
    parentId: "boq-availability",
    parentOptionId: "with-boq",
    options: [
      { id: "explicit", label: "Explicit", checked: false },
      { id: "implicit", label: "Implicit", checked: false },
      { id: "hybrid", label: "Hybrid", checked: false },
    ],
  },
  {
    id: "awarding-authority",
    title: "Awarding Authority",
    type: "checkbox",
    options: [
      { id: "indian-railways", label: "Indian Railways", checked: false },
      { id: "nhai", label: "NHAI", checked: false },
      { id: "bhel", label: "BHEL", checked: false },
      { id: "ntpc", label: "NTPC", checked: false },
      { id: "ongc", label: "ONGC", checked: false },
      { id: "iocl", label: "IOCL", checked: false },
    ],
  },
  {
    id: "lead-propensity",
    title: "Lead Propensity",
    type: "range",
    options: [],
    minLabel: "Min Score",
    maxLabel: "Max Score",
    sortOptions: ["High to Low"],
    defaultSort: "High to Low",
  },
  {
    id: "customer-crm-status",
    title: "Customer CRM Status",
    type: "checkbox",
    options: [
      { id: "all", label: "All", checked: false },
      { id: "existing-customer", label: "Existing Customer", checked: false },
      { id: "new-customer", label: "New Customer", checked: false },
    ],
  },
  {
    id: "steel-delivery-urgency",
    title: "Steel Delivery Urgency",
    type: "checkbox",
    options: [
      { id: "lt-30", label: "< 30 Days", checked: false },
      { id: "30-60", label: "30–60 Days", checked: false },
      { id: "60-120", label: "60–120 Days", checked: false },
      { id: "gt-120", label: "> 120 Days", checked: false },
    ],
  },
  {
    id: "go-no-go",
    title: "GO / NO-GO Decision",
    type: "checkbox",
    options: [
      { id: "all", label: "All", checked: false },
      { id: "go", label: "GO", checked: false },
      { id: "no-go", label: "NO-GO", checked: false },
      { id: "pending", label: "Pending", checked: false },
    ],
  },
  {
    id: "contract-age",
    title: "Contract Age",
    type: "checkbox",
    options: [
      { id: "0-7", label: "0–7 Days", checked: false },
      { id: "8-30", label: "8–30 Days", checked: false },
      { id: "31-60", label: "31–60 Days", checked: false },
      { id: "gt-60", label: "> 60 Days", checked: false },
    ],
  },
  {
    id: "location",
    title: "Location",
    type: "checkbox",
    options: [],
  },
  {
    id: "data-source",
    title: "Data Source",
    type: "checkbox",
    options: [
      { id: "gem", label: "GeM", checked: false },
      { id: "cppp", label: "CPPP", checked: false },
      { id: "psu-website", label: "PSU Website", checked: false },
      { id: "state-portals", label: "State Portals", checked: false },
      { id: "govttenders", label: "GovtTenders.in", checked: false },
    ],
  },
  {
    id: "award-date-range",
    title: "Award Date Range",
    type: "date-range",
    options: [],
    minLabel: "Award Date From",
    maxLabel: "Award Date To",
    sortOptions: ["Latest First", "Earliest First"],
    defaultSort: "Latest First",
  },
]

export const privateNewsFilters: FilterSection[] = [
  {
    id: "source",
    title: "Source",
    type: "searchable-multi",
    options: [
      { id: "et-realty", label: "ET Realty", checked: false },
      { id: "construction-week", label: "Construction Week", checked: false },
      { id: "metro-rail-guy", label: "Metro Rail Guy", checked: false },
      { id: "business-standard", label: "Business Standard", checked: false },
      { id: "hindu-businessline", label: "Hindu BusinessLine", checked: false },
      { id: "toi-infra", label: "Times of India Infra", checked: false },
      { id: "financial-express", label: "Financial Express", checked: false },
      { id: "moneycontrol", label: "Moneycontrol", checked: false },
    ],
  },
  {
    id: "steel-delivery-timeline",
    title: "Steel Delivery Timeline",
    type: "checkbox",
    options: [
      { id: "within-6m", label: "Within 6 months", checked: false },
      { id: "6-12m", label: "6–12 months", checked: false },
      { id: "12-24m", label: "12–24 months", checked: false },
      { id: "beyond-24m", label: "Beyond 24 months", checked: false },
      { id: "unknown", label: "Unknown", checked: false },
    ],
    sortOptions: ["Earliest First", "Latest First"],
    defaultSort: "Earliest First",
  },
  {
    id: "est-steel-value",
    title: "Est. Steel Value (₹ Cr)",
    type: "range",
    options: [],
    minLabel: "Min",
    maxLabel: "Max",
    sortOptions: ["High to Low", "Low to High"],
    defaultSort: "High to Low",
  },
  {
    id: "lead-propensity-score",
    title: "Lead Propensity Score",
    type: "range",
    options: [],
    minLabel: "Min Score",
    maxLabel: "Max Score",
    sortOptions: ["High to Low"],
    defaultSort: "High to Low",
  },
  {
    id: "priority-bucket",
    title: "Priority Bucket",
    type: "checkbox",
    options: [
      { id: "high", label: "High", checked: false },
      { id: "medium", label: "Medium", checked: false },
      { id: "low", label: "Low", checked: false },
    ],
  },
  {
    id: "segment",
    title: "Segment",
    type: "checkbox",
    options: [
      { id: "infra", label: "Infra", checked: false },
      { id: "real-estate", label: "Real Estate", checked: false },
      { id: "industrial", label: "Industrial", checked: false },
      { id: "energy", label: "Energy", checked: false },
      { id: "logistics", label: "Logistics", checked: false },
      { id: "other", label: "Other", checked: false },
    ],
  },
  {
    id: "project-type",
    title: "Project Type",
    type: "searchable-multi",
    options: [
      { id: "residential", label: "Residential Real Estate", checked: false },
      { id: "commercial-office", label: "Commercial Office", checked: false },
      { id: "hospital", label: "Hospital", checked: false },
      { id: "hotel", label: "Hotel", checked: false },
      { id: "highway", label: "Highway", checked: false },
      { id: "metro", label: "Metro", checked: false },
      { id: "bridge", label: "Bridge", checked: false },
      { id: "airport", label: "Airport", checked: false },
      { id: "port", label: "Port", checked: false },
      { id: "industrial-plant", label: "Industrial Plant", checked: false },
      { id: "warehouse", label: "Warehouse", checked: false },
      { id: "data-centre", label: "Data Centre", checked: false },
      { id: "hydropower", label: "Hydropower", checked: false },
    ],
  },
  {
    id: "location",
    title: "Location",
    type: "searchable-multi",
    options: [
      { id: "maharashtra", label: "Maharashtra", checked: false },
      { id: "karnataka", label: "Karnataka", checked: false },
      { id: "tamil-nadu", label: "Tamil Nadu", checked: false },
      { id: "gujarat", label: "Gujarat", checked: false },
      { id: "telangana", label: "Telangana", checked: false },
      { id: "rajasthan", label: "Rajasthan", checked: false },
      { id: "uttar-pradesh", label: "Uttar Pradesh", checked: false },
      { id: "delhi", label: "Delhi", checked: false },
      { id: "west-bengal", label: "West Bengal", checked: false },
      { id: "odisha", label: "Odisha", checked: false },
      { id: "madhya-pradesh", label: "Madhya Pradesh", checked: false },
      { id: "andhra-pradesh", label: "Andhra Pradesh", checked: false },
    ],
  },
  {
    id: "confidence-level",
    title: "Confidence Level",
    type: "checkbox",
    options: [
      { id: "high", label: "High (≥ 70%)", checked: false },
      { id: "medium", label: "Medium (40–69%)", checked: false },
      { id: "low", label: "Low (< 40%)", checked: false },
    ],
    sortOptions: ["High to Low"],
    defaultSort: "High to Low",
  },
  {
    id: "nearest-jsw-plant",
    title: "Nearest JSW Plant",
    type: "checkbox",
    options: [
      { id: "vijayanagar", label: "Vijayanagar", checked: false },
      { id: "dolvi", label: "Dolvi", checked: false },
      { id: "salem", label: "Salem", checked: false },
      { id: "bpsl-sambalpur", label: "BPSL Sambalpur", checked: false },
      { id: "jsw-utkal", label: "JSW Utkal", checked: false },
    ],
  },
  {
    id: "published-date-range",
    title: "Published Date Range",
    type: "date-range",
    options: [],
    minLabel: "Published From",
    maxLabel: "Published To",
    sortOptions: ["Newest First", "Oldest First"],
    defaultSort: "Newest First",
  },
  {
    id: "steel-requirement-type",
    title: "Steel Requirement Type",
    type: "checkbox",
    options: [
      { id: "explicit", label: "Explicit", checked: false },
      { id: "implicit", label: "Implicit", checked: false },
    ],
  },
  {
    id: "company-developer",
    title: "Company / Developer",
    type: "searchable-multi",
    options: [
      { id: "godrej", label: "Godrej Properties", checked: false },
      { id: "lt", label: "L&T", checked: false },
      { id: "adani", label: "Adani", checked: false },
      { id: "dlf", label: "DLF", checked: false },
      { id: "tata-projects", label: "Tata Projects", checked: false },
      { id: "gmr", label: "GMR", checked: false },
    ],
  },
]
