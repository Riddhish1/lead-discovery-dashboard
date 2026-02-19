export interface TenderRequirement {
  category: string
  detail: string
}

export interface TenderData {
  winningCompany: string
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
  nearestSupply: string
  logisticsDetail: string
  sourcePortal: string
  additionalBadge?: string
  quote: string
  aiAction: string
  contractValue: number
}

export interface PrivateNewsData {
  // Card identity
  winningCompany: string        // Company / Developer name
  location: string
  title: string
  requirements: TenderRequirement[]
  quote: string
  aiAction: string
  // Lead score
  leadScore: number
  leadProbability: string
  // Private News right panel
  estSteelValue: string
  steelValueConfidence: string
  steelStart: string
  steelStartRelative: string
  nearestPlant: string
  plantDistance: string
  sourceName: string
  publishedDate: string
  sourceArticleUrl?: string
  priority: "High" | "Medium" | "Low"
}

export const privateNewsTenders: PrivateNewsData[] = [
  {
    winningCompany: "Adani Ports & SEZ Ltd.",
    location: "Mundra, Gujarat",
    title: "Adani Ports announces ₹4,200 Cr expansion of Mundra terminal — structural steel demand expected Q3 2026",
    requirements: [
      { category: "PROJECT TYPE", detail: "Port terminal expansion — berths, warehouses & rail infrastructure" },
      { category: "STEEL SIGNAL", detail: "Structural steel, HR plates & TMT bars for 3 new berths" },
      { category: "JSW PRODUCT FIT", detail: "HR Coils & Structural sections — strong grade match" },
      { category: "COMPETITION RISK", detail: "Low — JSW supplied Phase 1 Mundra expansion in 2023" },
    ],
    quote: "Early-stage signal — Adani has historically moved fast from outreach within 2 weeks.",
    aiAction: "AI Decision Logic",
    leadScore: 88,
    leadProbability: "High Probability",
    estSteelValue: "₹9.4 Cr",
    steelValueConfidence: "High confidence · AI estimated from project scope",
    steelStart: "Aug 2026",
    steelStartRelative: "In 6 months",
    nearestPlant: "Dolvi Plant",
    plantDistance: "310 km · Rail route",
    sourceName: "Economic Times",
    publishedDate: "Feb 18, 2026",
    sourceArticleUrl: "https://economictimes.indiatimes.com",
    priority: "High",
  },
  {
    winningCompany: "Prestige Estates Projects Ltd.",
    location: "Bengaluru, Karnataka",
    title: "Prestige Group launches 3.2 mn sq ft mixed-use development in Whitefield — steel procurement likely mid-2026",
    requirements: [
      { category: "PROJECT TYPE", detail: "Mixed-use real estate — towers, retail podium & parking" },
      { category: "STEEL SIGNAL", detail: "TMT 500D bars & structural columns for 42-storey towers" },
      { category: "JSW PRODUCT FIT", detail: "TMT rebars — JSW is preferred supplier for Prestige" },
      { category: "QUANTITY ESTIMATE", detail: "~18,000 MT total across 3 towers" },
    ],
    quote: "Prestige has an active JSW account coordinate with the KAM team immediately.",
    aiAction: "AI Decision Logic",
    leadScore: 76,
    leadProbability: "Moderate-High Probability",
    estSteelValue: "₹12.6 Cr",
    steelValueConfidence: "Medium confidence · estimated from floor-area ratio",
    steelStart: "Jun 2026",
    steelStartRelative: "In 4 months",
    nearestPlant: "Vijayanagar Plant",
    plantDistance: "340 km · Truck",
    sourceName: "Business Standard",
    publishedDate: "Feb 17, 2026",
    sourceArticleUrl: "https://business-standard.com",
    priority: "High",
  },
  {
    winningCompany: "NTPC Renewable Energy Ltd.",
    location: "Rajkot, Gujarat",
    title: "NTPC REL awards 900 MW solar + storage project in Rajkot — module mounting structure procurement imminent",
    requirements: [
      { category: "PROJECT TYPE", detail: "Utility-scale solar park — module mounting & cable trays" },
      { category: "STEEL SIGNAL", detail: "Galvanized purlins, C-channels & hot-dip galvanized sections" },
      { category: "JSW PRODUCT FIT", detail: "Structural sections match — NTPC pre-approved vendor" },
      { category: "COMPETITION RISK", detail: "Medium — Tata Structura also qualified" },
    ],
    quote: "Renewable infra is a fast-moving segment 30 days of award news.",
    aiAction: "AI Decision Logic",
    leadScore: 65,
    leadProbability: "Moderate Probability",
    estSteelValue: "₹6.8 Cr",
    steelValueConfidence: "Medium confidence · based on MW / MT benchmark",
    steelStart: "May 2026",
    steelStartRelative: "In 3 months",
    nearestPlant: "Vasind Plant",
    plantDistance: "560 km · Rail + Truck",
    sourceName: "PV Tech India",
    publishedDate: "Feb 16, 2026",
    sourceArticleUrl: "https://pvtech.org",
    priority: "Medium",
  },
  {
    winningCompany: "GMR Airports Infrastructure Ltd.",
    location: "Hyderabad, Telangana",
    title: "GMR Hyderabad Airport Terminal 3 construction begins — structural steel demand of ~22,000 MT anticipated",
    requirements: [
      { category: "PROJECT TYPE", detail: "Airport terminal expansion — steel roof trusses & facades" },
      { category: "STEEL SIGNAL", detail: "Heavy structural sections, HR plates & weathering steel" },
      { category: "JSW PRODUCT FIT", detail: "Parallel flange columns & beams — ideal grade match" },
      { category: "DELIVERY TIMELINE", detail: "Phased delivery over 18 months from Q3 2026" },
    ],
    quote: "Airport steel is a high-visibility, high-value segment news confirms procurement is active.",
    aiAction: "AI Decision Logic",
    leadScore: 82,
    leadProbability: "High Probability",
    estSteelValue: "₹15.4 Cr",
    steelValueConfidence: "High confidence · architect drawings referenced in news",
    steelStart: "Sep 2026",
    steelStartRelative: "In 7 months",
    nearestPlant: "Vijayanagar Plant",
    plantDistance: "415 km · Rail",
    sourceName: "The Hindu BusinessLine",
    publishedDate: "Feb 15, 2026",
    sourceArticleUrl: "https://thehindubusinessline.com",
    priority: "Medium",
  },
]

export const tenderWinsTenders: TenderData[] = [
  {
    winningCompany: "Larsen & Toubro Ltd. — Heavy Civil",
    location: "Pune, Maharashtra",
    date: "Jan 28, 2026",
    status: "Awarded",
    title: "Structural steel supply for Pune Metro Phase 3 elevated corridor — 18 km viaduct",
    requirements: [
      { category: "STEEL REQUIREMENT CONFIRMED", detail: "Fe550D TMT bars & structural sections confirmed in BOQ" },
      { category: "JSW PRODUCT MATCH CHECKED", detail: "All grades available at Dolvi — IS1786 compliant" },
      { category: "QUANTITY THRESHOLD CHECKED", detail: "24,000 MT awarded — above JSW strategic threshold" },
      { category: "CUSTOMER CRM STATUS CHECKED", detail: "L&T Key Account — existing payment terms honored" },
      { category: "LOGISTICS FEASIBILITY CHECKED", detail: "Dolvi to Pune — 160 km, dedicated truck fleet" },
      { category: "DELIVERY TIMELINE CHECKED", detail: "Phased delivery schedule agreed — 18 months" },
    ],
    leadScore: 96,
    leadProbability: "Won",
    totalValue: "₹16.8 Cr",
    valueSource: "Final awarded contract value",
    deadline: "Mar 2027",
    daysLeft: 402,
    nearestSupply: "160 km",
    logisticsDetail: "Truck · Dolvi",
    sourcePortal: "L&T Procurement Portal",
    additionalBadge: "Full BOQ",
    quote: "Largest single metro steel award this quarter. ",
    aiAction: "AI Decision Logic",
    contractValue: 168000000,
  },
  {
    winningCompany: "Tata Projects Ltd.",
    location: "Surat, Gujarat",
    date: "Feb 03, 2026",
    status: "Awarded",
    title: "HR coils and galvanized sheets for Surat Diamond Bourse Phase 2 expansion",
    requirements: [
      { category: "STEEL REQUIREMENT CONFIRMED", detail: "HR coils 2–6mm & GI sheets 0.5mm confirmed" },
      { category: "JSW PRODUCT MATCH CHECKED", detail: "Vijayanagar HR grades exact match to spec" },
      { category: "QUANTITY THRESHOLD CHECKED", detail: "9,500 MT — qualifies for Key Account pricing" },
      { category: "CUSTOMER CRM STATUS CHECKED", detail: "Tata Projects — Tier 1 approved vendor, no disputes" },
      { category: "LOGISTICS FEASIBILITY CHECKED", detail: "Vijayanagar to Surat — 650 km via Vadodara rail" },
      { category: "DELIVERY TIMELINE CHECKED", detail: "Quarterly delivery over 9 months" },
    ],
    leadScore: 91,
    leadProbability: "Won",
    totalValue: "₹7.2 Cr",
    valueSource: "Contract value confirmed",
    deadline: "Nov 2026",
    daysLeft: 280,
    nearestSupply: "650 km",
    logisticsDetail: "Rail · Vijayanagar",
    sourcePortal: "Tata Projects Vendor Portal",
    quote: "High-value real estate to industrial conversion project. Tata Projects requested JSW as preferred supplier based on Phase 1 quality.",
    aiAction: "AI Decision Logic",
    contractValue: 72000000,
  },
  {
    winningCompany: "ONGC Ltd. — Projects Division",
    location: "Kakinada, Andhra Pradesh",
    date: "Jan 15, 2026",
    status: "Awarded",
    title: "API grade line pipes and structural steel for KG Basin offshore platform upgrades",
    requirements: [
      { category: "STEEL REQUIREMENT CONFIRMED", detail: "API 5L X65 line pipe & offshore structural plate" },
      { category: "JSW PRODUCT MATCH CHECKED", detail: "JSW Plate Mill certified for API 5L X65 grade" },
      { category: "QUANTITY THRESHOLD CHECKED", detail: "6,200 MT — niche high-margin offshore grade" },
      { category: "CUSTOMER CRM STATUS CHECKED", detail: "ONGC pre-approved vendor list — JSW certified since 2021" },
      { category: "LOGISTICS FEASIBILITY CHECKED", detail: "Vijayanagar to Kakinada port — 380 km, road" },
      { category: "DELIVERY TIMELINE CHECKED", detail: "Delivery by Apr 2026 — critical path item" },
    ],
    leadScore: 88,
    leadProbability: "Won",
    totalValue: "₹11.4 Cr",
    valueSource: "BOQ-based calculation",
    deadline: "Apr 2026",
    daysLeft: 60,
    nearestSupply: "380 km",
    logisticsDetail: "Road · Vijayanagar",
    sourcePortal: "ONGC GeM Portal",
    additionalBadge: "API Certified",
    quote: "Offshore API grade is a high-margin, low-competition segment secured this deal over SAIL.",
    aiAction: "AI Decision Logic",
    contractValue: 114000000,
  },
  {
    winningCompany: "Shapoorji Pallonji & Co. Ltd.",
    location: "Mumbai, Maharashtra",
    date: "Feb 10, 2026",
    status: "Awarded",
    title: "TMT rebars and structural sections for Navi Mumbai International Airport terminal building",
    requirements: [
      { category: "STEEL REQUIREMENT CONFIRMED", detail: "Fe500D TMT rebars & parallel flange columns confirmed" },
      { category: "JSW PRODUCT MATCH CHECKED", detail: "Dolvi TMT & structural sections — Fe500D IS1786 match" },
      { category: "QUANTITY THRESHOLD CHECKED", detail: "31,000 MT — largest single airport order this FY" },
      { category: "CUSTOMER CRM STATUS CHECKED", detail: "SP Group — active Key Account, no credit issues" },
      { category: "LOGISTICS FEASIBILITY CHECKED", detail: "Dolvi to NMIA site — 45 km, shortest supply route" },
      { category: "DELIVERY TIMELINE CHECKED", detail: "24-month phased schedule — 8 delivery milestones" },
    ],
    leadScore: 94,
    leadProbability: "Won",
    totalValue: "₹22.3 Cr",
    valueSource: "Signed PO value",
    deadline: "Feb 2028",
    daysLeft: 740,
    nearestSupply: "45 km",
    logisticsDetail: "Truck · Dolvi",
    sourcePortal: "SP Procurement",
    additionalBadge: "Strategic Account",
    quote: "Flagship infrastructure win. Proximity of Dolvi plant to NMIA gave JSW an unbeatable logistics and cost advantage.",
    aiAction: "AI Decision Logic",
    contractValue: 223000000,
  },
]

export const tenders: TenderData[] = [
  {
    winningCompany: "M.P. Power Generating Co. Ltd. (MPPGCL)",
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
    nearestSupply: "1200 km",
    logisticsDetail: "Rail+Truck",
    sourcePortal: "MP Tenders Portal",
    quote: "Product & PSU fit is strong, logistics manageable.",
    aiAction: "AI Decision Logic",
    contractValue: 55000000
  },
  {
    winningCompany: "National Highways Authority of India",
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
    nearestSupply: "8 km",
    logisticsDetail: "Truck",
    sourcePortal: "NHAI Portal",
    additionalBadge: "Full BOQ",
    quote: "Excellent win probability. We have existing relationship from Phase 1 .",
    aiAction: "AI Reasoning",
    contractValue: 28000000
  },
  {
    winningCompany: "Bharat Heavy Electricals Limited",
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
    nearestSupply: "980 km",
    logisticsDetail: "Rail",
    sourcePortal: "BHEL Procurement",
    quote: "Moderate risk. Non-standard specification.",
    aiAction: "AI Reasoning",
    contractValue: 6000000
  },
  {
    winningCompany: "Indian Railways - Eastern Railway",
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
    nearestSupply: "650 km",
    logisticsDetail: "Rail",
    sourcePortal: "IREPS",
    additionalBadge: "BOQ Available",
    quote: "Strong win probability. Railway projects align with JSW strategic focus.",
    aiAction: "AI Reasoning",
    contractValue: 42000000
  }
]
