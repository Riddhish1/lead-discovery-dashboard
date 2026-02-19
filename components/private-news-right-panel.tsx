"use client"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Truck, ExternalLink, Sparkles } from "lucide-react"
import { LeadPropensityCard } from "./lead-propensity-card"

interface PrivateNewsRightPanelProps {
  leadScore: number
  leadProbability: string
  estSteelValue: string
  steelValueConfidence: string
  steelStart: string
  steelStartRelative: string
  nearestPlant: string
  plantDistance: string
  sourceName: string
  publishedDate: string
  sourceArticleUrl?: string
  aiAction: string
  onAIClick?: () => void
}

export function PrivateNewsRightPanel({
  leadScore,
  leadProbability,
  estSteelValue,
  steelValueConfidence,
  steelStart,
  steelStartRelative,
  nearestPlant,
  plantDistance,
  sourceName,
  publishedDate,
  sourceArticleUrl,
  aiAction,
  onAIClick,
}: PrivateNewsRightPanelProps) {
  return (
    <div className="border-l bg-gray-50 px-7 py-6 flex flex-col gap-4">
      {/* Lead Propensity */}
      <LeadPropensityCard
        score={leadScore}
        probabilityText={leadProbability}
      />

      <Separator />

      {/* Est. Steel Value */}
      <div>
        <p className="text-[13px] text-[#90A1B9] uppercase font-bold tracking-wider mb-1.5">
          Est. Steel Value
        </p>
        <p className="text-[32px] font-bold text-[#0F172B] leading-none tracking-tight">
          {estSteelValue}
        </p>
        <p className="text-[13px] text-[#90A1B9] mt-1.5">
          {steelValueConfidence}
        </p>
      </div>

      <Separator />

      {/* Steel Start + Nearest Plant */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-[11px] text-[#90A1B9] uppercase font-bold flex items-center gap-1.5 tracking-wider mb-2">
            <Calendar className="h-3.5 w-3.5" />
            Steel Start
          </p>
          <p className="text-[15px] font-bold text-gray-900 mb-2">
            {steelStart}
          </p>
          <Badge
            className="
              h-[22.5px]
              px-[9px]
              rounded-[4px]
              bg-[#E2E8F0]
              border border-[#CAD5E2]
              text-[11px]
              leading-[16.5px]
              tracking-[0.34px]
              font-bold
              uppercase
              text-[#45556C]
              flex items-center justify-center
            "
          >
            {steelStartRelative}
          </Badge>
        </div>

        <div>
          <p className="text-[11px] text-[#90A1B9] uppercase font-bold flex items-center gap-1.5 tracking-wider mb-2">
            <Truck className="h-3.5 w-3.5" />
            Nearest Plant
          </p>
          <p className="text-[15px] font-bold text-gray-900">
            {nearestPlant}
          </p>
          <p className="text-[12px] leading-[16px] font-medium text-[#62748E] mt-2">
            {plantDistance}
          </p>
        </div>
      </div>

      <Separator />

      {/* Source + date row + View Source Article */}
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-[#90A1B9] font-medium">
          {sourceName} · {publishedDate}
        </p>
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-3 gap-1.5 text-[13px] font-medium text-gray-700 border-gray-300 rounded-lg hover:bg-gray-100"
          onClick={() => sourceArticleUrl && window.open(sourceArticleUrl, "_blank")}
        >
          View Source Article
          <ExternalLink className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}
