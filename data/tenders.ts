import { ReasoningStep } from './reasoning-steps';

export interface TenderRequirement {
  category: string
  detail: string
}

export interface TenderData {
  id?: string
  module?: string
  winningCompany: string
  location: string
  date: string
  dateISO?: string
  status: string
  statusVariant?: string
  title: string
  requirements: TenderRequirement[]
  leadScore: number
  leadProbability: string
  totalValue: string
  totalValueAmount?: number
  valueSource: string
  deadline: string
  daysLeft: number
  nearestSupply: string
  logisticsDetail: string
  sourcePortal?: string
  additionalBadge?: string
  quote: string
  aiAction: string
  contractValue: number
  reasoningSteps?: ReasoningStep[]
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
  reasoningSteps?: ReasoningStep[]
}

export const privateNewsTenders: PrivateNewsData[] = [
  {
    winningCompany: "Max Healthcare Institute Ltd.",
    location: "Gurugram, Haryana",
    title: "Max Healthcare announces ₹2,500 Cr expansion for 1,000-bed 'Med-City' in Gurugram",
    requirements: [
      { category: "TMT Rebars", detail: "JSW Neosteel 550D for earthquake-resistant foundation" },
      { category: "Structural Steel", detail: "JSW Steel Sections for heavy medical equipment flooring" }
    ],
    quote: "Significant early-stage signal for high-grade TMT and structural steel; project groundbreaking set for Q3 2026.",
    aiAction: "AI Decision Logic",
    leadScore: 92,
    leadProbability: "Very High",
    estSteelValue: "₹24.5 Cr",
    steelValueConfidence: "High",
    steelStart: "Aug 2026",
    steelStartRelative: "In 6 months",
    nearestPlant: "Dolvi Plant (Maharashtra)",
    plantDistance: "1,350 km · Rail-Road Hub",
    sourceName: "Economic Times",
    publishedDate: "Feb 18, 2026",
    sourceArticleUrl: "https://economictimes.indiatimes.com",
    priority: "High",
    reasoningSteps: [
      { step: 1, description: "I scanned Economic Times for healthcare capex and identified Max's ₹2.5k Cr announcement.", confidence: 98 },
      { step: 2, description: "I verified the bed count (1,000) to estimate a steel intensity of 3.5 tons per bed.", confidence: 95 },
      { step: 3, description: "I checked JSW's northern distribution hub availability for Neosteel 550D delivery.", confidence: 92 },
      { step: 4, description: "I cross-referenced the 'Med-City' layout to identify high-load zones requiring structural sections.", confidence: 88 },
      { step: 5, description: "I calculated the lead score based on Max's historical preference for Tier-1 branded steel.", confidence: 90 },
      { step: 6, description: "I mapped the logistics from Dolvi via Rail-Road multimodal transport for bulk efficiency.", confidence: 94 }
    ]
  },
  {
    winningCompany: "AdaniConneX",
    location: "Navi Mumbai, Maharashtra",
    title: "AdaniConneX scales Navi Mumbai Data Center campus with new 50MW wing",
    requirements: [
      { category: "Coated Steel", detail: "JSW Silveron / Platina for server room enclosures" },
      { category: "TMT Rebars", detail: "JSW Neosteel for high-density server floor loading" }
    ],
    quote: "Immediate demand for high-precision coated steel and high-tensile rebars due to sensitive equipment needs.",
    aiAction: "AI Decision Logic",
    leadScore: 95,
    leadProbability: "Very High",
    estSteelValue: "₹12.8 Cr",
    steelValueConfidence: "High",
    steelStart: "May 2026",
    steelStartRelative: "In 3 months",
    nearestPlant: "Dolvi Plant",
    plantDistance: "65 km · Road (Panvel-JNPT Rd)",
    sourceName: "Construction World",
    publishedDate: "Feb 15, 2026",
    sourceArticleUrl: "https://constructionworld.in",
    priority: "High",
    reasoningSteps: [
      { step: 1, description: "I monitored construction portals for 'Navi Mumbai Data Center' permits and hit a 50MW expansion match.", confidence: 99 },
      { step: 2, description: "I identified the need for JSW Silveron based on the data center's anti-corrosive HVAC requirements.", confidence: 94 },
      { step: 3, description: "I estimated steel tonnage by benchmarking against the previous 30MW phase requirements.", confidence: 91 },
      { step: 4, description: "I confirmed Dolvi's proximity (under 100km) makes JSW the most competitive bidder on logistics.", confidence: 97 },
      { step: 5, description: "I checked the project timeline; structural work is slated to begin within 90 days.", confidence: 93 },
      { step: 6, description: "I flagged this as a 'Strategic Account' lead due to Adani's massive recurring infrastructure pipeline.", confidence: 96 }
    ]
  }
  ,
  {
    location: "Thane, Maharashtra",
    title: "Lodha announces 'Crown' phase expansion; 4 new high-rise towers in Thane",
    requirements: [
      {
        "category": "TMT Rebars",
        "detail": "JSW Neosteel 500D/550D for 40+ storey structures"
      },
      {
        "category": "Wire Rods",
        "detail": "For binding and mesh reinforcements"
      }
    ],
    quote: "Massive residential volume; Lodha typically procures via quarterly bulk contracts.",
    aiAction: "AI Decision Logic",
    leadScore: 87,
    leadProbability: "High Probability",
    estSteelValue: "₹18.2 Cr",
    steelValueConfidence: "Medium-High",
    steelStart: "July 2026",
    steelStartRelative: "In 5 months",
    nearestPlant: "Dolvi Plant",
    plantDistance: "82 km · Road",
    sourceName: "Mint",
    publishedDate: "Feb 10, 2026",
    sourceArticleUrl: "https://livemint.com",
    priority: "High",
    winningCompany: "Lodha Group (Macrotech)",
    reasoningSteps: [
      {
        "step": 1,
        "description": "I analyzed Lodha's Q3 investor presentation to find 'upcoming launches' in the Thane micro-market.",
        "confidence": 92
      },
      {
        "step": 2,
        "description": "I verified RERA filings for the specific 'Crown' phase to get total built-up area (BUA).",
        "confidence": 96
      },
      {
        "step": 3,
        "description": "I applied a standard residential steel coefficient of 4.8kg/sqft for high-rise residential.",
        "confidence": 89
      },
      {
        "step": 4,
        "description": "I matched the requirement to Dolvi's bar mill capacity to ensure supply continuity.",
        "confidence": 94
      },
      {
        "step": 5,
        "description": "I tracked current TMT price trends to provide an estimated procurement value of ₹18Cr.",
        "confidence": 85
      },
      {
        "step": 6,
        "description": "I identified the 'Just-in-Time' delivery potential given the short distance from Dolvi/Vasind.",
        "confidence": 91
      }
    ],
  },
  {
    location: "Jamnagar, Gujarat",
    title: "Reliance to set up 10GW Solar PV Giga-factory; structural steel tenders expected",
    requirements: [
      {
        "category": "Galvanized Steel",
        "detail": "JSW Colouron+ for factory roofing and cladding"
      },
      {
        "category": "Structural Sections",
        "detail": "Heavy beams for large-span industrial sheds"
      }
    ],
    quote: "High-volume industrial demand; JSW’s expertise in coated steel is a major competitive advantage here.",
    aiAction: "AI Decision Logic",
    leadScore: 94,
    leadProbability: "Very High",
    estSteelValue: "₹42.0 Cr",
    steelValueConfidence: "High",
    steelStart: "Oct 2026",
    steelStartRelative: "In 8 months",
    nearestPlant: "Dolvi Plant",
    plantDistance: "720 km · Rail (WDFC)",
    sourceName: "Financial Express",
    publishedDate: "Feb 05, 2026",
    sourceArticleUrl: "https://financialexpress.com",
    priority: "High",
    winningCompany: "Reliance New Energy Ltd.",
    reasoningSteps: [
      {
        "step": 1,
        "description": "I flagged the 10GW expansion news from Reliance's annual energy summit update.",
        "confidence": 98
      },
      {
        "step": 2,
        "description": "I determined the need for specialized galvanized steel to resist Jamnagar's coastal corrosion.",
        "confidence": 95
      },
      {
        "step": 3,
        "description": "I estimated the shed area (approx 1.5M sqft) to calculate the structural steel tonnage.",
        "confidence": 88
      },
      {
        "step": 4,
        "description": "I confirmed JSW's ability to supply customized wide-flange beams from Dolvi.",
        "confidence": 92
      },
      {
        "step": 5,
        "description": "I analyzed the rail connectivity via the Western Dedicated Freight Corridor for bulk transport.",
        "confidence": 94
      },
      {
        "step": 6,
        "description": "I marked this as a 'Mega Project' requiring a dedicated account manager from the Mumbai HQ.",
        "confidence": 97
      }
    ],
  },
  {
    location: "Ahmedabad, Gujarat",
    title: "Phoenix Mills to build 1.2M sqft 'Phoenix Palladium' Mall in Ahmedabad",
    requirements: [
      {
        "category": "TMT Rebars",
        "detail": "JSW Neosteel for underground parking and foundation"
      },
      {
        "category": "Plates",
        "detail": "JSW Steel Plates for architectural steel features"
      }
    ],
    quote: "Commercial retail project with significant aesthetic and structural steel requirements.",
    aiAction: "AI Decision Logic",
    leadScore: 89,
    leadProbability: "High Probability",
    estSteelValue: "₹28.8 Cr",
    steelValueConfidence: "High",
    steelStart: "Sept 2026",
    steelStartRelative: "In 7 months",
    nearestPlant: "Dolvi Plant",
    plantDistance: "510 km · Road",
    sourceName: "Business Standard",
    publishedDate: "Jan 28, 2026",
    sourceArticleUrl: "https://business-standard.com",
    priority: "High",
    winningCompany: "Phoenix Mills Ltd.",
    reasoningSteps: [
      {
        "step": 1,
        "description": "I extracted the project footprint from the Ahmedabad Urban Development Authority (AUDA) list.",
        "confidence": 96
      },
      {
        "step": 2,
        "description": "I checked the developer's track record of using JSW for the Lucknow and Pune malls.",
        "confidence": 90
      },
      {
        "step": 3,
        "description": "I calculated the 4-level basement steel requirement for deep excavation support.",
        "confidence": 93
      },
      {
        "step": 4,
        "description": "I verified the shortest logistics route from Dolvi via the NH48 corridor.",
        "confidence": 95
      },
      {
        "step": 5,
        "description": "I cross-referenced the steel start date with the developer's typical 6-month site prep cycle.",
        "confidence": 88
      },
      {
        "step": 6,
        "description": "I estimated a total requirement of ~4,500 tons of TMT based on commercial mall benchmarks.",
        "confidence": 91
      }
    ],
  },
  {
    location: "Chennai, Tamil Nadu",
    title: "Mahindra World City Chennai expands industrial cluster by 150 acres",
    requirements: [
      {
        "category": "Coated Steel",
        "detail": "JSW Platina for industrial warehouses"
      },
      {
        "category": "TMT Rebars",
        "detail": "For internal road infrastructure and drainage"
      }
    ],
    quote: "Industrial expansion signal; high demand for roofing and cladding for new manufacturing units.",
    aiAction: "AI Decision Logic",
    leadScore: 85,
    leadProbability: "High Probability",
    estSteelValue: "₹15.4 Cr",
    steelValueConfidence: "Medium",
    steelStart: "June 2026",
    steelStartRelative: "In 4 months",
    nearestPlant: "Salem Plant",
    plantDistance: "320 km · Rail/Road",
    sourceName: "The Hindu BusinessLine",
    publishedDate: "Jan 22, 2026",
    sourceArticleUrl: "https://thehindubusinessline.com",
    priority: "High",
    winningCompany: "Mahindra Lifespaces",
    reasoningSteps: [
      {
        "step": 1,
        "description": "I identified the land acquisition news via TN-Industrial Guidance Bureau updates.",
        "confidence": 97
      },
      {
        "step": 2,
        "description": "I mapped the location to JSW Salem plant for immediate TMT and wire rod supply.",
        "confidence": 99
      },
      {
        "step": 3,
        "description": "I forecasted the demand for JSW Platina for the upcoming 12 warehouse sheds.",
        "confidence": 92
      },
      {
        "step": 4,
        "description": "I reviewed Mahindra's procurement portal for active RFQs in the Chennai region.",
        "confidence": 88
      },
      {
        "step": 5,
        "description": "I calculated the steel value based on 150 acres of mixed-use infrastructure development.",
        "confidence": 85
      },
      {
        "step": 6,
        "description": "I prioritized this as a 'Greenfield' opportunity with long-term supply potential.",
        "confidence": 94
      }
    ],
  },
  {
    location: "Hyderabad, Telangana",
    title: "Prestige Group to launch 5M sqft 'City of Dreams' township in Hyderabad",
    requirements: [
      {
        "category": "TMT Rebars",
        "detail": "Bulk JSW Neosteel for residential townships"
      },
      {
        "category": "Galvalume",
        "detail": "For temporary onsite labor housing and storage sheds"
      }
    ],
    quote: "Multi-year project; massive cumulative steel requirement across 10+ towers.",
    aiAction: "AI Decision Logic",
    leadScore: 91,
    leadProbability: "Very High",
    estSteelValue: "₹78.0 Cr",
    steelValueConfidence: "High",
    steelStart: "Aug 2026",
    steelStartRelative: "In 6 months",
    nearestPlant: "Vijayanagar Plant",
    plantDistance: "440 km · Rail Route",
    sourceName: "Economic Times",
    publishedDate: "Feb 12, 2026",
    sourceArticleUrl: "https://economictimes.indiatimes.com",
    priority: "High",
    winningCompany: "Prestige Group",
    reasoningSteps: [
      {
        "step": 1,
        "description": "I scanned Hyderabad real estate launches for 2026 and flagged this 5M sqft project.",
        "confidence": 98
      },
      {
        "step": 2,
        "description": "I cross-checked Prestige Group's current vendor list where JSW holds a preferred status.",
        "confidence": 91
      },
      {
        "step": 3,
        "description": "I calculated an initial phase demand of 12,000 tons of steel for the first 3 towers.",
        "confidence": 94
      },
      {
        "step": 4,
        "description": "I identified Vijayanagar as the primary supply plant with seamless rail connectivity to Secunderabad.",
        "confidence": 96
      },
      {
        "step": 5,
        "description": "I assessed the probability based on the developer's aggressive 'Pre-launch' sales success.",
        "confidence": 89
      },
      {
        "step": 6,
        "description": "I verified the steel start date based on the recent environmental clearance (EC) filing.",
        "confidence": 93
      }
    ],
  },
  {
    location: "Chakan, Maharashtra",
    title: "ESR India to invest ₹350 Cr in Chakan industrial park expansion",
    requirements: [
      {
        "category": "Structural Steel",
        "detail": "Large span beams for logistics hubs"
      },
      {
        "category": "Coated Steel",
        "detail": "JSW Colouron+ for energy-efficient roofing"
      }
    ],
    quote: "Logistics hub demand; requires high-durability coated steel for MNC tenant specifications.",
    aiAction: "AI Decision Logic",
    leadScore: 86,
    leadProbability: "High Probability",
    estSteelValue: "₹9.2 Cr",
    steelValueConfidence: "Medium-High",
    steelStart: "April 2026",
    steelStartRelative: "In 2 months",
    nearestPlant: "Vasind/Dolvi",
    plantDistance: "145 km · Road",
    sourceName: "Construction World",
    publishedDate: "Feb 08, 2026",
    sourceArticleUrl: "https://constructionworld.in",
    priority: "High",
    winningCompany: "ESR India",
    reasoningSteps: [
      {
        "step": 1,
        "description": "I flagged the ESR investment announcement in Construction World's February issue.",
        "confidence": 95
      },
      {
        "step": 2,
        "description": "I verified the specific plot location in Chakan Phase II to check logistics access.",
        "confidence": 98
      },
      {
        "step": 3,
        "description": "I analyzed the tenant profile (Auto-ancillary) to predict high-floor-load steel needs.",
        "confidence": 92
      },
      {
        "step": 4,
        "description": "I identified JSW Vasind as the key source for specialized color-coated sheets.",
        "confidence": 94
      },
      {
        "step": 5,
        "description": "I checked JSW's current stock levels of Colouron+ to ensure immediate fulfillment.",
        "confidence": 90
      },
      {
        "step": 6,
        "description": "I estimated the order value based on a 400,000 sqft warehouse shed structure.",
        "confidence": 87
      }
    ],
  },
  {
    location: "Bengaluru, Karnataka",
    title: "Apollo Hospitals approves 250-bed expansion in South Bengaluru",
    requirements: [
      {
        "category": "TMT Rebars",
        "detail": "JSW Neosteel for multi-specialty wing"
      },
      {
        "category": "Cold Rolled Steel",
        "detail": "For medical furniture and lab infrastructure"
      }
    ],
    quote: "Steady demand for high-quality TMT; Apollo usually prioritizes quality over the lowest bid.",
    aiAction: "AI Decision Logic",
    leadScore: 88,
    leadProbability: "High Probability",
    estSteelValue: "₹6.8 Cr",
    steelValueConfidence: "High",
    steelStart: "July 2026",
    steelStartRelative: "In 5 months",
    nearestPlant: "Vijayanagar Plant",
    plantDistance: "340 km · Road",
    sourceName: "The Hindu BusinessLine",
    publishedDate: "Feb 14, 2026",
    sourceArticleUrl: "https://thehindubusinessline.com",
    priority: "High",
    winningCompany: "Apollo Hospitals",
    reasoningSteps: [
      {
        "step": 1,
        "description": "I monitored Apollo's corporate filings and hit a 'Board Approval' for the Bengaluru expansion.",
        "confidence": 99
      },
      {
        "step": 2,
        "description": "I mapped the location to the proximity of JSW Vijayanagar (under 350km).",
        "confidence": 97
      },
      {
        "step": 3,
        "description": "I estimated the steel tonnage by comparing it to Apollo's previous 200-bed OMR project.",
        "confidence": 93
      },
      {
        "step": 4,
        "description": "I flagged the need for CRCA steel for hospital internal fit-outs and partitions.",
        "confidence": 88
      },
      {
        "step": 5,
        "description": "I checked for potential 'Green Hospital' certification requirements that favor JSW's ESG rating.",
        "confidence": 91
      },
      {
        "step": 6,
        "description": "I set an alert for the PMC (Project Management Consultant) announcement to initiate contact.",
        "confidence": 95
      }
    ],
  },
  {
    location: "Bikaner, Rajasthan",
    title: "Tata Power to set up 600MW solar park; structure contracts in final stage",
    requirements: [
      {
        "category": "Galvanized Steel",
        "detail": "JSW Silveron for solar mounting structures"
      },
      {
        "category": "Hot Rolled Coils",
        "detail": "For structural support frames"
      }
    ],
    quote: "High-velocity project; solar structure steel is highly price-sensitive but volume-driven.",
    aiAction: "AI Decision Logic",
    leadScore: 84,
    leadProbability: "High Probability",
    estSteelValue: "₹54.5 Cr",
    steelValueConfidence: "Medium-High",
    steelStart: "Aug 2026",
    steelStartRelative: "In 6 months",
    nearestPlant: "Dolvi Plant",
    plantDistance: "1,150 km · Rail-Road",
    sourceName: "Mint",
    publishedDate: "Feb 16, 2026",
    sourceArticleUrl: "https://livemint.com",
    priority: "High",
    winningCompany: "Tata Power Renewable Energy",
    reasoningSteps: [
      {
        "step": 1,
        "description": "I scanned renewable energy news for PPA (Power Purchase Agreement) finalizations.",
        "confidence": 98
      },
      {
        "step": 2,
        "description": "I identified the 600MW project size to estimate a requirement of ~18,000 tons of galvanized steel.",
        "confidence": 94
      },
      {
        "step": 3,
        "description": "I evaluated the competitive landscape; JSW's 'Silveron' brand is a leader in solar mounting.",
        "confidence": 96
      },
      {
        "step": 4,
        "description": "I checked logistics from Dolvi via the North-South corridor (NH48 to Bikaner).",
        "confidence": 91
      },
      {
        "step": 5,
        "description": "I calculated the estimated delivery timeline to match the module arrival in Q3 2026.",
        "confidence": 89
      },
      {
        "step": 6,
        "description": "I flagged this as a 'Bulk Tender' opportunity for the specialty steel division.",
        "confidence": 95
      }
    ],
  },
  {
    location: "Gurugram, Haryana",
    title: "Signature Global & RMZ announce ₹5,000 Cr Mixed-Use project (5.5M sq.ft.)",
    requirements: [
      {
        "category": "TMT Rebars",
        "detail": "JSW Neosteel 550D for high-rise commercial towers"
      },
      {
        "category": "Structural Steel",
        "detail": "JSW Beams and Sections for expansive retail atrium"
      }
    ],
    quote: "Massive mixed-use development signal; commercial-grade steel demand is imminent for H2 2026 groundbreaking.",
    aiAction: "AI Decision Logic",
    leadScore: 94,
    leadProbability: "Very High",
    estSteelValue: "₹48.6 Cr",
    steelValueConfidence: "High",
    steelStart: "Sept 2026",
    steelStartRelative: "In 7 months",
    nearestPlant: "Dolvi Plant (Maharashtra)",
    plantDistance: "1,320 km · Rail Logistics Hub",
    sourceName: "Economic Times",
    publishedDate: "Feb 16, 2026",
    sourceArticleUrl: "https://economictimes.indiatimes.com",
    priority: "High",
    winningCompany: "Signature Global & RMZ JV",
    reasoningSteps: [
      {
        "step": 1,
        "description": "I identified the JV announcement between Signature Global and RMZ from the Economic Times (Feb 16, 2026).",
        "confidence": 99
      },
      {
        "step": 2,
        "description": "I calculated the 5.5M sq.ft. area against a high-rise steel intensity of 5.2kg/sq.ft. for commercial space.",
        "confidence": 96
      },
      {
        "step": 3,
        "description": "I checked Signature Global's previous procurement patterns to prioritize JSW Neosteel over Tier-2 brands.",
        "confidence": 90
      },
      {
        "step": 4,
        "description": "I verified the Southern Peripheral Road (SPR) site location for heavy vehicle access logistics.",
        "confidence": 94
      },
      {
        "step": 5,
        "description": "I estimated the structural steel requirement for the 2.0M sq.ft. residential portion specifically.",
        "confidence": 88
      },
      {
        "step": 6,
        "description": "I flagged this for immediate sales outreach as the design-finalization phase is currently underway.",
        "confidence": 95
      }
    ],
  },
  {
    location: "Visakhapatnam, Andhra Pradesh",
    title: "Adani-Google AI Data Center Campus: Phase 1 infrastructure works announced",
    requirements: [
      {
        "category": "Coated Steel",
        "detail": "JSW Silveron for server racks and specialized HVAC cladding"
      },
      {
        "category": "Plates",
        "detail": "JSW Steel Plates for high-strength equipment foundations"
      }
    ],
    quote: "High-spec AI data center project; demand for precision coated products and corrosion-resistant steel.",
    aiAction: "AI Decision Logic",
    leadScore: 96,
    leadProbability: "Very High",
    estSteelValue: "₹15.2 Cr",
    steelValueConfidence: "High",
    steelStart: "July 2026",
    steelStartRelative: "In 5 months",
    nearestPlant: "Vijayanagar Plant",
    plantDistance: "680 km · Rail route",
    sourceName: "Business Today",
    publishedDate: "Feb 18, 2026",
    sourceArticleUrl: "https://businesstoday.in",
    priority: "High",
    winningCompany: "Adani Group / AdaniConneX",
    reasoningSteps: [
      {
        "step": 1,
        "description": "I detected the Adani-Google collaboration news for a 'Gigawatt-scale' AI campus in Vizag.",
        "confidence": 98
      },
      {
        "step": 2,
        "description": "I identified the coastal location (Vizag), triggering a recommendation for JSW Silveron (anti-corrosive).",
        "confidence": 97
      },
      {
        "step": 3,
        "description": "I estimated structural steel tonnage based on Google's hyperscale architecture standards.",
        "confidence": 92
      },
      {
        "step": 4,
        "description": "I checked the shortest rail route from JSW Vijayanagar to ensure competitive freight pricing.",
        "confidence": 95
      },
      {
        "step": 5,
        "description": "I analyzed Adani's $100bn digital infra commitment to flag this as a 'Key Account' priority.",
        "confidence": 99
      },
      {
        "step": 6,
        "description": "I calculated the first-phase procurement value based on the planned 50MW initial capacity.",
        "confidence": 89
      }
    ],
  },
  {
    location: "Navi Mumbai, Maharashtra",
    title: "Aurionpro secures major Data Center order for brownfield expansion in Mumbai",
    requirements: [
      {
        "category": "Structural Sections",
        "detail": "JSW Beams for live-site vertical expansion"
      },
      {
        "category": "Galvanized Sheets",
        "detail": "For site enclosure and secondary structural support"
      }
    ],
    quote: "Brownfield project requiring 'Just-in-Time' delivery within an operational campus environment.",
    aiAction: "AI Decision Logic",
    leadScore: 89,
    leadProbability: "High Probability",
    estSteelValue: "₹4.5 Cr",
    steelValueConfidence: "Medium-High",
    steelStart: "April 2026",
    steelStartRelative: "In 2 months",
    nearestPlant: "Dolvi Plant",
    plantDistance: "45 km · Road (via JNPT Road)",
    sourceName: "ScanX Trade News",
    publishedDate: "Feb 18, 2026",
    sourceArticleUrl: "https://scanx.trade",
    priority: "High",
    winningCompany: "Aurionpro Solutions",
    reasoningSteps: [
      {
        "step": 1,
        "description": "I picked up the order-win announcement from Aurionpro regarding a Mumbai global data center.",
        "confidence": 96
      },
      {
        "step": 2,
        "description": "I identified this as a 'Brownfield' project, meaning steel delivery must be highly coordinated with site constraints.",
        "confidence": 93
      },
      {
        "step": 3,
        "description": "I verified the proximity to JSW Dolvi, offering a significant lead-time advantage (next-day delivery).",
        "confidence": 98
      },
      {
        "step": 4,
        "description": "I cross-referenced the project's 3-quarter timeline to schedule rolling of structural sections.",
        "confidence": 91
      },
      {
        "step": 5,
        "description": "I checked for JSW Steel's current capacity for wide-flange beams at the Dolvi mill.",
        "confidence": 94
      },
      {
        "step": 6,
        "description": "I estimated a ₹4.5 Cr steel value for the immediate structural reinforcement phase.",
        "confidence": 87
      }
    ],
  },
  {
    location: "Bhubaneswar, Odisha",
    title: "Bhubaneswar Airport modernization under PPP: New terminal design phase begins",
    requirements: [
      {
        "category": "Structural Steel",
        "detail": "Large-span JSW Sections for terminal roof structure"
      },
      {
        "category": "Coated Steel",
        "detail": "JSW Colouron+ for aesthetic airport facade"
      }
    ],
    quote: "Government clearing 11 airports for private lease (Budget 2026) creates a massive private EPC opportunity.",
    aiAction: "AI Decision Logic",
    leadScore: 82,
    leadProbability: "Medium-High",
    estSteelValue: "₹65.0 Cr",
    steelValueConfidence: "Medium",
    steelStart: "Jan 2027",
    steelStartRelative: "In 10 months",
    nearestPlant: "Vijayanagar / Dolvi",
    plantDistance: "1,050 km · Multimodal",
    sourceName: "MagicBricks Infra News",
    publishedDate: "Feb 05, 2026",
    sourceArticleUrl: "https://magicbricks.com",
    priority: "High",
    winningCompany: "Adani Airports (PPP Lease)",
    reasoningSteps: [
      {
        "step": 1,
        "description": "I monitored the '11 Airports' PPP clearance from the Civil Aviation Ministry (Feb 2026).",
        "confidence": 97
      },
      {
        "step": 2,
        "description": "I flagged Bhubaneswar as a high-growth tier-2 hub likely to see immediate private Capex post-handover.",
        "confidence": 92
      },
      {
        "step": 3,
        "description": "I analyzed the likely steel requirement for a new 'integrated terminal' model common in PPP airports.",
        "confidence": 89
      },
      {
        "step": 4,
        "description": "I identified the Paradip Port connectivity for transporting JSW structural steel via barge/rail.",
        "confidence": 85
      },
      {
        "step": 5,
        "description": "I forecasted procurement to start in early 2027, but recommended early specification-wins with designers.",
        "confidence": 91
      },
      {
        "step": 6,
        "description": "I checked JSW's capacity to supply large-diameter hollow sections for airport trusses.",
        "confidence": 93
      }
    ],
  },
  {
    location: "Indore, Madhya Pradesh",
    title: "New 500-bed Multi-Specialty Private Hospital announced for Indore",
    requirements: [
      {
        "category": "TMT Rebars",
        "detail": "JSW Neosteel for high-grade seismic foundation"
      },
      {
        "category": "Wire Rods",
        "detail": "For surgical/utility equipment support structures"
      }
    ],
    quote: "Regional healthcare hub signal; MP Budget 2026 and ICRA report both confirm Indore as a priority site.",
    aiAction: "AI Decision Logic",
    leadScore: 88,
    leadProbability: "High Probability",
    estSteelValue: "₹11.2 Cr",
    steelValueConfidence: "High",
    steelStart: "June 2026",
    steelStartRelative: "In 4 months",
    nearestPlant: "Dolvi Plant",
    plantDistance: "590 km · Road",
    sourceName: "Fortune India",
    publishedDate: "Feb 18, 2026",
    sourceArticleUrl: "https://fortuneindia.com",
    priority: "High",
    winningCompany: "Madhya Pradesh Private Healthcare JV",
    reasoningSteps: [
      {
        "step": 1,
        "description": "I extracted hospital capex trends from the ICRA Healthcare report (Feb 2026).",
        "confidence": 95
      },
      {
        "step": 2,
        "description": "I matched the MP Government's PPP interest with private developer intent for an Indore cluster.",
        "confidence": 90
      },
      {
        "step": 3,
        "description": "I calculated a 1,750-ton TMT requirement based on standard 500-bed multispecialty designs.",
        "confidence": 93
      },
      {
        "step": 4,
        "description": "I checked road logistics from JSW Dolvi to Indore (NH52), confirming a 12-hour lead time.",
        "confidence": 96
      },
      {
        "step": 5,
        "description": "I verified the client's preference for branded TMT to meet upcoming healthcare safety standards.",
        "confidence": 88
      },
      {
        "step": 6,
        "description": "I estimated the 'steel start' based on the typical 4-month land-clearing cycle in MP.",
        "confidence": 91
      }
    ],
  },
  {
    location: "Gadag, Karnataka",
    title: "Hero Future Energies to establish 250MW Solar-Wind Hybrid Park",
    requirements: [
      {
        "category": "Galvanized Steel",
        "detail": "JSW Silveron for Solar PV mounting structures"
      },
      {
        "category": "Plates",
        "detail": "JSW Steel Plates for wind turbine base reinforcement"
      }
    ],
    quote: "Renewable hybrid project near JSW's hub; highly localized and cost-effective supply chain potential.",
    aiAction: "AI Decision Logic",
    leadScore: 97,
    leadProbability: "Very High",
    estSteelValue: "₹34.5 Cr",
    steelValueConfidence: "High",
    steelStart: "Sept 2026",
    steelStartRelative: "In 7 months",
    nearestPlant: "Vijayanagar Plant",
    plantDistance: "120 km · Road",
    sourceName: "Financial Express",
    publishedDate: "Feb 12, 2026",
    sourceArticleUrl: "https://financialexpress.com",
    priority: "High",
    winningCompany: "Hero Future Energies",
    reasoningSteps: [
      {
        "step": 1,
        "description": "I flagged the Gadag district renewable land allocation for Hero Future Energies.",
        "confidence": 98
      },
      {
        "step": 2,
        "description": "I identified the unique logistics benefit: the site is within 150km of JSW Vijayanagar.",
        "confidence": 99
      },
      {
        "step": 3,
        "description": "I calculated the galvanized steel tonnage for 250MW Solar (approx 8,500 tons).",
        "confidence": 94
      },
      {
        "step": 4,
        "description": "I verified JSW's capacity to supply high-strength wind-grade plates from the Vijayanagar mill.",
        "confidence": 95
      },
      {
        "step": 5,
        "description": "I analyzed the project timeline from the Karnataka Renewable Energy Development Ltd (KREDL) portal.",
        "confidence": 91
      },
      {
        "step": 6,
        "description": "I prioritized this as a 'Strategic Advantage' lead due to the unbeatable freight costs.",
        "confidence": 97
      }
    ],
  },
  {
    location: "Bhogapuram, Andhra Pradesh",
    title: "GMR Bhogapuram International Airport: Terminal structural steel contracts open",
    requirements: [
      {
        "category": "Structural Sections",
        "detail": "Heavy H-Beams for the main passenger terminal"
      },
      {
        "category": "Coated Steel",
        "detail": "JSW Platina for ancillary maintenance sheds"
      }
    ],
    quote: "Major greenfield airport work entering peak structural phase; JSW's presence in South India is key.",
    aiAction: "AI Decision Logic",
    leadScore: 93,
    leadProbability: "Very High",
    estSteelValue: "₹52.8 Cr",
    steelValueConfidence: "High",
    steelStart: "May 2026",
    steelStartRelative: "In 3 months",
    nearestPlant: "Vijayanagar Plant",
    plantDistance: "710 km · Rail",
    sourceName: "Construction World",
    publishedDate: "Feb 15, 2026",
    sourceArticleUrl: "https://constructionworld.in",
    priority: "High",
    winningCompany: "GMR Airports",
    reasoningSteps: [
      {
        "step": 1,
        "description": "I checked the construction progress of Bhogapuram via GMR's monthly investor update.",
        "confidence": 96
      },
      {
        "step": 2,
        "description": "I identified that the terminal building foundation is 80% complete, signaling the start of the steel super-structure.",
        "confidence": 98
      },
      {
        "step": 3,
        "description": "I estimated the tonnage requirement for a 6M passenger-capacity terminal building.",
        "confidence": 92
      },
      {
        "step": 4,
        "description": "I mapped the logistics from JSW Vijayanagar via the Vizag rail link.",
        "confidence": 95
      },
      {
        "step": 5,
        "description": "I verified JSW's approved vendor status with GMR's central procurement team.",
        "confidence": 99
      },
      {
        "step": 6,
        "description": "I forecasted a sustained 12-month delivery window for consistent volume billing.",
        "confidence": 93
      }
    ],
  },
  {
    location: "Bikaner, Rajasthan",
    title: "Tata Power TPREL announces 1,000MW Solar Park; high demand for structural steel",
    requirements: [
      {
        "category": "Galvanized Steel",
        "detail": "JSW Silveron for large-scale mounting structures"
      },
      {
        "category": "TMT Rebars",
        "detail": "For substation foundations and fencing"
      }
    ],
    quote: "Volume-driven lead; TPREL projects are characterized by high execution speed and bulk procurement.",
    aiAction: "AI Decision Logic",
    leadScore: 95,
    leadProbability: "Very High",
    estSteelValue: "₹84.2 Cr",
    steelValueConfidence: "High",
    steelStart: "Oct 2026",
    steelStartRelative: "In 8 months",
    nearestPlant: "Dolvi Plant",
    plantDistance: "1,180 km · Rail (WDFC)",
    sourceName: "Mint",
    publishedDate: "Feb 18, 2026",
    sourceArticleUrl: "https://livemint.com",
    priority: "High",
    winningCompany: "Tata Power Renewable (TPREL)",
    reasoningSteps: [
      {
        "step": 1,
        "description": "I identified the Bikaner land acquisition news from TPREL's February expansion roadmap.",
        "confidence": 97
      },
      {
        "step": 2,
        "description": "I calculated the steel requirement for a 1GW park, one of the largest private announcements this quarter.",
        "confidence": 95
      },
      {
        "step": 3,
        "description": "I verified JSW's ability to supply high-zonal galvanized coating to withstand desert conditions.",
        "confidence": 92
      },
      {
        "step": 4,
        "description": "I mapped the logistics route from Dolvi to North Rajasthan via the dedicated freight corridor.",
        "confidence": 94
      },
      {
        "step": 5,
        "description": "I estimated the steel value at ₹84Cr based on current hot-rolled coil (HRC) spot prices.",
        "confidence": 89
      },
      {
        "step": 6,
        "description": "I flagged this for the Institutional Sales team specializing in the Energy sector.",
        "confidence": 96
      }
    ],
  },
  {
    location: "Kolkata, West Bengal",
    title: "Godrej Properties launches luxury residential project on Diamond Harbour Road",
    requirements: [
      {
        "category": "TMT Rebars",
        "detail": "JSW Neosteel 500D for coastal-proximate high-rise"
      },
      {
        "category": "Wire Rods",
        "detail": "For structural mesh and reinforcement"
      }
    ],
    quote: "High-end residential signal in a tier-1 market; Godrej often prefers high-compliance branded steel.",
    aiAction: "AI Decision Logic",
    leadScore: 86,
    leadProbability: "High Probability",
    estSteelValue: "₹22.5 Cr",
    steelValueConfidence: "Medium-High",
    steelStart: "Aug 2026",
    steelStartRelative: "In 6 months",
    nearestPlant: "Vijayanagar / Dolvi",
    plantDistance: "1,650 km · Rail Hub",
    sourceName: "Business Standard",
    publishedDate: "Feb 10, 2026",
    sourceArticleUrl: "https://business-standard.com",
    priority: "High",
    winningCompany: "Godrej Properties",
    reasoningSteps: [
      {
        "step": 1,
        "description": "I detected the new land-parcel acquisition in Kolkata from Godrej's Q3 investor update.",
        "confidence": 95
      },
      {
        "step": 2,
        "description": "I identified the need for JSW Neosteel with CRS (Corrosion Resistant Steel) properties due to humidity.",
        "confidence": 93
      },
      {
        "step": 3,
        "description": "I calculated the steel tonnage for two 35-storey luxury towers (approx 6,000 tons).",
        "confidence": 90
      },
      {
        "step": 4,
        "description": "I verified logistics from JSW's eastern stockyards supplied by rail from the West.",
        "confidence": 88
      },
      {
        "step": 5,
        "description": "I checked the project's West Bengal RERA status to confirm the 'Sales Start' date.",
        "confidence": 94
      },
      {
        "step": 6,
        "description": "I estimated a ₹22.5 Cr value for the initial TMT structural phase.",
        "confidence": 87
      }
    ],
  },
  {
    location: "Jamnagar, Gujarat",
    title: "Reliance Green Hydrogen: Electrolyzer plant structural steel tender identified",
    requirements: [
      {
        "category": "Plates",
        "detail": "JSW Steel Plates for storage and process tanks"
      },
      {
        "category": "Coated Steel",
        "detail": "JSW Colouron+ for chemical-resistant plant shed"
      }
    ],
    quote: "Specialty industrial project; massive demand for thick plates and corrosion-resistant cladding.",
    aiAction: "AI Decision Logic",
    leadScore: 98,
    leadProbability: "Very High",
    estSteelValue: "₹110.5 Cr",
    steelValueConfidence: "High",
    steelStart: "Nov 2026",
    steelStartRelative: "In 9 months",
    nearestPlant: "Dolvi Plant",
    plantDistance: "725 km · Rail (WDFC)",
    sourceName: "The Hindu BusinessLine",
    publishedDate: "Feb 17, 2026",
    sourceArticleUrl: "https://thehindubusinessline.com",
    priority: "High",
    winningCompany: "Reliance Industries (Green Hydrogen)",
    reasoningSteps: [
      {
        "step": 1,
        "description": "I monitored Reliance's New Energy progress and hit a signal for the 'Giga-Electrolyzer' structural phase.",
        "confidence": 99
      },
      {
        "step": 2,
        "description": "I identified the high-purity environment requirement, favoring JSW's specialty plate mill output.",
        "confidence": 96
      },
      {
        "step": 3,
        "description": "I calculated a massive 22,000-ton requirement for the phase 1 manufacturing shed and tanks.",
        "confidence": 91
      },
      {
        "step": 4,
        "description": "I verified the logistics advantage of the Western Dedicated Freight Corridor from Dolvi to Jamnagar.",
        "confidence": 94
      },
      {
        "step": 5,
        "description": "I analyzed the likely competitive bidding from other Tier-1 players and flagged for senior negotiation.",
        "confidence": 95
      },
      {
        "step": 6,
        "description": "I estimated a ₹110 Cr total steel value for this flagship industrial expansion.",
        "confidence": 90
      }
    ],
  }]

export const tenderWinsTenders: TenderData[] = [
  {
    id: "tw-0001",
    module: "tender-wins",
    winningCompany: "Afcons Infrastructure Ltd.",
    location: "Bengaluru, Karnataka",
    date: "2026-01-14",
    dateISO: "2026-01-14",
    status: "Awarded",
    title: "Bangalore Metro Phase 3 – Underground Section Package UG-03 (Gottigere to Nagavara)",
    requirements: [
      { "category": "STEEL REQUIREMENT CONFIRMED", "detail": "Fe550D TMT bars & HYSD mesh for cut-and-cover tunnel sections and station box excavations per BOQ" },
      { "category": "JSW PRODUCT MATCH CHECKED", "detail": "Fe500D & Fe550D Neosteel grades available at Vijayanagar Works, Karnataka" },
      { "category": "BOQ STEEL VOLUME ESTIMATED", "detail": "~12,400 MT TMT bars and structural sections across 6.8 km UG corridor" },
      { "category": "ROAD/RAIL CONNECTIVITY VERIFIED", "detail": "NH-150 via Chitradurga: Vijayanagar Works → Bengaluru site (345 km, ~6 hr road / Hospet Jn → Yeshwantpur Jn by rail ~340 km)" }
    ],
    leadScore: 88,
    leadProbability: "Very High",
    totalValue: "₹186 Cr",
    totalValueAmount: 1860000000,
    valueSource: "Inferred from BOQ",
    deadline: "1st March, 2026",
    daysLeft: 9,
    nearestSupply: "345 km",
    logisticsDetail: "Road via Vijayanagar Works",
    sourcePortal: "KUIDFC / BMRCL",
    additionalBadge: "Steel Dominant",
    quote: "Afcons is an established JSW customer with proven payment history.",
    aiAction: "AI Decision Logic",
    contractValue: 12400000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I accessed the Karnataka Urban Infrastructure Development & Finance Corporation (KUIDFC) tender portal and BMRCL's awards dashboard on 14th January 2026. I identified that Package UG-03 of Namma Metro Phase 3 (Gottigere–Nagavara corridor, 6.8 km underground) has been formally awarded to Afcons Infrastructure Ltd. at ₹1,240 Crore.",
        "confidence": 98
      },
      {
        "step": 2,
        "description": "I retrieved and parsed the BOQ document. I confirmed that Fe500D HYSD TMT reinforcement bars (8–40mm dia), structural steel sections (ISMB 300, ISMC 200) for station canopy frames, and precast tunnel segment steel mesh are explicitly listed as primary materials. Steel is estimated at ~15% of total construction cost across the 6.8 km underground section.",
        "confidence": 96
      },
      {
        "step": 3,
        "description": "I cross-referenced the confirmed steel grades (Fe500D, Fe550D CRS) against JSW Steel's product catalogue. All required grades and diameters (8–40mm) are manufactured at JSW Vijayanagar Works, Karnataka — produced via BF-LHF-Billet-BRM-TMT route ensuring grade purity suitable for Bengaluru's seismic zone II underground structures.",
        "confidence": 97
      },
      {
        "step": 4,
        "description": "I pulled Afcons Infrastructure's historical procurement records from JSW's CRM. Afcons has previously sourced JSW Neosteel TMT bars for the Nagpur Metro Phase 1 underground section and the Mumbai Coastal Road tunnel project. They hold an active vendor code with JSW Steel and their procurement team operates from their Mumbai HQ.",
        "confidence": 85
      },
      {
        "step": 5,
        "description": "I calculated the distance from JSW Vijayanagar Works to the project sites across Bengaluru. Road distance via NH-150 (Toranagallu → Hospet → Chitradurga → Tumkur → Bengaluru) is ~345 km, approximately 6 hours by heavy vehicle. Rail dispatch from Hospet Junction to Yeshwantpur Junction is ~340 km on the Hubli–Bengaluru mainline — both routes confirmed viable for bulk material dispatch.",
        "confidence": 94
      },
      {
        "step": 6,
        "description": "I confirmed this as a Priority lead. Afcons is an established JSW customer, the BOQ confirms steel, the project site is within 345 km of Vijayanagar Works, and construction mobilization typically begins 6–8 weeks post-award. I have flagged this for the JSW South Sales team for immediate outreach to Afcons' procurement head with a JSW Neosteel Fe500D pricing sheet and delivery schedule proposal targeting 1st March 2026.",
        "confidence": 91
      }
    ]
  },
  {
    id: "tw-0002",
    module: "tender-wins",
    winningCompany: "NCC Ltd.",
    location: "Bharuch, Gujarat",
    date: "2026-01-20",
    dateISO: "2026-01-20",
    status: "Awarded",
    title: "NH-48 Six-Laning – Surat to Vadodara EPC Package SV-02 (Bharuch Bypass & Narmada Bridge)",
    requirements: [
      { "category": "STEEL REQUIREMENT CONFIRMED", "detail": "Fe500D TMT bars for bridge piers & abutments, HR plates (IS 2062 E350) for PSC girder fabricated components in BOQ" },
      { "category": "JSW PRODUCT MATCH CHECKED", "detail": "Fe500D Neosteel TMT bars & HR plates E250/E350 available at Dolvi Works, Raigad, Maharashtra" },
      { "category": "BOQ STEEL VOLUME ESTIMATED", "detail": "~6,800 MT TMT bars + ~1,100 MT HR plates for Narmada bridge foundations and Bharuch bypass flyovers" },
      { "category": "ROAD/RAIL CONNECTIVITY VERIFIED", "detail": "Dolvi Works → Bharuch: 310 km via NH-48/NH-66 (~5.5 hr); Roha Jn → Bharuch Jn by Western Railway ~290 km" }
    ],
    leadScore: 92,
    leadProbability: "Won",
    totalValue: "₹71 Cr",
    totalValueAmount: 710000000,
    valueSource: "Inferred from BOQ",
    deadline: "5th March, 2026",
    daysLeft: 13,
    nearestSupply: "310 km",
    logisticsDetail: "Road via Dolvi Works",
    sourcePortal: "NHAI Portal",
    additionalBadge: "Full BOQ",
    quote: "NCC is a Tier-1 JSW customer with an active MOU/rate contract covering TMT bars.",
    aiAction: "AI Decision Logic",
    contractValue: 7850000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I accessed NHAI's official e-tendering portal (nhaithender.nic.in) on 20th January 2026 and confirmed the award of NH-48 six-laning Package SV-02 — Bharuch Bypass and Narmada River Bridge (32.4 km) — to NCC Ltd. as the L1 bidder at ₹785 Crore. The work order issuance is pending within 30 days per NHAI's standard process.",
        "confidence": 99
      },
      {
        "step": 2,
        "description": "I retrieved the full BOQ from NHAI's document portal. Steel items confirmed include: IS 1786 Fe500D TMT bars (8–32mm) for bridge substructures and retaining walls, IS 2062 E350 HR plates for fabricated girder components, and pre-stressed high-tensile wire strands. Total steel line items account for ₹71.2 Crore (~9.1% of the ₹785 Crore contract).",
        "confidence": 97
      },
      {
        "step": 3,
        "description": "I checked JSW Dolvi Works' current product range and confirmed Fe500D Neosteel TMT bars (all diameters 8–40mm) and HR plates in grades E250/E350/E410 per IS 2062 are manufactured at Dolvi, Raigad. Dolvi operates a 3.6 MTPA hot strip mill and bar mill with active inventory across these grades. Zero product gap identified.",
        "confidence": 96
      },
      {
        "step": 4,
        "description": "I checked NCC Ltd.'s procurement history from JSW's CRM. NCC is a Tier-1 JSW customer with an active MOU/rate contract covering TMT bars across NHAI and state highway EPC packages. Their procurement office in Hyderabad handles centralized material sourcing for highway projects, with regional purchase order authority delegated to site offices.",
        "confidence": 93
      },
      {
        "step": 5,
        "description": "I mapped the logistics route from JSW Dolvi Works (Raigad, Maharashtra) to the Bharuch project site in Gujarat. NH-48/NH-66 road route via Panvel–Vapi–Surat–Bharuch is ~310 km, approximately 5.5 hours by 20-tonne trailer. Rail dispatch from Roha Junction to Bharuch Junction via Western Railway (Mumbai–Ahmedabad mainline) is ~290 km — highly viable for both road and rail bulk dispatch.",
        "confidence": 95
      },
      {
        "step": 6,
        "description": "I confirmed this as a Won lead given NCC's existing rate contract with JSW and full BOQ steel confirmation. I have routed this to JSW's West Zone Sales team and set a follow-up task to share revised pricing with NCC's procurement head within 48 hours. Target: secure PO commitment for TMT bars before NCC finalizes their site material procurement schedule for the March mobilization.",
        "confidence": 94
      }
    ]
  },
  // Add other data here
  {
    id: "tw-0003",
    module: "tender-wins",
    winningCompany: "Tata Projects Ltd.",
    location: "Navi Mumbai, Maharashtra",
    date: "2026-01-22",
    dateISO: "2026-01-22",
    status: "Awarded",
    title: "Navi Mumbai International Airport (NMIA) – Terminal 1 Civil & Steel Superstructure Package",
    requirements: [
      {
        "category": "STEEL REQUIREMENT CONFIRMED",
        "detail": "Heavy structural sections (H-piles ISHB 450, ISMB 600), HR plates (IS 2062 E410) for roof space-frame trusses, Fe500D TMT bars for RCC foundation in BOQ"
      },
      {
        "category": "JSW PRODUCT MATCH CHECKED",
        "detail": "HR plates (E250/E350/E410) and TMT bars at Dolvi Works; Vijayanagar as secondary for heavier sections"
      },
      {
        "category": "BOQ STEEL VOLUME ESTIMATED",
        "detail": "~42,000 MT structural steel + ~18,500 MT TMT bars across Terminal 1 footprint (2,10,000 sqm)"
      },
      {
        "category": "ROAD/RAIL CONNECTIVITY VERIFIED",
        "detail": "Dolvi Works → NMIA site: 82 km via NH-66 Coastal Highway, ~1.5 hr — closest active JSW plant to any major project site in Maharashtra"
      }
    ],
    leadScore: 96,
    leadProbability: "Won",
    totalValue: "₹520 Cr",
    totalValueAmount: 5200000000,
    valueSource: "Inferred from BOQ",
    deadline: "15th March, 2026",
    daysLeft: 23,
    nearestSupply: "82 km",
    logisticsDetail: "Dolvi Works, Raigad, Maharashtra",
    sourcePortal: "Priority Lead",
    additionalBadge: "Priority Lead",
    quote: "Strategic win for Tata Projects Ltd. at Navi Mumbai, Maharashtra.",
    aiAction: "AI Decision Logic",
    contractValue: 28900000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I accessed the CIDCO (City and Industrial Development Corporation) tender awards portal and the NMIA procurement dashboard on 22nd January 2026. I confirmed that Tata Projects Ltd. has been awarded the Terminal 1 Civil and Steel Superstructure Package for Navi Mumbai International Airport at ₹2,890 Crore. CIDCO's official award communication confirms mobilization is expected within 30 days in alignment with the airport's Phase 1 deadline.",
        "confidence": 99
      },
      {
        "step": 2,
        "description": "I processed the BOQ and structural drawings shared by CIDCO with shortlisted vendors. Steel is the dominant material: structural sections (ISHB 450 H-piles, ISMB 600 for terminal frame, 800mm box columns) — ~42,000 MT; HR plates (10–50mm E410 grade) for roof space frame trusses — ~18,000 MT; Fe500D TMT bars for RCC slab and foundation — ~18,500 MT. Total estimated steel procurement value: ₹520 Crore.",
        "confidence": 96
      },
      {
        "step": 3,
        "description": "I verified JSW Dolvi Works' product range against the structural drawing specifications. JSW Dolvi produces HR plates in E250, E350, E410 grades (IS 2062) up to 25mm on their hot strip mill (up to 2100mm width). For heavier plate requirements (>25mm), I flagged JSW Vijayanagar as the secondary source. TMT Fe500D is in active production at Dolvi. Zero grade gap confirmed across the full BOQ steel scope.",
        "confidence": 97
      },
      {
        "step": 4,
        "description": "I reviewed Tata Projects Ltd.'s vendor list and past purchase records from JSW's CRM. Tata Projects has previously worked with JSW Steel on the Surat Diamond Bourse structural steel package and Mumbai Coastal Road project. Their procurement head for NMIA is based at the Mumbai office. While Tata Projects has a historical preference for group-company Tata Steel products, JSW's proximity advantage at Dolvi (82 km) and superior pricing creates a strong case.",
        "confidence": 80
      },
      {
        "step": 5,
        "description": "I confirmed the logistics advantage: JSW Dolvi Works in Raigad district is just 82 km from the NMIA site in Navi Mumbai via NH-66 coastal highway — under 1.5 hours by trailer. This is the shortest plant-to-site distance among any steel supplier for this project. Daily multi-trip delivery schedules are feasible without a warehouse buffer, directly reducing Tata Projects' inventory holding cost by an estimated ₹3–4 Crore over project duration.",
        "confidence": 97
      },
      {
        "step": 6,
        "description": "I marked this as the highest-priority Won lead in this batch: full BOQ steel at ₹520 Crore, nearest competing mill (SAIL Bhilai) is ~1,200 km vs JSW Dolvi at 82 km, and Tata Projects has an active JSW account. I have flagged for immediate action by JSW's Mumbai Key Accounts team to submit a comprehensive supply proposal within 5 working days covering HR plates, structural sections, and TMT bars with a committed 15th March 2026 delivery start.",
        "confidence": 96
      }
    ],
  },
  {
    id: "tw-0004",
    module: "tender-wins",
    winningCompany: "ITD Cementation India Ltd.",
    location: "Kolkata, West Bengal",
    date: "2026-01-30",
    dateISO: "2026-01-30",
    status: "Awarded",
    title: "Kolkata Metro East-West Corridor Extension – New Garia to Airport Section, Package EW-07",
    requirements: [
      {
        "category": "STEEL REQUIREMENT CONFIRMED",
        "detail": "Fe500D TMT bars for precast segment reinforcement, HYSD mesh for station slabs, structural sections (ISMB 300) for station canopy in BOQ"
      },
      {
        "category": "JSW PRODUCT MATCH CHECKED",
        "detail": "Fe500D TMT bars & HR coils available at JSW-BPSL, Jharsuguda, Odisha — nearest JSW plant serving eastern India"
      },
      {
        "category": "BOQ STEEL VOLUME ESTIMATED",
        "detail": "~15,800 MT TMT bars + ~2,200 MT structural sections across 7.2 km elevated/UG corridor and 3 stations"
      },
      {
        "category": "ROAD/RAIL CONNECTIVITY VERIFIED",
        "detail": "JSW-BPSL Jharsuguda → Kolkata: 430 km via NH-49 (~8 hr road); Jharsuguda Jn → Howrah Jn by SER rail ~430 km (overnight freight)"
      }
    ],
    leadScore: 83,
    leadProbability: "High",
    totalValue: "₹196 Cr",
    totalValueAmount: 1960000000,
    valueSource: "Inferred from BOQ",
    deadline: "20th March, 2026",
    daysLeft: 28,
    nearestSupply: "430 km",
    logisticsDetail: "JSW-BPSL, Jharsuguda, Odisha",
    sourcePortal: "EPC Package",
    additionalBadge: "EPC Package",
    quote: "Strategic win for ITD Cementation India Ltd. at Kolkata, West Bengal.",
    aiAction: "AI Decision Logic",
    contractValue: 9800000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I accessed the Kolkata Metro Rail Corporation (KMRC) procurement portal and the Ministry of Housing & Urban Affairs project tracker on 30th January 2026. I confirmed that Package EW-07 (New Garia to NSCBI Airport, 7.2 km) has been awarded to ITD Cementation India Ltd. at ₹980 Crore after a competitive 3-bidder process including L&T and Afcons.",
        "confidence": 97
      },
      {
        "step": 2,
        "description": "I scanned the BOQ from KMRC's document portal. Steel requirements explicitly confirmed: IS 1786 Fe500D TMT reinforcement bars for precast tunnel segments and in-situ pier construction, HYSD bent-up mesh for station slabs, and ISMB 300 structural sections for station architectural canopies and concourse decks. Total steel estimated at ~₹196 Crore (~20% of contract value).",
        "confidence": 94
      },
      {
        "step": 3,
        "description": "I cross-checked JSW-BPSL (Bhushan Power & Steel Ltd., Jharsuguda, Odisha) product range. JSW-BPSL produces Fe500D tor steel and TMT bars, HR coils, and CR coils with a 3.5 MTPA capacity. The required Fe500D bars in 8–40mm range are confirmed available in active production. JSW-BPSL is the designated nearest JSW plant for all eastern India projects.",
        "confidence": 91
      },
      {
        "step": 4,
        "description": "I reviewed ITD Cementation's vendor registry from public procurement records. ITD Cementation is a Tier-1 contractor with moderate JSW purchase history — they have historically used SAIL TMT bars (SAIL Durgapur is ~160 km from Kolkata) for past Kolkata metro packages due to proximity. JSW-BPSL at 430 km must compete on price and delivery SLA to win share on this package.",
        "confidence": 73
      },
      {
        "step": 5,
        "description": "I mapped the supply chain from JSW-BPSL, Jharsuguda to ITD Cementation's Kolkata project sites. Road via NH-49 (Jharsuguda–Rourkela–Kharagpur–Kolkata) is approximately 430 km, ~8 hours by heavy trailer. Rail: Jharsuguda Junction to Howrah Junction via South Eastern Railway is ~430 km with daily freight trains on the coal route with rake allocation available. SAIL Durgapur's 160 km proximity advantage means JSW needs to offer compensating pricing.",
        "confidence": 88
      },
      {
        "step": 6,
        "description": "I flagged this as a High (not Won) lead due to SAIL's proximity advantage for Kolkata metro projects. However, given ITD Cementation's history of multi-source procurement and JSW-BPSL's competitive eastern India pricing, I have routed this to JSW's East Zone Sales team with instructions to offer an FOB-site delivered pricing quote with guaranteed rail dispatch timelines from Jharsuguda by 20th March 2026 — targeting 30–40% of the ₹196 Cr steel scope.",
        "confidence": 79
      }
    ],
  },
  {
    id: "tw-0011",
    module: "tender-wins",
    winningCompany: "Larsen & Toubro Ltd.",
    location: "Lucknow, Uttar Pradesh",
    date: "2026-02-02",
    dateISO: "2026-02-02",
    status: "Awarded",
    title: "Lucknow Metro East–West Corridor – Elevated Viaduct & Stations Package EW-02",
    requirements: [
      {
        "category": "STEEL REQUIREMENT CONFIRMED",
        "detail": "Fe500D/Fe550D TMT bars, structural steel for station roofs and platform beams as per BOQ"
      },
      {
        "category": "JSW PRODUCT MATCH CHECKED",
        "detail": "Neosteel Fe500D/Fe550D and structural sections available from Vijayanagar Works"
      },
      {
        "category": "BOQ STEEL VOLUME ESTIMATED",
        "detail": "~19,500 MT TMT + 3,000 MT structurals across 9.5 km viaduct and 8 stations"
      },
      {
        "category": "ROAD/RAIL CONNECTIVITY VERIFIED",
        "detail": "Vijayanagar → Lucknow via NH-44/NH-30 ~1,450 km by road; Hospet Jn → Lucknow Jn via SCR/NR ~1,430 km"
      }
    ],
    leadScore: 87,
    leadProbability: "Very High",
    totalValue: "₹235 Cr",
    totalValueAmount: 2350000000,
    valueSource: "Inferred from BOQ",
    deadline: "10th April, 2026",
    daysLeft: 49,
    nearestSupply: "450 km",
    logisticsDetail: "Vijayanagar Works, Karnataka",
    sourcePortal: "Metro Package",
    additionalBadge: "Metro Package",
    quote: "Strategic win for Larsen & Toubro Ltd. at Lucknow, Uttar Pradesh.",
    aiAction: "AI Decision Logic",
    contractValue: 11200000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I checked the Uttar Pradesh Metro Rail Corporation (UPMRC) award notification for the East–West corridor and confirmed that Package EW-02 (9.5 km elevated + 8 stations) has been awarded to Larsen & Toubro Ltd. for ₹1,120 Crore.",
        "confidence": 97
      },
      {
        "step": 2,
        "description": "I reviewed the BOQ and saw Fe500D/Fe550D TMT bars for piers, pier caps and decks, plus structural steel (ISMB/ISMC sections) for station roofs and platform beams, together accounting for ~21% of the civil package value.",
        "confidence": 93
      },
      {
        "step": 3,
        "description": "I matched the required TMT grades and structural sections with JSW’s Neosteel and long-products portfolio at Vijayanagar Works and confirmed availability of Fe500D/Fe550D and standard ISMB/ISMC sizes.",
        "confidence": 95
      },
      {
        "step": 4,
        "description": "I checked L&T’s historic procurement and confirmed they have bought JSW Neosteel for multiple metro packages (Hyderabad, Mumbai), with an active central rate contract that can be extended to Lucknow Metro.",
        "confidence": 90
      },
      {
        "step": 5,
        "description": "I calculated logistics from Vijayanagar to Lucknow via NH-44/NH-30 (~1,450 km by road) and via rail from Hospet Jn to Lucknow Jn (~1,430 km), both feasible for rake-based dispatch to a UPMRC-approved depot.",
        "confidence": 91
      },
      {
        "step": 6,
        "description": "I flagged this as a very strong lead and created a task for the North Zone JSW sales team to approach L&T’s metro procurement cell with a delivery plan starting 10th April 2026 aligned to pier casting sequence.",
        "confidence": 89
      }
    ],
  },
  {
    id: "tw-0012",
    module: "tender-wins",
    winningCompany: "GR Infraprojects Ltd.",
    location: "Sangareddy, Telangana",
    date: "2026-01-27",
    dateISO: "2026-01-27",
    status: "Awarded",
    title: "Four-Laning of NH-65 Hyderabad–Sangareddy Section on EPC Mode",
    requirements: [
      {
        "category": "STEEL REQUIREMENT CONFIRMED",
        "detail": "Fe500D TMT for major bridges, ROBs, retaining structures; plates for crash barrier posts"
      },
      {
        "category": "JSW PRODUCT MATCH CHECKED",
        "detail": "Fe500D TMT and HR plates available from Vijayanagar Works"
      },
      {
        "category": "BOQ STEEL VOLUME ESTIMATED",
        "detail": "~7,200 MT TMT + 900 MT plates/sections"
      },
      {
        "category": "ROAD/RAIL CONNECTIVITY VERIFIED",
        "detail": "Vijayanagar → Sangareddy via Ballari–Kurnool–Hyderabad ~520 km road; Hospet Jn → Secunderabad Jn rail ~540 km"
      }
    ],
    leadScore: 82,
    leadProbability: "High",
    totalValue: "₹82 Cr",
    totalValueAmount: 820000000,
    valueSource: "Inferred from BOQ",
    deadline: "1st April, 2026",
    daysLeft: 40,
    nearestSupply: "520 km",
    logisticsDetail: "Vijayanagar Works, Karnataka",
    sourcePortal: "Highway EPC",
    additionalBadge: "Highway EPC",
    quote: "Strategic win for GR Infraprojects Ltd. at Sangareddy, Telangana.",
    aiAction: "AI Decision Logic",
    contractValue: 5600000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I verified the NHAI award for NH-65 four-laning Hyderabad–Sangareddy and confirmed GR Infraprojects Ltd. as L1 with a contract value of ₹560 Crore.",
        "confidence": 96
      },
      {
        "step": 2,
        "description": "I parsed the BOQ and confirmed steel items: Fe500D TMT bars for bridge substructures and ROBs, plus HR plates/sections for crash barrier posts and bearings, ~14–15% of construction cost.",
        "confidence": 92
      },
      {
        "step": 3,
        "description": "I matched Fe500D TMT and standard structural/plate requirements with Vijayanagar’s long and HR product mix and confirmed full compatibility.",
        "confidence": 94
      },
      {
        "step": 4,
        "description": "I checked GRIL’s historical consumption and saw recurring JSW TMT purchases for Rajasthan and MP highway packages, indicating existing vendor onboarding.",
        "confidence": 88
      },
      {
        "step": 5,
        "description": "I assessed the supply route from Vijayanagar to Sangareddy via Ballari–Kurnool–Hyderabad (~520 km) and parallel rail movement Hospet Jn–Secunderabad Jn (~540 km), both viable for phased dispatch.",
        "confidence": 90
      },
      {
        "step": 6,
        "description": "I classified this as a High probability lead and created an action for South Zone highways team to submit quotes for full steel requirements before GRIL finalizes vendors for the April mobilization.",
        "confidence": 87
      }
    ],
  },
  {
    id: "tw-0013",
    module: "tender-wins",
    winningCompany: "Hindustan Construction Company Ltd.",
    location: "Srinagar, Jammu & Kashmir",
    date: "2026-01-18",
    dateISO: "2026-01-18",
    status: "Awarded",
    title: "Z-Morh Tunnel Approach Roads & Bridges – Package ZM-AR2",
    requirements: [
      {
        "category": "STEEL REQUIREMENT CONFIRMED",
        "detail": "High-strength Fe500D/Fe550D TMT, structural steel for snow galleries and steel girder bridges"
      },
      {
        "category": "JSW PRODUCT MATCH CHECKED",
        "detail": "Neosteel TMT and structurals available from Vijayanagar and Dolvi (for back-to-back supply)"
      },
      {
        "category": "BOQ STEEL VOLUME ESTIMATED",
        "detail": "~9,800 MT TMT + 3,400 MT structural steel"
      },
      {
        "category": "ROAD/RAIL CONNECTIVITY VERIFIED",
        "detail": "Vijayanagar/Dolvi → Jammu railhead, then road to Srinagar and project site; combined ~2,100–2,300 km"
      }
    ],
    leadScore: 79,
    leadProbability: "Medium",
    totalValue: "₹130 Cr",
    totalValueAmount: 1300000000,
    valueSource: "Inferred from BOQ",
    deadline: "25th April, 2026",
    daysLeft: 64,
    nearestSupply: "300 km",
    logisticsDetail: "Dolvi Works (via Jammu railhead)",
    sourcePortal: "Hilly Terrain",
    additionalBadge: "Hilly Terrain",
    quote: "Strategic win for Hindustan Construction Company Ltd. at Srinagar, Jammu & Kashmir.",
    aiAction: "AI Decision Logic",
    contractValue: 6900000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I checked MoRTH’s tunnel project status and confirmed HCC has secured Package ZM-AR2 for approach roads and bridges to the Z-Morh tunnel at a value of ₹690 Crore.",
        "confidence": 94
      },
      {
        "step": 2,
        "description": "I reviewed BOQ items indicating heavy use of Fe500D/Fe550D TMT and rolled sections for snow galleries, retaining structures and 2–3 small steel girder bridges.",
        "confidence": 90
      },
      {
        "step": 3,
        "description": "I mapped the requirement to JSW Neosteel and structurals from Vijayanagar and Dolvi, both capable of supplying the needed grades and sizes.",
        "confidence": 93
      },
      {
        "step": 4,
        "description": "I checked logistics constraints in J&K and concluded material will most likely move by rail to Jammu Tawi and then by road via Srinagar highway, giving Dolvi slight advantage on combined sea–rail–road chain.",
        "confidence": 86
      },
      {
        "step": 5,
        "description": "I evaluated HCC’s historical preference for SAIL (Bokaro) in Himalayan projects, which lowers our win probability despite technical fit.",
        "confidence": 78
      },
      {
        "step": 6,
        "description": "I tagged this as a Medium probability lead and recommended a targeted pitch focusing on corrosion-resistant TMT and just-in-time delivery to reduce winter stockpiling.",
        "confidence": 80
      }
    ],
  },
  {
    id: "tw-0014",
    module: "tender-wins",
    winningCompany: "Afcons Infrastructure Ltd.",
    location: "Leh, Ladakh",
    date: "2026-01-25",
    dateISO: "2026-01-25",
    status: "Awarded",
    title: "Construction of Three Steel Motorable Bridges over Indus River on EPC Basis",
    requirements: [
      {
        "category": "STEEL REQUIREMENT CONFIRMED",
        "detail": "Weather-resistant structural steel for girder bridges, Fe500D TMT for abutments and approaches"
      },
      {
        "category": "JSW PRODUCT MATCH CHECKED",
        "detail": "Structural sections and plates in E350/E410, TMT in Fe500D available from Vijayanagar"
      },
      {
        "category": "BOQ STEEL VOLUME ESTIMATED",
        "detail": "~5,600 MT structural steel + 1,200 MT TMT bars"
      },
      {
        "category": "ROAD/RAIL CONNECTIVITY VERIFIED",
        "detail": "Vijayanagar → Jammu rail, then road via Srinagar/Manali to Leh, seasonal movement"
      }
    ],
    leadScore: 75,
    leadProbability: "Medium",
    totalValue: "₹92 Cr",
    totalValueAmount: 920000000,
    valueSource: "Inferred from BOQ",
    deadline: "1st May, 2026",
    daysLeft: 70,
    nearestSupply: "0 km",
    logisticsDetail: "Vijayanagar Works, Karnataka",
    sourcePortal: "Steel Intensive",
    additionalBadge: "Steel Intensive",
    quote: "Strategic win for Afcons Infrastructure Ltd. at Leh, Ladakh.",
    aiAction: "AI Decision Logic",
    contractValue: 4800000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I looked up the Ladakh Union Territory’s tender results and confirmed Afcons has been awarded EPC work for three steel motorable bridges over the Indus river near Leh for about ₹480 Crore.",
        "confidence": 93
      },
      {
        "step": 2,
        "description": "I examined the BOQ and saw heavy structural steel (girders, cross-girders, bracings) and Fe500D TMT for abutments and approach slabs as the main steel line items.",
        "confidence": 90
      },
      {
        "step": 3,
        "description": "I matched the required E350/E410 structural plates/sections and Fe500D TMT with Vijayanagar’s long and HR product basket and confirmed suitability.",
        "confidence": 94
      },
      {
        "step": 4,
        "description": "I traced logistics via Vijayanagar → rail to Jammu/Chandigarh → road to Leh, factoring in seasonal closure of mountain passes and the need for pre-summer bulk dispatch.",
        "confidence": 87
      },
      {
        "step": 5,
        "description": "I considered Afcons’ existing strong engagement with JSW on coastal and metro jobs, which moderately supports our probability despite logistical complexity.",
        "confidence": 82
      },
      {
        "step": 6,
        "description": "I labeled this as a Medium probability lead with a clear recommendation to propose phased, season-aware steel delivery starting 1st May 2026 before high-altitude work peaks.",
        "confidence": 84
      }
    ],
  },
  {
    id: "tw-0015",
    module: "tender-wins",
    winningCompany: "Technip Energies India",
    location: "Bina, Madhya Pradesh",
    date: "2026-01-06",
    dateISO: "2026-01-06",
    status: "Awarded",
    title: "BPCL Bina Refinery Petrochemical Expansion – EPCC of Polypropylene & Butene-1 Units",
    requirements: [
      {
        "category": "STEEL REQUIREMENT CONFIRMED",
        "detail": "Structural steel for pipe racks, equipment foundations, racks; plates for vessels and platforms"
      },
      {
        "category": "JSW PRODUCT MATCH CHECKED",
        "detail": "HR plates, structurals and TMT bars available from Vijayanagar Works (primary) and Dolvi (secondary)"
      },
      {
        "category": "BOQ STEEL VOLUME ESTIMATED",
        "detail": "~26,000 MT structural steel + plates + ~5,000 MT TMT"
      },
      {
        "category": "ROAD/RAIL CONNECTIVITY VERIFIED",
        "detail": "Vijayanagar → Bina via Hosapete–Nagpur–Bhopal corridor ~1,050 km road; rail via Itarsi/Bhopal"
      }
    ],
    leadScore: 90,
    leadProbability: "Very High",
    totalValue: "₹340 Cr",
    totalValueAmount: 3400000000,
    valueSource: "Inferred from BOQ",
    deadline: "15th April, 2026",
    daysLeft: 54,
    nearestSupply: "050 km",
    logisticsDetail: "Vijayanagar Works, Karnataka",
    sourcePortal: "Refinery EPC",
    additionalBadge: "Refinery EPC",
    quote: "Strategic win for Technip Energies India at Bina, Madhya Pradesh.",
    aiAction: "AI Decision Logic",
    contractValue: 19000000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I confirmed from BPCL’s press release that Technip Energies has received a major EPCC contract for new polypropylene and Butene-1 units at the Bina refinery expansion, valued at around ₹1,900 Crore.",
        "confidence": 98
      },
      {
        "step": 2,
        "description": "I assessed typical refinery EPCC steel consumption and the shared project outline, and estimated ~26,000 MT structurals/plates and ~5,000 MT TMT for racks, pipe bridges, platforms and foundations.",
        "confidence": 90
      },
      {
        "step": 3,
        "description": "I mapped the requirement to JSW’s HR plates, structurals and TMT portfolio at Vijayanagar (with Dolvi as backup), confirming alignment with refinery-grade specifications.",
        "confidence": 95
      },
      {
        "step": 4,
        "description": "I validated logistics from Vijayanagar to Bina via Nagpur–Bhopal (~1,050 km) by road and via rail using central India corridors, both tested routes for industrial projects.",
        "confidence": 89
      },
      {
        "step": 5,
        "description": "I checked that Technip’s major steel procurement is via approved Indian mills, where JSW is already pre-qualified, increasing our win probability.",
        "confidence": 88
      },
      {
        "step": 6,
        "description": "I flagged this as a very high-priority refinery lead and created an action for JSW’s key accounts team to reach Technip’s procurement team with a phased supply proposal starting mid-April 2026.",
        "confidence": 92
      }
    ],
  },
  {
    id: "tw-0016",
    module: "tender-wins",
    winningCompany: "Rail Vikas Nigam Ltd. (RVNL)",
    location: "Hubballi, Karnataka",
    date: "2025-12-15",
    dateISO: "2025-12-15",
    status: "Awarded",
    title: "Doubling & Electrification of Hubballi–Vijayapura Section – Major Bridges & ROBs Package",
    requirements: [
      {
        "category": "STEEL REQUIREMENT CONFIRMED",
        "detail": "TMT for bridge foundations and piers; structural steel for composite girders and ROB decks"
      },
      {
        "category": "JSW PRODUCT MATCH CHECKED",
        "detail": "Neosteel TMT and structurals from Vijayanagar Works"
      },
      {
        "category": "BOQ STEEL VOLUME ESTIMATED",
        "detail": "~8,000 MT TMT + 2,600 MT structurals"
      },
      {
        "category": "ROAD/RAIL CONNECTIVITY VERIFIED",
        "detail": "Vijayanagar → Hubballi ~200 km by road; Hospet Jn → Hubballi Jn via SWR mainline"
      }
    ],
    leadScore: 85,
    leadProbability: "High",
    totalValue: "₹105 Cr",
    totalValueAmount: 1050000000,
    valueSource: "Inferred from BOQ",
    deadline: "20th March, 2026",
    daysLeft: 28,
    nearestSupply: "200 km",
    logisticsDetail: "Vijayanagar Works, Karnataka",
    sourcePortal: "Railway Bridges",
    additionalBadge: "Railway Bridges",
    quote: "Strategic win for Rail Vikas Nigam Ltd. (RVNL) at Hubballi, Karnataka.",
    aiAction: "AI Decision Logic",
    contractValue: 6200000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I reviewed SWR/RVNL project communication and confirmed RVNL is executing the Hubballi–Vijayapura doubling and electrification with a dedicated package for major bridges and ROBs around Hubballi worth ~₹620 Crore.",
        "confidence": 94
      },
      {
        "step": 2,
        "description": "I viewed BOQ patterns for similar RVNL bridge packages and estimated ~8,000 MT of TMT and ~2,600 MT structurals for composite girders and ROB decks.",
        "confidence": 88
      },
      {
        "step": 3,
        "description": "I matched these requirements with Vijayanagar’s long product range and confirmed capacity and grade compatibility.",
        "confidence": 95
      },
      {
        "step": 4,
        "description": "I checked logistics: Vijayanagar to Hubballi is ~200 km by road and accessible by rail through Hospet Jn–Hubballi Jn on SWR, making frequent dispatch easy.",
        "confidence": 93
      },
      {
        "step": 5,
        "description": "I considered RVNL’s practice of nominating approved steel mills and confirmed JSW is already approved on similar South Western Railway projects.",
        "confidence": 87
      },
      {
        "step": 6,
        "description": "I categorized this as a High probability opportunity and suggested early engagement with RVNL’s nominated contractors executing the sub-packages around Hubballi.",
        "confidence": 86
      }
    ],
  },
  {
    id: "tw-0017",
    module: "tender-wins",
    winningCompany: "Shapoorji Pallonji & Co. Pvt. Ltd.",
    location: "Chennai, Tamil Nadu",
    date: "2026-01-29",
    dateISO: "2026-01-29",
    status: "Awarded",
    title: "IT SEZ Campus – Steel Composite Office Towers at Siruseri SIPCOT",
    requirements: [
      {
        "category": "STEEL REQUIREMENT CONFIRMED",
        "detail": "Composite deck slabs with metal decking, structural steel columns and beams, TMT for cores"
      },
      {
        "category": "JSW PRODUCT MATCH CHECKED",
        "detail": "HR coils/plates for decking, structurals and TMT from Vijayanagar & Dolvi"
      },
      {
        "category": "BOQ STEEL VOLUME ESTIMATED",
        "detail": "~22,000 MT structural steel + decking; ~7,000 MT TMT"
      },
      {
        "category": "ROAD/RAIL CONNECTIVITY VERIFIED",
        "detail": "Vijayanagar → Chennai via Bengaluru–Krishnagiri–Vellore ~600 km road"
      }
    ],
    leadScore: 88,
    leadProbability: "Very High",
    totalValue: "₹290 Cr",
    totalValueAmount: 2900000000,
    valueSource: "Inferred from BOQ",
    deadline: "1st May, 2026",
    daysLeft: 70,
    nearestSupply: "600 km",
    logisticsDetail: "Vijayanagar Works, Karnataka",
    sourcePortal: "Commercial Real Estate",
    additionalBadge: "Commercial Real Estate",
    quote: "Strategic win for Shapoorji Pallonji & Co. Pvt. Ltd. at Chennai, Tamil Nadu.",
    aiAction: "AI Decision Logic",
    contractValue: 16500000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I checked SIPCOT Siruseri project updates and confirmed Shapoorji Pallonji has been awarded a large IT SEZ composite steel tower project (~₹1,650 Crore) comprising multiple G+12 to G+16 blocks.",
        "confidence": 92
      },
      {
        "step": 2,
        "description": "I evaluated typical composite construction BOQs and project size to estimate ~22,000 MT structural steel and decking, plus ~7,000 MT TMT for cores and foundations.",
        "confidence": 88
      },
      {
        "step": 3,
        "description": "I matched the requirement with JSW HR coils/plates and long products from Vijayanagar (primary) and Dolvi (backup), confirming we can serve decking, beams, columns and rebar.",
        "confidence": 94
      },
      {
        "step": 4,
        "description": "I computed road distance Vijayanagar–Chennai (~600 km via Bengaluru–Krishnagiri–Vellore) and confirmed reliable truck turnaround for steady tower erection progress.",
        "confidence": 90
      },
      {
        "step": 5,
        "description": "I checked Shapoorji’s past steel sourcing and found repeated JSW usage on IT/office projects in Bengaluru and Pune, boosting our chances.",
        "confidence": 89
      },
      {
        "step": 6,
        "description": "I flagged this as a very high-value, very high-probability commercial lead and recommended a dedicated key account pitch around composite construction speed and just-in-time steel supply.",
        "confidence": 91
      }
    ],
  },
  {
    id: "tw-0018",
    module: "tender-wins",
    winningCompany: "NCC Ltd.",
    location: "Nagpur, Maharashtra",
    date: "2026-01-23",
    dateISO: "2026-01-23",
    status: "Awarded",
    title: "Nagpur Municipal Water Supply – Elevated Storage Reservoirs (ESRs) and Pumping Stations",
    requirements: [
      {
        "category": "STEEL REQUIREMENT CONFIRMED",
        "detail": "Fe500D TMT for ESR columns and domes, structural steel for staircases and gallery supports"
      },
      {
        "category": "JSW PRODUCT MATCH CHECKED",
        "detail": "TMT and structurals available via JSW Kalmeshwar (coated/flat) and Vijayanagar/Dolvi (longs)"
      },
      {
        "category": "BOQ STEEL VOLUME ESTIMATED",
        "detail": "~5,200 MT TMT + 600 MT structurals"
      },
      {
        "category": "ROAD/RAIL CONNECTIVITY VERIFIED",
        "detail": "Vijayanagar → Nagpur ~900 km road; Kalmeshwar coated facility ~30 km from Nagpur city"
      }
    ],
    leadScore: 81,
    leadProbability: "High",
    totalValue: "₹62 Cr",
    totalValueAmount: 620000000,
    valueSource: "Inferred from BOQ",
    deadline: "10th May, 2026",
    daysLeft: 79,
    nearestSupply: "900 km",
    logisticsDetail: "JSW Kalmeshwar (service + coated products) / Vijayanagar (TMT)",
    sourcePortal: "Urban Infra",
    additionalBadge: "Urban Infra",
    quote: "Strategic win for NCC Ltd. at Nagpur, Maharashtra.",
    aiAction: "AI Decision Logic",
    contractValue: 4100000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I scanned Nagpur municipal/AMRUT 2.0 project updates and verified NCC has bagged the ESRs and pumping stations package for about ₹410 Crore.",
        "confidence": 90
      },
      {
        "step": 2,
        "description": "I examined standard ESR BOQs and scaled them to the published storage capacity to estimate ~5,200 MT TMT and ~600 MT structurals.",
        "confidence": 86
      },
      {
        "step": 3,
        "description": "I mapped TMT requirements to Vijayanagar and used JSW Kalmeshwar (near Nagpur) as a local service/coated product node for any staircase/railing/roof sheeting requirement.",
        "confidence": 92
      },
      {
        "step": 4,
        "description": "I checked logistics from Vijayanagar to Nagpur (~900 km by road) and the proximity of Kalmeshwar (~30 km) for quick last-mile deliveries.",
        "confidence": 89
      },
      {
        "step": 5,
        "description": "I considered NCC’s strong relationship with JSW on water and urban infra projects, supporting a High probability classification.",
        "confidence": 88
      },
      {
        "step": 6,
        "description": "I created a follow-up for JSW’s Central India team to meet NCC’s Nagpur project office with a phased rebar supply schedule starting 10th May 2026.",
        "confidence": 87
      }
    ],
  },
  {
    id: "tw-0019",
    module: "tender-wins",
    winningCompany: "Likhitha Infrastructure Ltd.",
    location: "Ahmedabad, Gujarat",
    date: "2026-01-19",
    dateISO: "2026-01-19",
    status: "Awarded",
    title: "CGD Steel Pipeline Network Expansion – Ahmedabad GA",
    requirements: [
      {
        "category": "STEEL REQUIREMENT CONFIRMED",
        "detail": "ERW/MS pipes for medium-pressure gas distribution, plates for fabricated specials"
      },
      {
        "category": "JSW PRODUCT MATCH CHECKED",
        "detail": "HR coils/plates feedstock for ERW pipes available from Dolvi Works"
      },
      {
        "category": "BOQ STEEL VOLUME ESTIMATED",
        "detail": "~9,000 MT line pipes and fittings (steel tonnage)"
      },
      {
        "category": "ROAD/RAIL CONNECTIVITY VERIFIED",
        "detail": "Dolvi → Ahmedabad via NH-48 ~580 km road; rail via Mumbai–Vadodara–Ahmedabad"
      }
    ],
    leadScore: 80,
    leadProbability: "Medium",
    totalValue: "₹110 Cr",
    totalValueAmount: 1100000000,
    valueSource: "Inferred from BOQ",
    deadline: "1st June, 2026",
    daysLeft: 101,
    nearestSupply: "580 km",
    logisticsDetail: "Dolvi Works, Maharashtra",
    sourcePortal: "Oil & Gas",
    additionalBadge: "Oil & Gas",
    quote: "Strategic win for Likhitha Infrastructure Ltd. at Ahmedabad, Gujarat.",
    aiAction: "AI Decision Logic",
    contractValue: 7300000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I verified CGD award details for Ahmedabad GA and identified Likhitha Infrastructure Ltd. as the EPC contractor for the steel pipeline network expansion (~₹730 Crore).",
        "confidence": 91
      },
      {
        "step": 2,
        "description": "I estimated steel tonnage based on route length and pressure class, arriving at ~9,000 MT of ERW/MS pipes and fittings.",
        "confidence": 86
      },
      {
        "step": 3,
        "description": "I mapped the requirement to Dolvi’s HR coil/plate production, which typically serves as feedstock for ERW pipe manufacturers supplying oil & gas projects.",
        "confidence": 92
      },
      {
        "step": 4,
        "description": "I checked logistics from Dolvi to Ahmedabad via NH-48 (~580 km) and via WR rail lines, both standard industrial corridors.",
        "confidence": 89
      },
      {
        "step": 5,
        "description": "I considered that pipe makers will be JSW’s direct buyers, with Likhitha as end user, lowering direct visibility but keeping a solid medium opportunity.",
        "confidence": 80
      },
      {
        "step": 6,
        "description": "I recommended targeting key ERW pipe converters in Gujarat and Maharashtra who regularly buy JSW HR coils for CGD projects to secure this volume.",
        "confidence": 84
      }
    ],
  },
  {
    id: "tw-0020",
    module: "tender-wins",
    winningCompany: "Larsen & Toubro – Sargent & Lundy JV",
    location: "Mumbai, Maharashtra",
    date: "2026-01-06",
    dateISO: "2026-01-06",
    status: "Awarded",
    title: "BPCL Mumbai Refinery – PRFCC Unit EPsCm & Associated Structural Works",
    requirements: [
      {
        "category": "STEEL REQUIREMENT CONFIRMED",
        "detail": "Structural steel for PRFCC structures, pipe racks and access platforms; TMT for foundations"
      },
      {
        "category": "JSW PRODUCT MATCH CHECKED",
        "detail": "Plates, structurals and TMT available from Dolvi Works (closest integrated plant)"
      },
      {
        "category": "BOQ STEEL VOLUME ESTIMATED",
        "detail": "~18,000 MT structural/plates + 3,000 MT TMT"
      },
      {
        "category": "ROAD/RAIL CONNECTIVITY VERIFIED",
        "detail": "Dolvi → Mumbai refinery via coastal route/Panvel ~100–120 km by road or coastal shipping"
      }
    ],
    leadScore: 93,
    leadProbability: "Won",
    totalValue: "₹240 Cr",
    totalValueAmount: 2400000000,
    valueSource: "Inferred from BOQ",
    deadline: "1st May, 2026",
    daysLeft: 70,
    nearestSupply: "120 km",
    logisticsDetail: "Dolvi Works, Raigad, Maharashtra",
    sourcePortal: "Brownfield Refinery",
    additionalBadge: "Brownfield Refinery",
    quote: "Strategic win for Larsen & Toubro – Sargent & Lundy JV at Mumbai, Maharashtra.",
    aiAction: "AI Decision Logic",
    contractValue: 15500000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I confirmed BPCL’s official announcement awarding EPsCm services and associated structural works for the PRFCC unit at Mumbai refinery to the L&T–Sargent & Lundy JV (~₹1,550 Crore scope for India-side execution).",
        "confidence": 97
      },
      {
        "step": 2,
        "description": "I estimated steel needs based on PRFCC configuration and structural scopes, arriving at ~18,000 MT structural/plates and ~3,000 MT TMT for foundations and pedestals.",
        "confidence": 89
      },
      {
        "step": 3,
        "description": "I mapped this requirement to Dolvi’s product range (HR plates, structurals, TMT) and confirmed a perfect fit, with Dolvi being the closest integrated mill to Mumbai refinery.",
        "confidence": 96
      },
      {
        "step": 4,
        "description": "I calculated the logistics advantage: Dolvi to Mahul (Mumbai refinery) is about 100–120 km via coastal corridor, feasible via both road and short coastal shipping.",
        "confidence": 94
      },
      {
        "step": 5,
        "description": "I checked L&T’s existing refinery project purchases and found strong precedent of JSW plates and structurals, making this a near-certain win if pricing is competitive.",
        "confidence": 92
      },
      {
        "step": 6,
        "description": "I classified this as a Won-class lead and set a task for JSW’s Mumbai key accounts team to negotiate a long-term steel call-off schedule with L&T’s oil & gas procurement division starting May 2026.",
        "confidence": 94
      }
    ],
  }]

export const tenders: TenderData[] = [
  {
    id: "td-0001",
    module: "tender-discovery",
    winningCompany: "M.P. Power Generating Co. Ltd. (MPPGCL)",
    location: "Jabalpur, Madhya Pradesh",
    date: "09 Feb 2026",
    dateISO: "2026-02-09",
    status: "Open Bidding",
    title: "Supply of IS 3502 Chequered Plates for Ash Handling System Platforms at MPPGCL Thermal Stations",
    requirements: [
      { "category": "PRODUCT ELIGIBILITY CHECKED", "detail": "IS 3502 chequered plates in 6–10 mm thickness explicitly required; JSW chequered/HR plates cover this range" },
      { "category": "SPECIFICATION COMPLIANCE CHECKED", "detail": "Plates must conform to IS 2062 E250/E350; JSW HR plate grades mapped and compliant" },
      { "category": "VOLUME & PACKING CHECKED", "detail": " BOQ indicates ~650 MT total; standard JSW plate bundle sizes acceptable with minor cutting at site" },
      { "category": "BUYER & PAYMENT RISK CHECKED", "detail": "State PSU with track record of timely payments and LC/Bank Guarantee backed contracts" },
      { "category": "COMPETITION & OEM BIAS CHECKED", "detail": "No OEM lock-in; any BIS-approved primary producer allowed, JSW mill test certificates accepted" },
      { "category": "LOGISTICS & ACCESS CHECKED", "detail": "Rail siding near Jabalpur available; last-mile by truck from JSW Dolvi via Itarsi route" }
    ],
    quote: "Strong product fit; PSU buyer with manageable rail-first logistics from Dolvi.",
    aiAction: "AI Decision Logic",
    leadScore: 74,
    leadProbability: "Moderate Probability",
    totalValue: "₹5.5 Cr",
    totalValueAmount: 55000000,
    valueSource: "Inferred from EMD 3%",
    deadline: "05 March, 2026",
    daysLeft: 14,
    nearestSupply: "1100 km",
    logisticsDetail: "Rail+Truck via JSW Dolvi (Raigad, Maharashtra)",
    additionalBadge: "MP Tenders Portal",
    sourcePortal: "MP Tenders Portal",
    contractValue: 55000000,
    reasoningSteps: [
      { step: 1, description: "I parsed the NIT to confirm that IS 3502 chequered plates with IS 2062 base grade are mandatory and matched them to JSW’s chequered/HR plate catalogue.", confidence: 96 },
      { step: 2, description: "I checked whether any make/brand restrictions exist and verified that the tender only requires BIS-approved primary producers, which includes JSW.", confidence: 93 },
      { step: 3, description: "I inferred the approximate quantity (~650 MT) from the BOQ line items and validated that this falls within typical JSW dispatch lot sizes.", confidence: 90 },
      { step: 4, description: "I evaluated buyer risk using past PSU tender patterns and classified MPPGCL as a medium-risk but acceptable state utility with LC-backed options.", confidence: 88 },
      { step: 5, description: "I computed logistics feasibility using distance from JSW Dolvi to Jabalpur, prioritising rail plus short-haul trucking to keep landed cost competitive.", confidence: 92 },
      { step: 6, description: "I combined product eligibility, buyer risk, and logistics cost into a composite lead score and recommended active pursuit with standard JSW chequered plate SKUs.", confidence: 94 }
    ]
  },
  {
    id: "td-0002",
    module: "tender-discovery",
    winningCompany: "Municipal Corporation of Greater Mumbai (MCGM)",
    location: "Mumbai, Maharashtra",
    date: "15 Feb 2026",
    dateISO: "2026-02-15",
    status: "Open Bidding",
    title: "Supply of Fe500D TMT Rebars for Coastal Road Flyover Package",
    requirements: [
      { "category": "PRODUCT ELIGIBILITY CHECKED", "detail": "Fe500D and Fe550D TMT rebars in 12–32 mm; fully covered by JSW Neosteel range" },
      { "category": "SPECIFICATION COMPLIANCE CHECKED", "detail": "IS 1786:2008 compliance with corrosion-resistant requirement; JSW mill certificates accepted" },
      { "category": "SITE & HANDLING CHECKED", "detail": "Urban flyover site with constrained storage; staggered deliveries and cut-to-length bars preferred" },
      { "category": "BUYER & PAYMENT RISK CHECKED", "detail": "MCGM is a high-credit civic body; standard 60–90 day payment terms via RA bills" },
      { "category": "COMPETITION & PRICE PRESSURE CHECKED", "detail": "High competition from local rerollers; primary producer preference clause gives JSW an edge" },
      { "category": "LOGISTICS & ACCESS CHECKED", "detail": "Direct road movement from JSW Dolvi to Mumbai via NH66 feasible with multiple daily truck trips" }
    ],
    quote: "Premium urban infra job with excellent JSW TMT fit and very strong logistics advantage from Dolvi.",
    aiAction: "AI Decision Logic",
    leadScore: 88,
    leadProbability: "High Probability",
    totalValue: "₹42 Cr",
    totalValueAmount: 420000000,
    valueSource: "As per BOQ summary",
    deadline: "10 March, 2026",
    daysLeft: 19,
    nearestSupply: "80 km",
    logisticsDetail: "Road via JSW Dolvi (Raigad, Maharashtra)",
    additionalBadge: "Maharashtra e-Tender",
    sourcePortal: "Maharashtra e-Tender",
    contractValue: 420000000,
    reasoningSteps: [
      { step: 1, description: "I identified Fe500D/Fe550D as the core requirement and mapped it to JSW Neosteel product grades for bar diameters 12–32 mm.", confidence: 98 },
      { step: 2, description: "I checked for any clause limiting supply to local micro units and confirmed that the tender specifically prefers primary producers with integrated mills.", confidence: 95 },
      { step: 3, description: "I evaluated site constraints based on coastal road alignment and recommended staggered just-in-time deliveries to reduce on-site congestion.", confidence: 89 },
      { step: 4, description: "I analysed prior MCGM steel tenders to infer that payment security is strong with predictable RA bill cycles.", confidence: 90 },
      { step: 5, description: "I calculated the distance and typical transit time from JSW Dolvi to central Mumbai and rated logistics risk as very low.", confidence: 97 },
      { step: 6, description: "Given high strategic visibility of the project and strong JSW TMT branding, I assigned a high lead score and suggested aggressive pricing.", confidence: 94 }
    ]
  },
  {
    id: "td-0003",
    module: "tender-discovery",
    winningCompany: "Cochin Shipyard Limited",
    location: "Kochi, Kerala",
    date: "05 Feb 2026",
    dateISO: "2026-02-05",
    status: "Open Bidding",
    title: "Supply of HR Steel Plates for Shipbuilding and Repair Works",
    requirements: [
      {
        "category": "PRODUCT ELIGIBILITY CHECKED",
        "detail": "Shipbuilding quality HR plates in 8–40 mm; JSW HR plate grades for marine and structural use applicable"
      },
      {
        "category": "SPECIFICATION COMPLIANCE CHECKED",
        "detail": "IS 2062 E250/E350 and equivalent marine grades; mill test certificates and ultrasonic testing mandatory"
      },
      {
        "category": "VOLUME & CALL-OFF CHECKED",
        "detail": "Rate contract for ~2,000 MT with call-off orders over 12 months; continuous rolling at JSW is suitable"
      },
      {
        "category": "PORT & HANDLING CHECKED",
        "detail": "Port-side delivery to Kochi yard; plates to be supplied in standard sizes for cutting in shipyard"
      },
      {
        "category": "COMPETITION & OEM BIAS CHECKED",
        "detail": "Competition from other primary mills; however, no single-make restriction present"
      },
      {
        "category": "LOGISTICS & ACCESS CHECKED",
        "detail": "Rail from JSW Vijayanagar to southern railheads and truck to Kochi; coastal shipping option also viable"
      }
    ],
    quote: "Strategic shipyard rate contract with large plate volumes and acceptable distance from Vijayanagar.",
    aiAction: "AI Decision Logic",
    leadScore: 79,
    leadProbability: "High Probability",
    totalValue: "₹32 Cr",
    totalValueAmount: 320000000,
    valueSource: "Given in NIT",
    deadline: "25 March, 2026",
    daysLeft: 34,
    nearestSupply: "780 km",
    logisticsDetail: "Rail+Truck via JSW Vijayanagar (Ballari, Karnataka)",
    additionalBadge: "Cochin Shipyard e-Procurement",
    sourcePortal: "Cochin Shipyard e-Procurement",
    contractValue: 320000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I extracted the plate thickness range and mechanical property requirements, then matched them with JSW’s HR plate and shipbuilding grade portfolio.",
        "confidence": 94
      },
      {
        "step": 2,
        "description": "I confirmed that the tender accepts IS 2062 and equivalent grades with mandatory UT and MTCs, which JSW can provide routinely.",
        "confidence": 93
      },
      {
        "step": 3,
        "description": "I noted that the contract is rate-based with annual call-offs, aligning well with JSW’s continuous rolling schedules for HR plates.",
        "confidence": 90
      },
      {
        "step": 4,
        "description": "I assessed port-side delivery needs and validated that standard plate sizes can be shipped efficiently without excessive slitting.",
        "confidence": 88
      },
      {
        "step": 5,
        "description": "I compared logistics routes from Vijayanagar and Dolvi and chose Vijayanagar as primary due to product mix and rail connectivity.",
        "confidence": 91
      },
      {
        "step": 6,
        "description": "Based on volume, strategic PSU customer, and medium logistics cost, I assigned a strong but not top-tier lead score.",
        "confidence": 89
      }
    ]
  },
  {
    id: "td-0004",
    module: "tender-discovery",
    winningCompany: "Tata Motors Limited (Pantnagar Plant)",
    location: "Pantnagar, Uttarakhand",
    date: "31 Jan 2026",
    dateISO: "2026-01-31",
    status: "Open Bidding",
    title: "Annual Contract for Supply of CRCA Coils for Automotive Components",
    requirements: [
      {
        "category": "PRODUCT ELIGIBILITY CHECKED",
        "detail": "CRCA coils in commercial and drawing quality; JSW Vijayanagar and Dolvi CRCA grades mapped"
      },
      {
        "category": "SPECIFICATION COMPLIANCE CHECKED",
        "detail": "Thickness 0.7–2.0 mm, widths 900–1350 mm with tight tolerances; Oiling and packaging as per OEM standard"
      },
      {
        "category": "VOLUME & FREQUENCY CHECKED",
        "detail": "Approx. 1,800 MT/month with JIT deliveries to Pantnagar; suitable for regular mill dispatches"
      },
      {
        "category": "QUALITY & OEM APPROVAL CHECKED",
        "detail": "Supplier must be OEM-approved; JSW is already approved vendor for multiple auto OEMs"
      },
      {
        "category": "COMPETITION & LOCK-IN CHECKED",
        "detail": "Competition from other integrated mills and imports; no single-brand lock-in but stringent quality norms"
      },
      {
        "category": "LOGISTICS & ACCESS CHECKED",
        "detail": "Rail movement to nearby railhead and truck to Pantnagar; longer lead distance but predictable lanes"
      }
    ],
    quote: "High-volume CRCA auto contract with long lead distance but stable OEM demand.",
    aiAction: "AI Decision Logic",
    leadScore: 72,
    leadProbability: "Moderate Probability",
    totalValue: "₹210 Cr",
    totalValueAmount: 2100000000,
    valueSource: "As per RFQ estimate",
    deadline: "18 March, 2026",
    daysLeft: 27,
    nearestSupply: "1600 km",
    logisticsDetail: "Rail+Truck from JSW Dolvi / Vijayanagar",
    additionalBadge: "OEM Direct RFQ",
    sourcePortal: "OEM Direct RFQ",
    contractValue: 2100000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I captured thickness, width, and quality conditions and confirmed that JSW CRCA coils cover all specified automotive grades.",
        "confidence": 96
      },
      {
        "step": 2,
        "description": "I checked the monthly tonnage requirement and matched it with typical JSW CRCA rolling and dispatch capacities.",
        "confidence": 92
      },
      {
        "step": 3,
        "description": "I verified that the tender requires OEM-approved suppliers and noted JSW’s existing approvals with leading auto manufacturers.",
        "confidence": 91
      },
      {
        "step": 4,
        "description": "I evaluated competitive intensity, including domestic and imported coils, and marked pricing pressure as high.",
        "confidence": 88
      },
      {
        "step": 5,
        "description": "I analysed the long-distance logistics from western/southern mills to Pantnagar and factored higher freight into the lead score.",
        "confidence": 90
      },
      {
        "step": 6,
        "description": "Considering strong product fit but higher freight and competition, I rated this as a moderate-to-high probability lead.",
        "confidence": 89
      }
    ]
  },
  {
    id: "td-0005",
    module: "tender-discovery",
    winningCompany: "Rural Development & Panchayat Raj Department, Govt. of Karnataka",
    location: "Ballari, Karnataka",
    date: "12 Feb 2026",
    dateISO: "2026-02-12",
    status: "Open Bidding",
    title: "Supply of Galvanized Corrugated Roofing Sheets for Rural Buildings",
    requirements: [
      {
        "category": "PRODUCT ELIGIBILITY CHECKED",
        "detail": "GC roofing sheets 0.45–0.63 mm, zinc-coated; JSW GI/GC products fully match"
      },
      {
        "category": "SPECIFICATION COMPLIANCE CHECKED",
        "detail": "IS 277 coating, minimum zinc coating 120 GSM; colour not mandatory but permitted"
      },
      {
        "category": "VOLUME & DISTRIBUTION CHECKED",
        "detail": "Approx. 900 MT distributed across multiple talukas; small-lot dispatch capability needed"
      },
      {
        "category": "SITE & HANDLING CHECKED",
        "detail": "Rural delivery points accessible by truck; bundling and edge protection specified"
      },
      {
        "category": "COMPETITION & LOCAL SUPPLIERS CHECKED",
        "detail": "Local stockists will participate; primary mill backing gives quality and brand advantage"
      },
      {
        "category": "LOGISTICS & ACCESS CHECKED",
        "detail": "Very close to JSW Vijayanagar; short-haul trucking with multiple drop points feasible"
      }
    ],
    quote: "Nearby rural roofing tender with perfect JSW coated product fit and minimal freight.",
    aiAction: "AI Decision Logic",
    leadScore: 86,
    leadProbability: "High Probability",
    totalValue: "₹11 Cr",
    totalValueAmount: 110000000,
    valueSource: "Inferred from BOQ quantities",
    deadline: "12 March, 2026",
    daysLeft: 21,
    nearestSupply: "40 km",
    logisticsDetail: "Short-haul Truck via JSW Vijayanagar (Ballari, Karnataka)",
    additionalBadge: "Karnataka e-Procurement",
    sourcePortal: "Karnataka e-Procurement",
    contractValue: 110000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I checked that GC roofing sheets with IS 277 compliant zinc coating are required and aligned this with JSW’s GI/GC product catalog.",
        "confidence": 97
      },
      {
        "step": 2,
        "description": "I verified the GSM and thickness range specified and confirmed JSW can supply standard roofing profiles within those limits.",
        "confidence": 95
      },
      {
        "step": 3,
        "description": "I analysed the distribution of sites across talukas to ensure that multi-drop truck routes are practical from Vijayanagar.",
        "confidence": 92
      },
      {
        "step": 4,
        "description": "I recognised that local stockists may quote competing brands and therefore rated competition as medium.",
        "confidence": 88
      },
      {
        "step": 5,
        "description": "I evaluated the extremely short distance from JSW Vijayanagar to Ballari and marked logistics risk as very low.",
        "confidence": 98
      },
      {
        "step": 6,
        "description": "With strong product fit, brand pull and freight advantage, I set a high lead score and recommended proactive engagement with local dealers.",
        "confidence": 94
      }
    ]
  },
  {
    id: "td-0006",
    module: "tender-discovery",
    winningCompany: "Bangalore Metro Rail Corporation Limited (BMRCL)",
    location: "Bengaluru, Karnataka",
    date: "10 Feb 2026",
    dateISO: "2026-02-10",
    status: "Open Bidding",
    title: "Supply of Structural Steel Sections for Metro Depot and Viaduct Works",
    requirements: [
      {
        "category": "PRODUCT ELIGIBILITY CHECKED",
        "detail": "Rolled beams, channels, and angles in IS 2062 E250/E350; JSW structural sections applicable"
      },
      {
        "category": "SPECIFICATION COMPLIANCE CHECKED",
        "detail": "Rolled sections with ultrasonic testing and shot blasting; no built-up sections allowed for main members"
      },
      {
        "category": "VOLUME & PHASING CHECKED",
        "detail": "Approx. 4,500 MT over 18 months; phased deliveries aligned with construction milestones"
      },
      {
        "category": "QUALITY & APPROVAL CHECKED",
        "detail": "Approval of mill drawings and MTCs; JSW has prior metro project credentials"
      },
      {
        "category": "COMPETITION & FABRICATORS CHECKED",
        "detail": "Large fabricators may bundle supply+fabrication; standalone material supply still permitted"
      },
      {
        "category": "LOGISTICS & ACCESS CHECKED",
        "detail": "Bengaluru well-connected by road from JSW Vijayanagar; depot locations accessible by trailer"
      }
    ],
    quote: "Long-duration metro structural steel contract with good JSW section fit and strong strategic value.",
    aiAction: "AI Decision Logic",
    leadScore: 82,
    leadProbability: "High Probability",
    totalValue: "₹68 Cr",
    totalValueAmount: 680000000,
    valueSource: "As per tender summary",
    deadline: "29 March, 2026",
    daysLeft: 38,
    nearestSupply: "330 km",
    logisticsDetail: "Road via JSW Vijayanagar (Ballari, Karnataka)",
    additionalBadge: "BMRCL e-Tender",
    sourcePortal: "BMRCL e-Tender",
    contractValue: 680000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I extracted the list of required rolled sections and confirmed JSW’s structural range covers beams, channels, and angles in the specified grades.",
        "confidence": 96
      },
      {
        "step": 2,
        "description": "I checked technical clauses to ensure rolled, not built-up, sections are required for primary members, which favours mill-rolled material.",
        "confidence": 92
      },
      {
        "step": 3,
        "description": "I reviewed the delivery schedule and matched it against typical metro project phasing to estimate monthly tonnage.",
        "confidence": 90
      },
      {
        "step": 4,
        "description": "I validated that BMRCL accepts mill approvals and MTCs from JSW, referencing earlier metro package supplies.",
        "confidence": 89
      },
      {
        "step": 5,
        "description": "I evaluated the risk of fabricators bundling supply and suggested positioning JSW as preferred mill supplier to those EPCs.",
        "confidence": 87
      },
      {
        "step": 6,
        "description": "Given good product match, medium competition, and reasonable logistics distance, I rated this as a high-priority strategic tender.",
        "confidence": 93
      }
    ]
  },
  {
    id: "td-0007",
    module: "tender-discovery",
    winningCompany: "Gujarat Energy Development Agency (GEDA)",
    location: "Jamnagar, Gujarat",
    date: "08 Feb 2026",
    dateISO: "2026-02-08",
    status: "Open Bidding",
    title: "Supply of Colour Coated Steel Coils for Solar Structure Fabrication",
    requirements: [
      {
        "category": "PRODUCT ELIGIBILITY CHECKED",
        "detail": "PPGL/PPGI colour coated coils in 0.8–1.2 mm; JSW coated products suitable for solar applications"
      },
      {
        "category": "SPECIFICATION COMPLIANCE CHECKED",
        "detail": "AZ150 / Z275 coating, RMP/SDP paint system with high UV resistance; coil ID and OD as per standard"
      },
      {
        "category": "VOLUME & DISPATCH CHECKED",
        "detail": "Approx. 3,200 MT over 9 months; dispatches to multiple solar parks near Jamnagar"
      },
      {
        "category": "QUALITY & WARRANTY CHECKED",
        "detail": "Minimum 15-year warranty on coating; JSW standard performance warranty acceptable"
      },
      {
        "category": "COMPETITION & OEM BIAS CHECKED",
        "detail": "Competition from other colour-coated brands; no single-make but performance specs are strict"
      },
      {
        "category": "LOGISTICS & ACCESS CHECKED",
        "detail": "Best served from JSW coated facilities at Tarapur/Dolvi with road transport to Jamnagar"
      }
    ],
    quote: "High-spec colour-coated solar application with strong JSW coated positioning and moderate distance.",
    aiAction: "AI Decision Logic",
    leadScore: 80,
    leadProbability: "High Probability",
    totalValue: "₹27 Cr",
    totalValueAmount: 270000000,
    valueSource: "Inferred from project MW capacity",
    deadline: "08 April, 2026",
    daysLeft: 48,
    nearestSupply: "650 km",
    logisticsDetail: "Road via JSW Tarapur / Dolvi (Maharashtra)",
    additionalBadge: "Gujarat e-Procurement",
    sourcePortal: "Gujarat e-Procurement",
    contractValue: 270000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I read the coating and paint system requirements and confirmed that JSW colour-coated coils meet AZ150/Z275 and UV performance criteria.",
        "confidence": 95
      },
      {
        "step": 2,
        "description": "I compared coil dimensional requirements with JSW’s standard coil IDs/ODs and found no constraint.",
        "confidence": 94
      },
      {
        "step": 3,
        "description": "I assessed volume and phase-wise dispatch to nearby solar parks, ensuring that JSW’s coated lines can support the monthly tonnage.",
        "confidence": 91
      },
      {
        "step": 4,
        "description": "I checked warranty conditions and aligned them with JSW’s standard performance warranty documents.",
        "confidence": 92
      },
      {
        "step": 5,
        "description": "I evaluated logistics options from Tarapur and Dolvi and selected the optimal mix of road routes.",
        "confidence": 90
      },
      {
        "step": 6,
        "description": "Due to good technical fit and strategic renewables segment focus, I assigned a high but not maximum lead score.",
        "confidence": 89
      }
    ]
  },
  {
    id: "td-0008",
    module: "tender-discovery",
    winningCompany: "Transmission Corporation of Telangana Limited (TSTRANSCO)",
    location: "Warangal, Telangana",
    date: "06 Feb 2026",
    dateISO: "2026-02-06",
    status: "Open Bidding",
    title: "Supply of Galvanized Tower Parts and Structural Angles for 220 kV Lines",
    requirements: [
      {
        "category": "PRODUCT ELIGIBILITY CHECKED",
        "detail": "Structural angles and flats in IS 2062 E250; suitable from JSW structural/merchant range"
      },
      {
        "category": "SPECIFICATION COMPLIANCE CHECKED",
        "detail": "Hot-dip galvanizing after fabrication; base steel chemistry as per IS 2062"
      },
      {
        "category": "VOLUME & PROJECT SIZE CHECKED",
        "detail": "Approx. 2,800 MT across multiple transmission line packages"
      },
      {
        "category": "BUYER & PAYMENT RISK CHECKED",
        "detail": "State transmission utility with standard payment terms and performance guarantees"
      },
      {
        "category": "COMPETITION & EPC BUNDLING CHECKED",
        "detail": "EPC contractors likely to bundle supply and erection; JSW to target them as key accounts"
      },
      {
        "category": "LOGISTICS & ACCESS CHECKED",
        "detail": "Warangal reachable by road from JSW Vijayanagar with multi-drop options for EPC yards"
      }
    ],
    quote: "Transmission tower steel opportunity via EPCs with reasonable distance from Vijayanagar.",
    aiAction: "AI Decision Logic",
    leadScore: 70,
    leadProbability: "Moderate Probability",
    totalValue: "₹24 Cr",
    totalValueAmount: 240000000,
    valueSource: "As per NIT BOQ",
    deadline: "20 March, 2026",
    daysLeft: 29,
    nearestSupply: "460 km",
    logisticsDetail: "Road via JSW Vijayanagar (Ballari, Karnataka)",
    additionalBadge: "Telangana e-Procurement",
    sourcePortal: "Telangana e-Procurement",
    contractValue: 240000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I mapped the required angle and flat sizes to JSW’s structural steel portfolio in IS 2062 E250.",
        "confidence": 94
      },
      {
        "step": 2,
        "description": "I checked galvanizing requirements and confirmed that the tender needs bare steel supply, with galvanizing done by fabricators.",
        "confidence": 93
      },
      {
        "step": 3,
        "description": "I estimated total tonnage per line package and verified that JSW rolling plans can serve bundled EPC orders.",
        "confidence": 90
      },
      {
        "step": 4,
        "description": "I evaluated TSTRANSCO’s buyer profile and standard payment mechanisms to rate financial risk as acceptable.",
        "confidence": 88
      },
      {
        "step": 5,
        "description": "I recognised that EPCs, not TSTRANSCO directly, will be the primary buyers, so I flagged account-mapping as critical.",
        "confidence": 89
      },
      {
        "step": 6,
        "description": "Considering product fit and medium logistics cost, I assigned a moderate lead score with focus on EPC engagement.",
        "confidence": 87
      }
    ]
  },
  {
    id: "td-0009",
    module: "tender-discovery",
    winningCompany: "Indian Oil Corporation Limited (IOCL) - Paradip Refinery",
    location: "Paradip, Odisha",
    date: "04 Feb 2026",
    dateISO: "2026-02-04",
    status: "Open Bidding",
    title: "Supply of Pressure Vessel Quality Steel Plates for LPG Bullet Fabrication",
    requirements: [
      {
        "category": "PRODUCT ELIGIBILITY CHECKED",
        "detail": "High-strength pressure vessel quality plates; JSW HR plates in specified grades usable via approved routes"
      },
      {
        "category": "SPECIFICATION COMPLIANCE CHECKED",
        "detail": "As per IS 2002 / equivalent; impact-tested plates with specific chemistry and NDT requirements"
      },
      {
        "category": "VOLUME & PROJECT SIZE CHECKED",
        "detail": "Approx. 1,200 MT for LPG bullets and allied vessels"
      },
      {
        "category": "QUALITY & APPROVAL CHECKED",
        "detail": "Mill approval and sample test plates required; IOCL-approved mill status advantageous"
      },
      {
        "category": "COMPETITION & RISK CHECKED",
        "detail": "Limited competition from a few approved mills; high entry barrier but better margins"
      },
      {
        "category": "LOGISTICS & ACCESS CHECKED",
        "detail": "Rail/road combination from JSW Vijayanagar to fabrication yard near Paradip"
      }
    ],
    quote: "Niche pressure vessel plate tender with limited competitor set and moderate distance.",
    aiAction: "AI Decision Logic",
    leadScore: 78,
    leadProbability: "High Probability",
    totalValue: "₹36 Cr",
    totalValueAmount: 360000000,
    valueSource: "Inferred from engineer’s estimate",
    deadline: "30 March, 2026",
    daysLeft: 39,
    nearestSupply: "1150 km",
    logisticsDetail: "Rail+Truck via JSW Vijayanagar (Ballari, Karnataka)",
    additionalBadge: "IOCL e-Tender Portal",
    sourcePortal: "IOCL e-Tender Portal",
    contractValue: 360000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I read the plate grade and impact test requirements and aligned them with JSW’s pressure vessel-capable HR plate grades.",
        "confidence": 92
      },
      {
        "step": 2,
        "description": "I confirmed that the tender calls for IS 2002 / equivalent and full NDT, which JSW can support with enhanced QA documentation.",
        "confidence": 91
      },
      {
        "step": 3,
        "description": "I estimated plate tonnage from vessel dimensions and checked that JSW rolling capabilities cover the thickness range.",
        "confidence": 90
      },
      {
        "step": 4,
        "description": "I evaluated IOCL’s pre-approved mill list and inferred that only a few integrated producers can qualify, reducing competition.",
        "confidence": 88
      },
      {
        "step": 5,
        "description": "I assessed logistics from Vijayanagar to Paradip via rail and last-mile trucking to the fabrication contractor.",
        "confidence": 89
      },
      {
        "step": 6,
        "description": "Given specialised specs and good margins but higher qualification requirements, I set a high but cautious lead score.",
        "confidence": 88
      }
    ]
  },
  {
    id: "td-0010",
    module: "tender-discovery",
    winningCompany: "Maharashtra Housing and Area Development Authority (MHADA)",
    location: "Thane, Maharashtra",
    date: "14 Feb 2026",
    dateISO: "2026-02-14",
    status: "Open Bidding",
    title: "Supply of Fe500D TMT Bars for High-Rise Affordable Housing Project",
    requirements: [
      {
        "category": "PRODUCT ELIGIBILITY CHECKED",
        "detail": "Fe500D TMT bars 8–32 mm; JSW Neosteel suitable for all diameters"
      },
      {
        "category": "SPECIFICATION COMPLIANCE CHECKED",
        "detail": "IS 1786:2008 with earthquake-resistant design; ductility and bend test requirements specified"
      },
      {
        "category": "VOLUME & PHASING CHECKED",
        "detail": "Approx. 6,000 MT over 24 months; phased as per tower-wise construction schedule"
      },
      {
        "category": "BUYER & PAYMENT RISK CHECKED",
        "detail": "State housing board with government-backed funding; moderate payment timelines"
      },
      {
        "category": "COMPETITION & DEALER NETWORK CHECKED",
        "detail": "Strong presence of local TMT brands; JSW’s Mumbai–Thane dealer network can support site delivery"
      },
      {
        "category": "LOGISTICS & ACCESS CHECKED",
        "detail": "Short distance from JSW Dolvi to Thane via road; site access for trailers available"
      }
    ],
    quote: "Large housing TMT requirement near Dolvi with strong JSW Neosteel and dealer presence.",
    aiAction: "AI Decision Logic",
    leadScore: 90,
    leadProbability: "High Probability",
    totalValue: "₹52 Cr",
    totalValueAmount: 520000000,
    valueSource: "As per MHADA cost estimate",
    deadline: "22 March, 2026",
    daysLeft: 31,
    nearestSupply: "100 km",
    logisticsDetail: "Road via JSW Dolvi (Raigad, Maharashtra)",
    additionalBadge: "Maharashtra e-Tender",
    sourcePortal: "Maharashtra e-Tender",
    contractValue: 520000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I validated that Fe500D across 8–32 mm is required and matched it exactly with JSW Neosteel SKUs.",
        "confidence": 98
      },
      {
        "step": 2,
        "description": "I reviewed seismic and ductility clauses and confirmed that JSW Neosteel meets the specified performance.",
        "confidence": 95
      },
      {
        "step": 3,
        "description": "I analysed tower-wise schedule to understand monthly steel drawdown and ensure stable supply planning.",
        "confidence": 92
      },
      {
        "step": 4,
        "description": "I classified MHADA as a medium-risk government buyer with secure funding but slower bill clearance.",
        "confidence": 88
      },
      {
        "step": 5,
        "description": "I checked JSW’s existing dealer and distributor network in Thane–Mumbai region for last-mile delivery capacity.",
        "confidence": 93
      },
      {
        "step": 6,
        "description": "With excellent logistics proximity and product fit, I assigned a high lead score and recommended strong follow-up.",
        "confidence": 95
      }
    ]
  },
  {
    id: "td-0011",
    module: "tender-discovery",
    winningCompany: "NTPC Limited – Simhadri Super Thermal Power Project",
    location: "Visakhapatnam, Andhra Pradesh",
    date: "13 Feb 2026",
    dateISO: "2026-02-13",
    status: "Open Bidding",
    title: "Supply of IS 3502 Chequered Plates and MS Angles for Coal Handling Plant Walkways",
    requirements: [
      {
        "category": "PRODUCT ELIGIBILITY CHECKED",
        "detail": "IS 3502 chequered plates (6–10 mm) and IS 2062 MS angles required; JSW HR plate and structural range covers both"
      },
      {
        "category": "SPECIFICATION COMPLIANCE CHECKED",
        "detail": "Grade E250 for plates and angles; JSW MTCs aligned to IS 2062 accepted"
      },
      {
        "category": "VOLUME & PACKING CHECKED",
        "detail": "Approx. 480 MT combined; can be dispatched in single JSW consignment with mixed bundling"
      },
      {
        "category": "BUYER & PAYMENT RISK CHECKED",
        "detail": "NTPC is AAA-rated central PSU with strong payment track record via letter of credit"
      },
      {
        "category": "COMPETITION & OEM BIAS CHECKED",
        "detail": "No brand lock-in; any BIS-certified primary producer accepted; medium competition"
      },
      {
        "category": "LOGISTICS & ACCESS CHECKED",
        "detail": "JSW Vijayanagar to Vizag via NH-16; road freight feasible under 550 km"
      }
    ],
    quote: "Reliable NTPC PSU buyer with clean product fit and short road haul from Vijayanagar.",
    aiAction: "AI Decision Logic",
    leadScore: 77,
    leadProbability: "Moderate Probability",
    totalValue: "₹8.2 Cr",
    totalValueAmount: 82000000,
    valueSource: "Inferred from EMD 2%",
    deadline: "06 March, 2026",
    daysLeft: 15,
    nearestSupply: "550 km",
    logisticsDetail: "Road via JSW Vijayanagar (Ballari, Karnataka)",
    additionalBadge: "NTPC e-Tender Portal",
    sourcePortal: "NTPC e-Tender Portal",
    contractValue: 82000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I parsed the NIT and confirmed that IS 3502 chequered plates and IS 2062 angles are explicitly listed as mandatory items.",
        "confidence": 96
      },
      {
        "step": 2,
        "description": "I checked the grade and thickness matrix and verified that JSW HR plate and structural portfolios cover all specified sizes.",
        "confidence": 95
      },
      {
        "step": 3,
        "description": "I estimated combined tonnage from the BOQ line items and found the total feasible for a single dispatch lot.",
        "confidence": 91
      },
      {
        "step": 4,
        "description": "I assessed NTPC Simhadri's buyer profile and confirmed it as the highest-trust PSU category with LC-backed payments.",
        "confidence": 97
      },
      {
        "step": 5,
        "description": "I reviewed competition landscape and found no exclusive OEM or domestic brand clause restricting primary producers.",
        "confidence": 92
      },
      {
        "step": 6,
        "description": "I calculated road distance from JSW Vijayanagar to Visakhapatnam and rated logistics risk as low with a single NH-16 truck lane.",
        "confidence": 93
      }
    ]
  },
  {
    id: "td-0012",
    module: "tender-discovery",
    winningCompany: "National Highways Authority of India (NHAI) – NH-60 Package",
    location: "Nashik, Maharashtra",
    date: "11 Feb 2026",
    dateISO: "2026-02-11",
    status: "Open Bidding",
    title: "Supply of ISMB and ISMC Structural Sections for Road Over Bridge at Nashik Bypass",
    requirements: [
      {
        "category": "PRODUCT ELIGIBILITY CHECKED",
        "detail": "ISMB 400/500 and ISMC 300/350 in IS 2062 E350; JSW structural section range covers these profiles"
      },
      {
        "category": "SPECIFICATION COMPLIANCE CHECKED",
        "detail": "Sections to conform to IS 808:1989 with dimensional tolerances; no built-up alternatives allowed for main girders"
      },
      {
        "category": "VOLUME & PHASING CHECKED",
        "detail": "Approx. 1,100 MT; phased delivery over 6 months aligned to bridge erection sequence"
      },
      {
        "category": "BUYER & PAYMENT RISK CHECKED",
        "detail": "NHAI funds via MORTH escrow; strong payment security with RA billing for infra works"
      },
      {
        "category": "COMPETITION & EPC STRUCTURE CHECKED",
        "detail": "EPC contractor will procure steel; JSW to target L&T/Afcons/PNC EPC vendor list"
      },
      {
        "category": "LOGISTICS & ACCESS CHECKED",
        "detail": "JSW Dolvi to Nashik via Mumbai-Nashik highway NH-160D; ~220 km with regular truck services"
      }
    ],
    quote: "High-visibility NHAI bridge project with prime proximity to JSW Dolvi and structured EPC demand.",
    aiAction: "AI Decision Logic",
    leadScore: 83,
    leadProbability: "High Probability",
    totalValue: "₹18.5 Cr",
    totalValueAmount: 185000000,
    valueSource: "As per tender BOQ",
    deadline: "14 March, 2026",
    daysLeft: 23,
    nearestSupply: "220 km",
    logisticsDetail: "Road via JSW Dolvi (Raigad, Maharashtra)",
    additionalBadge: "NHAI e-Procurement",
    sourcePortal: "NHAI e-Procurement",
    contractValue: 185000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I identified the specific ISMB and ISMC profiles and matched them to JSW's structural section rolling schedule.",
        "confidence": 95
      },
      {
        "step": 2,
        "description": "I confirmed through NIT clauses that IS 808-compliant rolled sections are mandatory and no fabricated alternatives are permitted for primary girders.",
        "confidence": 93
      },
      {
        "step": 3,
        "description": "I mapped the delivery phases to bridge erection milestones and estimated monthly offtake at approximately 180 MT.",
        "confidence": 90
      },
      {
        "step": 4,
        "description": "I evaluated NHAI's payment mechanism and rated financial risk as very low given MORTH escrow funding structure.",
        "confidence": 96
      },
      {
        "step": 5,
        "description": "I identified the EPC contractor and flagged key account contacts at L&T Infrastructure for advance engagement.",
        "confidence": 88
      },
      {
        "step": 6,
        "description": "I computed the 220 km road distance from JSW Dolvi and rated logistics as optimal for frequent just-in-time site deliveries.",
        "confidence": 97
      }
    ]
  },
  {
    id: "td-0013",
    module: "tender-discovery",
    winningCompany: "Rajasthan Rajya Vidyut Prasaran Nigam Limited (RRVPNL)",
    location: "Bikaner, Rajasthan",
    date: "07 Feb 2026",
    dateISO: "2026-02-07",
    status: "Open Bidding",
    title: "Supply of Base Steel Angles and Flats for 132kV Transmission Tower Fabrication",
    requirements: [
      {
        "category": "PRODUCT ELIGIBILITY CHECKED",
        "detail": "Equal angles 50×50 to 150×150 mm and flats in IS 2062 E250; JSW structural angles mapped to all sizes"
      },
      {
        "category": "SPECIFICATION COMPLIANCE CHECKED",
        "detail": "Chemistry specified for post-galvanizing performance; JSW base steel chemistry compliant"
      },
      {
        "category": "VOLUME & TOWER PACKAGE CHECKED",
        "detail": "Approx. 3,800 MT across tower body and leg members; phased against tower erection programme"
      },
      {
        "category": "BUYER & PAYMENT RISK CHECKED",
        "detail": "State utility with Rajasthan Govt backing; payment slightly delayed but bank guarantee backed"
      },
      {
        "category": "COMPETITION & REGIONAL MILLS CHECKED",
        "detail": "Regional rerollers competitive on price; JSW primary mill quality and chemistry certificate advantage"
      },
      {
        "category": "LOGISTICS & ACCESS CHECKED",
        "detail": "Rail from JSW Dolvi to Bikaner via Phulera junction; last-mile truck to fabrication yards"
      }
    ],
    quote: "Large transmission tower steel order with long rail haul but limited qualified competition.",
    aiAction: "AI Decision Logic",
    leadScore: 68,
    leadProbability: "Moderate Probability",
    totalValue: "₹33 Cr",
    totalValueAmount: 330000000,
    valueSource: "As per NIT estimate",
    deadline: "20 March, 2026",
    daysLeft: 29,
    nearestSupply: "1200 km",
    logisticsDetail: "Rail+Truck via JSW Dolvi (Raigad, Maharashtra)",
    additionalBadge: "Rajasthan e-Procurement",
    sourcePortal: "Rajasthan e-Procurement",
    contractValue: 330000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I listed all angle and flat sizes from the schedule of materials and confirmed JSW's structural rolling covers the full range.",
        "confidence": 94
      },
      {
        "step": 2,
        "description": "I reviewed the chemistry requirements for galvanizability and confirmed JSW's standard E250 meets silicon and phosphorous limits.",
        "confidence": 92
      },
      {
        "step": 3,
        "description": "I estimated tonnage per tower type and verified aggregate quantity of 3,800 MT from the attached tower design schedule.",
        "confidence": 91
      },
      {
        "step": 4,
        "description": "I evaluated RRVPNL's payment history using past tender data and flagged moderate delay risk, recommending bank guarantee cover.",
        "confidence": 86
      },
      {
        "step": 5,
        "description": "I assessed competition from regional rerollers and noted that chemistry certification for galvanizing favours primary producers like JSW.",
        "confidence": 89
      },
      {
        "step": 6,
        "description": "I computed rail route from Dolvi to Bikaner via Phulera and estimated 4–5 day transit, acceptable for phased site dispatches.",
        "confidence": 88
      }
    ]
  },
  {
    id: "td-0014",
    module: "tender-discovery",
    winningCompany: "Delhi Metro Rail Corporation (DMRC) – Phase IV",
    location: "New Delhi, Delhi",
    date: "17 Feb 2026",
    dateISO: "2026-02-17",
    status: "Open Bidding",
    title: "Supply of IS 2062 E350 Structural Steel Plates for Phase IV Viaduct and Station Box Fabrication",
    requirements: [
      {
        "category": "PRODUCT ELIGIBILITY CHECKED",
        "detail": "IS 2062 E350 plates in 10–50 mm; JSW HR plate E350 grades fully applicable"
      },
      {
        "category": "SPECIFICATION COMPLIANCE CHECKED",
        "detail": "Charpy impact testing at 0°C and ultrasonic testing mandatory; JSW enhanced MTC protocol applicable"
      },
      {
        "category": "VOLUME & PHASING CHECKED",
        "detail": "Approx. 7,200 MT over 24 months against station and viaduct package milestones"
      },
      {
        "category": "QUALITY & METRO APPROVAL CHECKED",
        "detail": "DMRC requires mill approval and prior metro project credentials; JSW has metro references from Bangalore and Mumbai"
      },
      {
        "category": "COMPETITION & APPROVED MILLS CHECKED",
        "detail": "Short-listed mill approval limits competition; JSW on DMRC approved vendor list expected based on previous supplies"
      },
      {
        "category": "LOGISTICS & ACCESS CHECKED",
        "detail": "Rail from JSW Dolvi to Delhi via Western Railway; approx 5–6 day transit to Delhi NCR unloading yard"
      }
    ],
    quote: "Premier metro Phase IV plate contract with long duration and large volume; rail logistics manageable.",
    aiAction: "AI Decision Logic",
    leadScore: 75,
    leadProbability: "Moderate Probability",
    totalValue: "₹95 Cr",
    totalValueAmount: 950000000,
    valueSource: "As per BOQ summary",
    deadline: "25 March, 2026",
    daysLeft: 34,
    nearestSupply: "1400 km",
    logisticsDetail: "Rail via JSW Dolvi (Raigad, Maharashtra)",
    additionalBadge: "DMRC e-Tender",
    sourcePortal: "DMRC e-Tender",
    contractValue: 950000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I extracted the plate thickness schedule and impact test requirement and confirmed JSW E350 HR plate can meet all mechanical clauses.",
        "confidence": 94
      },
      {
        "step": 2,
        "description": "I verified the mandatory ultrasonic testing requirement and confirmed JSW's QA lab can issue UT certificates for all supplied plates.",
        "confidence": 93
      },
      {
        "step": 3,
        "description": "I estimated monthly plate drawdown from the 24-month schedule and validated JSW rolling capacity against this throughput.",
        "confidence": 91
      },
      {
        "step": 4,
        "description": "I cross-referenced DMRC's approved mill list with JSW's credentials from earlier Phase III supplies to assess likelihood of qualification.",
        "confidence": 89
      },
      {
        "step": 5,
        "description": "I flagged the competitive advantage of limited approved mills and recommended early submission of mill qualification documents.",
        "confidence": 90
      },
      {
        "step": 6,
        "description": "I evaluated long-haul rail from Dolvi to Delhi NCR and estimated freight addition as manageable within competitive pricing band.",
        "confidence": 87
      }
    ]
  },
  {
    id: "td-0015",
    module: "tender-discovery",
    winningCompany: "Tamil Nadu Generation and Distribution Corporation (TANGEDCO) – Mettur Thermal",
    location: "Mettur Dam, Tamil Nadu",
    date: "10 Feb 2026",
    dateISO: "2026-02-10",
    status: "Open Bidding",
    title: "Supply of MS Plates and Structural Sections for Boiler House Extension at Mettur Thermal Station",
    requirements: [
      {
        "category": "PRODUCT ELIGIBILITY CHECKED",
        "detail": "IS 2062 E250/E350 MS plates (6–40 mm) and ISMC/ISA sections; JSW range covers all items"
      },
      {
        "category": "SPECIFICATION COMPLIANCE CHECKED",
        "detail": "BIS marked material with batch-wise MTCs; standard JSW plate and section documentation accepted"
      },
      {
        "category": "VOLUME & SITE CHECKED",
        "detail": "Approx. 820 MT; mixed plates and sections for structural extension; staged site delivery"
      },
      {
        "category": "BUYER & PAYMENT RISK CHECKED",
        "detail": "State generation utility; payment history moderate with standard 60-day credit cycle and advance mobilisation"
      },
      {
        "category": "COMPETITION & REGIONAL PRESENCE CHECKED",
        "detail": "JSW Salem plant is the closest integrated mill; strong freight advantage over other primary producers"
      },
      {
        "category": "LOGISTICS & ACCESS CHECKED",
        "detail": "Mettur is ~130 km from JSW Salem; direct truck movement; best-in-class freight economics"
      }
    ],
    quote: "Ideal proximity match with JSW Salem; lowest freight cost of all active tenders in the south.",
    aiAction: "AI Decision Logic",
    leadScore: 85,
    leadProbability: "High Probability",
    totalValue: "₹9.8 Cr",
    totalValueAmount: 98000000,
    valueSource: "Inferred from engineer's estimate",
    deadline: "12 March, 2026",
    daysLeft: 21,
    nearestSupply: "130 km",
    logisticsDetail: "Road via JSW Salem (Salem, Tamil Nadu)",
    additionalBadge: "TANGEDCO e-Tender",
    sourcePortal: "TANGEDCO e-Tender",
    contractValue: 98000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I verified that the specified plates and sections are standard IS 2062 grades and matched them line by line to JSW Salem's product output.",
        "confidence": 97
      },
      {
        "step": 2,
        "description": "I confirmed that no BIS brand exclusivity is mentioned and that JSW Salem's certifications are fully compliant.",
        "confidence": 96
      },
      {
        "step": 3,
        "description": "I estimated site delivery cadence from construction phasing documents and validated that 820 MT is within a single rolling cycle.",
        "confidence": 93
      },
      {
        "step": 4,
        "description": "I evaluated TANGEDCO's payment patterns from available PSU data and flagged a 60-day credit risk as acceptable.",
        "confidence": 87
      },
      {
        "step": 5,
        "description": "I mapped competing mills and found that JSW Salem is the only integrated mill within 300 km of Mettur, giving a clear freight edge.",
        "confidence": 98
      },
      {
        "step": 6,
        "description": "I confirmed truck route from JSW Salem to Mettur Dam is a straightforward 130 km, and rated logistics as the best in the current portfolio.",
        "confidence": 99
      }
    ]
  },
  {
    id: "td-0016",
    module: "tender-discovery",
    winningCompany: "Hindustan Petroleum Corporation Limited (HPCL) – Visakhapatnam Refinery",
    location: "Visakhapatnam, Andhra Pradesh",
    date: "03 Feb 2026",
    dateISO: "2026-02-03",
    status: "Open Bidding",
    title: "Supply of Carbon Steel Plates for Reactor Shell, Column, and Heat Exchanger Fabrication",
    requirements: [
      {
        "category": "PRODUCT ELIGIBILITY CHECKED",
        "detail": "IS 2002 Grade 2A/3A and IS 2062 E350 plates in 12–80 mm; JSW HR plate range applicable with enhanced quality assurance"
      },
      {
        "category": "SPECIFICATION COMPLIANCE CHECKED",
        "detail": "ASME Section II equivalent chemistry, Charpy impact and UT mandatory; JSW test certification capability confirmed"
      },
      {
        "category": "VOLUME & PROJECT SIZE CHECKED",
        "detail": "Approx. 1,600 MT across multiple pressure vessel packages; call-off over 15 months"
      },
      {
        "category": "QUALITY & APPROVAL CHECKED",
        "detail": "HPCL requires pre-approved mill status; JSW already qualified under HPCL's vendor registration"
      },
      {
        "category": "COMPETITION & APPROVED MILL LIST CHECKED",
        "detail": "Only 3–4 mills qualify for thick section pressure vessel plates; limited competition at HPCL"
      },
      {
        "category": "LOGISTICS & ACCESS CHECKED",
        "detail": "Rail + truck from JSW Vijayanagar to Vizag; well-established freight lane, ~550 km"
      }
    ],
    quote: "High-margin pressure vessel plates with pre-approved JSW status and manageable Vijayanagar logistics.",
    aiAction: "AI Decision Logic",
    leadScore: 80,
    leadProbability: "High Probability",
    totalValue: "₹44 Cr",
    totalValueAmount: 440000000,
    valueSource: "As per project cost estimate",
    deadline: "28 March, 2026",
    daysLeft: 37,
    nearestSupply: "550 km",
    logisticsDetail: "Rail+Truck via JSW Vijayanagar (Ballari, Karnataka)",
    additionalBadge: "HPCL Vendor Portal",
    sourcePortal: "HPCL Vendor Portal",
    contractValue: 440000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I extracted the specific IS 2002 and IS 2062 E350 plate grades and mapped them to JSW's pressure-vessel-capable HR plate grades.",
        "confidence": 93
      },
      {
        "step": 2,
        "description": "I confirmed that HPCL's test requirements, including Charpy impact at -20°C and 100% UT, are achievable by JSW's QA division.",
        "confidence": 91
      },
      {
        "step": 3,
        "description": "I estimated call-off schedule and monthly tonnage, validating that JSW's rolling capacity accommodates the phased demand.",
        "confidence": 90
      },
      {
        "step": 4,
        "description": "I checked HPCL's vendor registration database and confirmed JSW's pre-approved status for carbon steel plates.",
        "confidence": 95
      },
      {
        "step": 5,
        "description": "I compared the approved mill list and identified only three competing primary producers, improving JSW's selection odds.",
        "confidence": 89
      },
      {
        "step": 6,
        "description": "I assessed the Vijayanagar-to-Vizag freight lane and rated logistics as reliable with multiple rail rakes available per week.",
        "confidence": 92
      }
    ]
  },
  {
    id: "td-0017",
    module: "tender-discovery",
    winningCompany: "Uttarakhand Jal Vidyut Nigam Limited (UJVNL) – Tehri Pump Storage Stage II",
    location: "Tehri, Uttarakhand",
    date: "12 Feb 2026",
    dateISO: "2026-02-12",
    status: "Open Bidding",
    title: "Supply of Heavy HR Plates for Penstock and Butterfly Valve Fabrication",
    requirements: [
      {
        "category": "PRODUCT ELIGIBILITY CHECKED",
        "detail": "IS 2062 E350/E410 plates in 20–80 mm for penstock shells; JSW thick HR plate grades applicable"
      },
      {
        "category": "SPECIFICATION COMPLIANCE CHECKED",
        "detail": "Normalised plates with impact values and weld procedure qualification; JSW norm-treated plates available"
      },
      {
        "category": "VOLUME & PHASING CHECKED",
        "detail": "Approx. 1,900 MT over 18 months as per penstock fabrication sequence"
      },
      {
        "category": "SITE & HANDLING CHECKED",
        "detail": "Hilly terrain; heavy plates to be delivered to fabrication shop in Kotdwar, not directly to dam"
      },
      {
        "category": "COMPETITION & SPECIALIST RISK CHECKED",
        "detail": "Specialised order; only a few mills roll E410 normalised in 60–80 mm range; low competition"
      },
      {
        "category": "LOGISTICS & ACCESS CHECKED",
        "detail": "Rail from JSW Dolvi to Kotdwar rail head, then short truck to fabrication shop; mountainous last-mile caution"
      }
    ],
    quote: "Niche hydropower penstock plate order; long haul but specialised grade limits competition significantly.",
    aiAction: "AI Decision Logic",
    leadScore: 65,
    leadProbability: "Moderate Probability",
    totalValue: "₹22 Cr",
    totalValueAmount: 220000000,
    valueSource: "As per NIT project summary",
    deadline: "15 April, 2026",
    daysLeft: 55,
    nearestSupply: "1750 km",
    logisticsDetail: "Rail+Truck via JSW Dolvi (Raigad, Maharashtra)",
    additionalBadge: "UJVNL e-Tender",
    sourcePortal: "UJVNL e-Tender",
    contractValue: 220000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I identified E350/E410 normalised plate in heavy gauges as the core requirement and checked JSW's capability to supply normalised plates in up to 80 mm thickness.",
        "confidence": 91
      },
      {
        "step": 2,
        "description": "I confirmed that weld procedure qualification tests are a pre-supply requirement and flagged this for advance preparation by JSW's technical team.",
        "confidence": 89
      },
      {
        "step": 3,
        "description": "I mapped the penstock fabrication sequence to estimate monthly plate consumption and flagged that deliveries must align strictly with shop schedule.",
        "confidence": 88
      },
      {
        "step": 4,
        "description": "I noted that delivery is to the Kotdwar fabrication shop, not the dam site, significantly reducing mountainous logistics complexity.",
        "confidence": 90
      },
      {
        "step": 5,
        "description": "I surveyed competing mills capable of E410 normalised heavy plates and found only 2–3 qualified producers, improving JSW's win probability.",
        "confidence": 87
      },
      {
        "step": 6,
        "description": "I traced the rail route from Dolvi via Moradabad to Kotdwar and assessed freight and transit risk as moderate but manageable.",
        "confidence": 86
      }
    ]
  },
  {
    id: "td-0018",
    module: "tender-discovery",
    winningCompany: "West Bengal Housing Infrastructure Development Corporation (WBHIDCO)",
    location: "New Town, Kolkata, West Bengal",
    date: "16 Feb 2026",
    dateISO: "2026-02-16",
    status: "Open Bidding",
    title: "Supply of Fe500D TMT Rebars for New Town Phase III Mass Housing Project",
    requirements: [
      {
        "category": "PRODUCT ELIGIBILITY CHECKED",
        "detail": "Fe500D TMT bars 10–32 mm; JSW Neosteel fully covers this range"
      },
      {
        "category": "SPECIFICATION COMPLIANCE CHECKED",
        "detail": "IS 1786:2008 with seismic grade ductility; bend-rebend performance as per IS clause"
      },
      {
        "category": "VOLUME & DRAWDOWN CHECKED",
        "detail": "Approx. 9,500 MT over 30 months; monthly drawdown ~315 MT per tower cluster"
      },
      {
        "category": "BUYER & PAYMENT RISK CHECKED",
        "detail": "State housing corporation with West Bengal Govt backing; standard 90-day payment cycle"
      },
      {
        "category": "COMPETITION & EASTERN MILLS CHECKED",
        "detail": "SAIL and local rolling mills dominate east India; JSW must offer competitive freight from Dolvi by rail"
      },
      {
        "category": "LOGISTICS & ACCESS CHECKED",
        "detail": "JSW Dolvi to Kolkata via rail; ~1,900 km with rakes to Santragachi/Dankuni yard; short haul to site"
      }
    ],
    quote: "Large mass housing TMT opportunity but strong local/SAIL competition requires competitive rail freight strategy.",
    aiAction: "AI Decision Logic",
    leadScore: 71,
    leadProbability: "Moderate Probability",
    totalValue: "₹78 Cr",
    totalValueAmount: 780000000,
    valueSource: "As per BOQ summary",
    deadline: "02 April, 2026",
    daysLeft: 42,
    nearestSupply: "1900 km",
    logisticsDetail: "Rail via JSW Dolvi (Raigad, Maharashtra) → Dankuni Yard",
    additionalBadge: "West Bengal e-Tender",
    sourcePortal: "West Bengal e-Tender",
    contractValue: 780000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I confirmed Fe500D across 10–32 mm is required and matched it precisely to JSW Neosteel bar sizes and IS certification.",
        "confidence": 97
      },
      {
        "step": 2,
        "description": "I reviewed seismic ductility clauses and confirmed that JSW Neosteel meets all bend-rebend and elongation requirements.",
        "confidence": 95
      },
      {
        "step": 3,
        "description": "I analysed the monthly drawdown of ~315 MT per cluster and confirmed it aligns with manageable JSW rail dispatch cycles.",
        "confidence": 90
      },
      {
        "step": 4,
        "description": "I assessed WBHIDCO's payment cycle and flagged 90-day credit as standard for this category, recommending LC terms.",
        "confidence": 87
      },
      {
        "step": 5,
        "description": "I mapped competitive intensity in Eastern India and identified SAIL and local mills as dominant players; JSW quality premium must justify freight.",
        "confidence": 86
      },
      {
        "step": 6,
        "description": "I evaluated rail route from Dolvi to Dankuni yard and estimated 6–7 day transit, viable for site phased delivery.",
        "confidence": 88
      }
    ]
  },
  {
    id: "td-0019",
    module: "tender-discovery",
    winningCompany: "GMR Hyderabad International Airport Ltd (GHIAL)",
    location: "Hyderabad, Telangana",
    date: "14 Feb 2026",
    dateISO: "2026-02-14",
    status: "Open Bidding",
    title: "Supply of Structural Steel Sections and Plates for Terminal 2 Expansion and Elevated Roadway",
    requirements: [
      {
        "category": "PRODUCT ELIGIBILITY CHECKED",
        "detail": "ISMB 600, ISMC 400 sections and IS 2062 E350 plates for roofing steel and elevated road structure; JSW full coverage"
      },
      {
        "category": "SPECIFICATION COMPLIANCE CHECKED",
        "detail": "IS 808 dimensional tolerances and IS 2062 chemistry; GHIAL requires third-party inspection at mill"
      },
      {
        "category": "VOLUME & TIMELINE CHECKED",
        "detail": "Approx. 6,800 MT over 20 months with critical path delivery for terminal canopy steel"
      },
      {
        "category": "QUALITY & THIRD-PARTY INSPECTION CHECKED",
        "detail": "TPI by Bureau Veritas or RINA at mill; JSW has prior TPI protocol for international airport projects"
      },
      {
        "category": "COMPETITION & EPC BUNDLING CHECKED",
        "detail": "Main EPC is Larsen & Toubro; steel procurement channel through L&T Procurement; JSW preferred supplier history"
      },
      {
        "category": "LOGISTICS & ACCESS CHECKED",
        "detail": "JSW Vijayanagar to Hyderabad via NH-44; 280 km road, high-frequency truck availability"
      }
    ],
    quote: "Premium airport infra contract with excellent JSW proximity and strong L&T EPC channel relationship.",
    aiAction: "AI Decision Logic",
    leadScore: 86,
    leadProbability: "High Probability",
    totalValue: "₹130 Cr",
    totalValueAmount: 1300000000,
    valueSource: "As per project award announcement",
    deadline: "18 April, 2026",
    daysLeft: 58,
    nearestSupply: "280 km",
    logisticsDetail: "Road via JSW Vijayanagar (Ballari, Karnataka)",
    additionalBadge: "GHIAL Direct RFQ",
    sourcePortal: "GHIAL Direct RFQ",
    contractValue: 1300000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I reviewed the structural steel schedule and confirmed all section profiles and plate sizes are standard JSW catalogue items.",
        "confidence": 96
      },
      {
        "step": 2,
        "description": "I checked GHIAL's TPI requirement and confirmed JSW's existing Bureau Veritas inspection tie-up at Vijayanagar mill.",
        "confidence": 94
      },
      {
        "step": 3,
        "description": "I estimated critical-path delivery windows for canopy steel and flagged these as priority dispatch milestones for JSW planning.",
        "confidence": 91
      },
      {
        "step": 4,
        "description": "I verified JSW's preferred supplier history with L&T and recommended early engagement with L&T procurement team at project launch.",
        "confidence": 93
      },
      {
        "step": 5,
        "description": "I assessed competition and found that JSW's freight advantage from Vijayanagar (~280 km) significantly undercuts competing mills.",
        "confidence": 95
      },
      {
        "step": 6,
        "description": "Given premium project profile, proximity, and established EPC channel, I assigned a high lead score and flagged for key account escalation.",
        "confidence": 96
      }
    ]
  },
  {
    id: "td-0020",
    module: "tender-discovery",
    winningCompany: "GAIL (India) Limited – JHBDPL Project",
    location: "Varanasi, Uttar Pradesh",
    date: "15 Feb 2026",
    dateISO: "2026-02-15",
    status: "Open Bidding",
    title: "Supply of API 5L X65 Grade HRC Coils for Natural Gas Pipeline Fabrication – Varanasi Segment",
    requirements: [
      {
        "category": "PRODUCT ELIGIBILITY CHECKED",
        "detail": "API 5L PSL2 X65 grade HRC coils in 10–16 mm thickness; JSW Dolvi coils applicable with API certification"
      },
      {
        "category": "SPECIFICATION COMPLIANCE CHECKED",
        "detail": "Strict sulphur/phosphorus chemistry, CVN impact test at -20°C and HIC testing mandatory; JSW can supply with enhanced heat parameters"
      },
      {
        "category": "VOLUME & PHASING CHECKED",
        "detail": "Approx. 14,000 MT over 12 months against pipeline welding programme"
      },
      {
        "category": "BUYER & PAYMENT RISK CHECKED",
        "detail": "GAIL is a Navratna PSU with AAA credit; payment via LC with advance mobilisation on award"
      },
      {
        "category": "COMPETITION & CERTIFICATION RISK CHECKED",
        "detail": "Only 2–3 mills carry valid API 5L X65 certification; JSW renewal of API cert essential before bid"
      },
      {
        "category": "LOGISTICS & ACCESS CHECKED",
        "detail": "Rail from JSW Dolvi to pipe mill at Varanasi via Central Railway; ~1,300 km with established rake routing"
      }
    ],
    quote: "Very high-value GAIL pipeline coil contract with limited competition but API certification renewal is a prerequisite.",
    aiAction: "AI Decision Logic",
    leadScore: 73,
    leadProbability: "Moderate Probability",
    totalValue: "₹160 Cr",
    totalValueAmount: 1600000000,
    valueSource: "As per pipeline project estimate",
    deadline: "08 April, 2026",
    daysLeft: 48,
    nearestSupply: "1300 km",
    logisticsDetail: "Rail via JSW Dolvi (Raigad, Maharashtra) → Varanasi",
    additionalBadge: "GAIL e-Tender Portal",
    sourcePortal: "GAIL e-Tender Portal",
    contractValue: 1600000000,
    reasoningSteps: [
      {
        "step": 1,
        "description": "I confirmed that API 5L PSL2 X65 is explicitly required and cross-checked JSW Dolvi's product range for relevant HRC coil thickness and grade output.",
        "confidence": 93
      },
      {
        "step": 2,
        "description": "I assessed the HIC testing and CVN impact requirements and flagged that JSW must submit enhanced heat chemistry records with the bid.",
        "confidence": 91
      },
      {
        "step": 3,
        "description": "I estimated 14,000 MT over 12 months and validated that this is within JSW Dolvi's annual coil production allocation for API grade customers.",
        "confidence": 90
      },
      {
        "step": 4,
        "description": "I confirmed GAIL's Navratna status and rated it as the best possible buyer profile in terms of payment security.",
        "confidence": 98
      },
      {
        "step": 5,
        "description": "I identified that only 2–3 domestic mills hold current API 5L X65 certification and flagged JSW's certification renewal status as a critical bid prerequisite.",
        "confidence": 94
      },
      {
        "step": 6,
        "description": "I evaluated the Dolvi-to-Varanasi rail route and estimated 4–5 day transit time with standard rake availability from Raigad marshalling yard.",
        "confidence": 89
      }
    ]
  },
  // Add other data here
]
