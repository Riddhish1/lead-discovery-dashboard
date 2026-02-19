"use client"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Truck } from "lucide-react"
import { LeadPropensityCard } from "./lead-propensity-card"

interface TenderDiscoveryRightPanelProps {
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
}

export function TenderDiscoveryRightPanel({
  leadScore,
  leadProbability,
  totalValue,
  valueSource,
  deadline,
  daysLeft,
  nearestSupply,
  logisticsDetail,
  sourcePortal,
  additionalBadge,
}: TenderDiscoveryRightPanelProps) {
  return (
    <div className="border-l bg-gray-50 px-7 py-6 space-y-4">

      <LeadPropensityCard
        score={leadScore}
        probabilityText={leadProbability}
      />

      {/* TOTAL VALUE */}
      <div>
        <p className="text-[13px] text-[#90A1B9] uppercase font-bold tracking-wider mb-2">
          Total Value
        </p>
        <p className="text-[28px] font-bold text-gray-900 leading-none">
          {totalValue}
        </p>
        <p className="text-[14px] text-[#90A1B9] mt-1">
          {valueSource}
        </p>
      </div>

      {/* DEADLINE + LOGISTICS */}
      <div className="grid grid-cols-2 gap-4">

        <div>
          <p className="text-[11px] text-[#90A1B9] uppercase font-bold flex items-center gap-1.5 tracking-wider mb-2">
            <Calendar className="h-3.5 w-3.5" />
            Deadline
          </p>
          <p className="text-[15px] font-bold text-gray-900 mb-2">
            {deadline}
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
            {daysLeft} DAYS LEFT
          </Badge>
        </div>

        <div>
          <p className="text-[11px] text-[#90A1B9] uppercase font-bold flex items-center gap-1.5 tracking-wider mb-2">
            <Truck className="h-3.5 w-3.5" />
            Logistics
          </p>
          <p className="text-[15px] font-bold text-gray-900">
            {nearestSupply}
          </p>
          <p className="text-[12px] leading-[16px] font-medium text-[#62748E] mt-2">
            {logisticsDetail}
          </p>
        </div>

      </div>

      <Separator />

      <div className="flex gap-2 items-center">
        <Badge variant="outline" className="text-[12px] font-semibold px-2.5 py-1 border-gray-300 text-gray-700 rounded">
          {sourcePortal}
        </Badge>
        {additionalBadge && (
          <Badge className="text-[12px] font-semibold px-2.5 py-1 bg-blue-100 text-blue-600 hover:bg-blue-100 rounded">
            {additionalBadge}
          </Badge>
        )}
      </div>

    </div>
  )
}
