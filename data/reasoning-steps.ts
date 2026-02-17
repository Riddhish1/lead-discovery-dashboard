export interface ReasoningStep {
  step: number
  description: string
  confidence: number
}

export const getDefaultReasoningSteps = (leadScore: number): ReasoningStep[] => [
  {
    step: 1,
    description: "I parsed the tender and extracted the required steel items and specifications from the BOQ and SBD.",
    confidence: 95
  },
  {
    step: 2,
    description: "I matched the tender's plate types and thickness ranges to JSW Vijayanagar's flat steel production capabilities.",
    confidence: 98
  },
  {
    step: 3,
    description: "I checked the commercial eligibility clauses and found no disqualifying requirements for JSW.",
    confidence: 85
  },
  {
    step: 4,
    description: "I mapped delivery from Vijayanagar to Jabalpur and confirmed rail + road freight feasibility.",
    confidence: 92
  },
  {
    step: 5,
    description: `I evaluated competitive history and time windows and scored the opportunity ${leadScore}/100 based on product fit, logistics, timeline, and competition.`,
    confidence: 89
  }
]
