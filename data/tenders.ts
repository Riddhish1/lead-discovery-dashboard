export interface TenderRequirement {
  category: string
  detail: string
}

export interface TenderData {
  organization: string
  location: string
  date: string
  status: string
  statusVariant?: string
  title: string
  requirements: TenderRequirement[]
  leadScore: number
  leadProbability: string
  totalValue: string
  valueSource: string
  deadline: string
  daysLeft: number
  logistics: string
  logisticsDetail: string
  sourcePortal: string
  additionalBadge?: string
  quote: string
  aiAction: string
}

export const tenders: TenderData[] = [
  {
    organization: "M.P. Power Generating Co. Ltd. (MPPGCL)",
    location: "Jabalpur, M.P.",
    date: "09 Feb 2026",
    status: "Open Bidding",
    statusVariant: "default",
    title: "Supply of Chequered Plates, Corten Plates & Stainless Steel Plates required for various Thermal Power Stations of MPPGCL",
    requirements: [
      {
        category: "PRODUCT ELIGIBILITY CHECKED",
        detail: "IS3502 chequered plates required"
      },
      {
        category: "SPECIFICATION COMPLIANCE CHECKED",
        detail: "Corten & HR plates match JSW grades"
      },
      {
        category: "PLANT CAPABILITY CHECKED",
        detail: "Vijayanagar produces ≥10 mm chequered"
      },
      {
        category: "COMMERCIAL ELIGIBILITY CHECKED",
        detail: "No PQR exclusions for JSW"
      },
      {
        category: "LOGISTICS FEASIBILITY CHECKED",
        detail: "Rail + truck 1200 km route"
      },
      {
        category: "TIMELINE FEASIBILITY CHECKED",
        detail: "90-day delivery achievable"
      }
    ],
    leadScore: 74,
    leadProbability: "Moderate Probability",
    totalValue: "₹5.5 Cr",
    valueSource: "Inferred from EMD 3%",
    deadline: "02 March, 2026",
    daysLeft: 20,
    logistics: "1200 km",
    logisticsDetail: "Rail+Truck",
    sourcePortal: "MP Tenders Portal",
    quote: "Product & PSU fit is strong, logistics manageable.",
    aiAction: "AI Reasoning"
  },
  {
    organization: "National Highways Authority of India",
    location: "Kolkata, West Bengal",
    date: "Feb 15, 2026",
    status: "Pre-Bid Meeting",
    statusVariant: "default",
    title: "TMT bars and structural steel for highway expansion project - Phase 2",
    requirements: [
      {
        category: "STEEL REQUIRED",
        detail: "TMT 500D bars, 16mm & 20mm dia"
      },
      {
        category: "SUPPLY CAPABILITY",
        detail: "JSW Dolvi plant 8km away, 15kt capacity"
      },
      {
        category: "COMPETITION RISK",
        detail: "Low - We supplied Phase 1"
      },
      {
        category: "MARGIN ESTIMATE",
        detail: "Est. margin 14-16%"
      }
    ],
    leadScore: 92,
    leadProbability: "Moderate Probability",
    totalValue: "₹2.8cr",
    valueSource: "calculated from BOQ",
    deadline: "Feb 25, 2026",
    daysLeft: 5,
    logistics: "8 km",
    logisticsDetail: "Truck",
    sourcePortal: "NHAI Portal",
    additionalBadge: "Full BOQ",
    quote: "Excellent win probability. We have existing relationship from Phase 1 and superior logistics position.",
    aiAction: "AI Reasoning"
  },
  {
    organization: "Bharat Heavy Electricals Limited",
    location: "Ranipet, Tamil Nadu",
    date: "Feb 10, 2026",
    status: "Technical Evaluation",
    statusVariant: "default",
    title: "High-grade alloy steel sheets for turbine manufacturing - Precision specs",
    requirements: [
      {
        category: "STEEL REQUIRED",
        detail: "Custom alloy steel, 2mm sheets"
      },
      {
        category: "SUPPLY CAPABILITY",
        detail: "Non-standard grade, requires mill modification"
      },
      {
        category: "COMPETITION RISK",
        detail: "SAIL has existing contract"
      },
      {
        category: "MARGIN ESTIMATE",
        detail: "Est. margin 4-6% (after tooling cost)"
      }
    ],
    leadScore: 45,
    leadProbability: "Moderate Probability",
    totalValue: "₹0.6cr",
    valueSource: "stated in tender",
    deadline: "Mar 28, 2026",
    daysLeft: 39,
    logistics: "980 km",
    logisticsDetail: "Rail",
    sourcePortal: "BHEL Procurement",
    quote: "Moderate risk. Non-standard specification requires special tooling investment.",
    aiAction: "AI Reasoning"
  },
  {
    organization: "Indian Railways - Eastern Railway",
    location: "Patna, Bihar",
    date: "Feb 14, 2026",
    status: "Open Bidding",
    statusVariant: "default",
    title: "Rail tracks and fishplates for track modernization - 45km stretch",
    requirements: [
      {
        category: "STEEL REQUIRED",
        detail: "880 grade steel rails, 52kg/m"
      },
      {
        category: "SUPPLY CAPABILITY",
        detail: "JSW Rail Mill operational, 20kt ready"
      },
      {
        category: "COMPETITION RISK",
        detail: "Medium - Jindal also qualified bidder"
      },
      {
        category: "MARGIN ESTIMATE",
        detail: "Est. margin 11-13%"
      }
    ],
    leadScore: 85,
    leadProbability: "Moderate Probability",
    totalValue: "₹4.2Cr",
    valueSource: "from detailed BOQ",
    deadline: "Mar 05, 2026",
    daysLeft: 16,
    logistics: "650 km",
    logisticsDetail: "Rail",
    sourcePortal: "IREPS",
    additionalBadge: "BOQ Available",
    quote: "Strong win probability. Railway projects align with JSW strategic focus.",
    aiAction: "AI Reasoning"
  }
]
