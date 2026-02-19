"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import {
  FileText,
  MapPin,
  Calendar,
  CheckCircle2,
  MessageSquare,
  Plus,
  FileDown,
  Info,
  Sparkles,
  Truck,
  MessageSquareText,
  Download
} from "lucide-react"

import { LeadPropensityCard } from './lead-propensity-card';
import { AIReasoningDialog } from './ai-reasoning-dialog';
import { PrivateNewsRightPanel } from './private-news-right-panel';
import { TenderDiscoveryRightPanel } from './tender-discovery-right-panel';
import { getDefaultReasoningSteps, type ReasoningStep } from '@/data/reasoning-steps';


interface TenderRequirement {
  category: string
  detail: string
}

interface TenderCardProps {
  cardVariant?: "tender-discovery" | "tender-wins" | "private-news"
  awardingAuthority: string
  location: string
  date?: string
  status: string
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
  reasoningSteps?: ReasoningStep[]
  // Private News specific
  estSteelValue?: string
  steelValueConfidence?: string
  steelStart?: string
  steelStartRelative?: string
  nearestPlant?: string
  plantDistance?: string
  sourceName?: string
  publishedDate?: string
  sourceArticleUrl?: string
  priority?: "High" | "Medium" | "Low"
}


export function TenderCard(props: TenderCardProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const {
    cardVariant = "tender-discovery",
    awardingAuthority,
    location,
    date,
    status,
    title,
    requirements,
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
    aiAction,
    quote,
    contractValue,
    reasoningSteps,
    estSteelValue = "—",
    steelValueConfidence = "",
    steelStart = "—",
    steelStartRelative = "",
    nearestPlant = "—",
    plantDistance = "",
    sourceName = "",
    publishedDate = "",
    sourceArticleUrl,
    priority,
  } = props

  const isPrivateNews = cardVariant === "private-news"

  const steps = reasoningSteps || getDefaultReasoningSteps(leadScore)


  const getDaysLeftColor = () => {
    if (daysLeft <= 5) return "bg-red-50 text-red-600"
    if (daysLeft <= 15) return "bg-orange-50 text-orange-600"
    return "bg-gray-100 text-gray-600"
  }

  const getStatusColor = () => {
    if (status === "Open Bidding")
      return "bg-[#ECFDF5] text-[#007A55] border-[#A4F4CF] font-bold px-3 py-1.5"

    return "bg-gray-50 text-gray-700 border-gray-200"
  }


  const getPriorityColor = () => {
    if (priority === "High") return "bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA] font-bold px-3 py-1.5"
    if (priority === "Medium") return "bg-[#FFFBEB] text-[#B45309] border-[#FDE68A] font-bold px-3 py-1.5"
    return "bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0] font-bold px-3 py-1.5"
  }

  return (

    <Card className="border p-0 overflow-hidden">

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] items-start">

        {/* LEFT */}
        <div className="p-5 flex flex-col min-h-full">

          <div className="flex-1">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">

              <div className="flex items-start gap-3.5">

                <div className="p-[10px] bg-gray-100 rounded-[10px] border border-gray-200">
                  <FileText className="h-[18px] w-[18px] text-gray-500" />
                </div>

                <div>

                  <h3 className="text-[16px] font-bold text-[#1D293D] leading-[1.3]">
                    {awardingAuthority}
                  </h3>

                  <div className="flex items-center gap-1.5 text-[13px] text-[#62748E] mt-[4px]">
                    <MapPin className="h-[14px] w-[14px]" />
                    {location}
                    {!isPrivateNews && date && (
                      <>
                        <span className="mx-1 text-gray-500">•</span>
                        {date}
                      </>
                    )}
                  </div>

                </div>

              </div>

              {isPrivateNews ? (
                <Badge variant="outline" className={getPriorityColor()}>
                  {priority ? `${priority} Priority` : "High Priority"}
                </Badge>
              ) : (
                <Badge variant="outline" className={getStatusColor()}>
                  {status}
                </Badge>
              )}

            </div>


            <h2 className="text-[20px] font-bold text-[#0F172B] leading-snug mb-4 ml-1.5">
              {title}
            </h2>


            {/* Requirements */}
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-6 mb-6">

              {requirements.map((req, i) => (

                <div key={i} className="flex items-start gap-3">

                  <CheckCircle2 className="h-[18px] w-[18px] text-emerald-600 shrink-0 mt-[2px]" />

                  <div>

                    <p className="text-[12px] font-bold text-[#90A1B9] uppercase tracking-[0.08em] leading-none">
                      {req.category}
                    </p>

                    <p className="text-[15px] font-medium text-[#314158] leading-[1.35] mt-1 line-height: 19.3">
                      {req.detail}
                    </p>

                  </div>

                </div>

              ))}

            </div>


            <Separator className="mb-5" />
          </div>



          {/* Quote - Positioned at bottom above footer */}
          <div className="flex items-start">
            <div className="w-[5px] h-8 bg-blue-500 rounded mr-3 shrink-0"></div>
            <p className="text-[16px] italic font-medium text-[#45556C] leading-relaxed">
              {quote}
            </p>
          </div>

        </div>


        {/* RIGHT SIDEBAR */}
        {isPrivateNews ? (
          <PrivateNewsRightPanel
            leadScore={leadScore}
            leadProbability={leadProbability}
            estSteelValue={estSteelValue}
            steelValueConfidence={steelValueConfidence}
            steelStart={steelStart}
            steelStartRelative={steelStartRelative}
            nearestPlant={nearestPlant}
            plantDistance={plantDistance}
            sourceName={sourceName}
            publishedDate={publishedDate}
            sourceArticleUrl={sourceArticleUrl}
            aiAction={aiAction}
            onAIClick={() => setDialogOpen(true)}
          />
        ) : cardVariant === "tender-discovery" ? (
          <TenderDiscoveryRightPanel
            leadScore={leadScore}
            leadProbability={leadProbability}
            totalValue={totalValue}
            valueSource={valueSource}
            deadline={deadline}
            daysLeft={daysLeft}
            nearestSupply={nearestSupply}
            logisticsDetail={logisticsDetail}
            sourcePortal={sourcePortal}
            additionalBadge={additionalBadge}
          />
        ) : (
        <div className="border-l bg-gray-50 px-7 py-6 space-y-4">

          {/* NEW COMPONENT HERE */}
          <LeadPropensityCard
            score={leadScore}
            probabilityText={leadProbability}
          />

          {/* VALUE */}
          <div>
            <p className="text-[13px] text-[#90A1B9] uppercase font-bold tracking-wider mb-2">
              Estimated Steel Value
            </p>

            <p className="text-[28px] font-bold text-gray-900 leading-none">
              {totalValue}
            </p>

            <p className="text-[14px] text-[#90A1B9] mt-1">
              {valueSource}
            </p>
          </div>

          {/* CONTRACT VALUE */}
          <div>
            <p className="text-[13px] text-[#90A1B9] uppercase font-bold tracking-wider mb-2">
              Contract Value
            </p>

            <p className="text-[28px] font-bold text-gray-900 leading-none">
              ₹{(contractValue / 10000000).toFixed(1)} Cr
            </p>
          </div>

          {/* DEADLINE */}
          <div className="grid grid-cols-2 gap-4">

            <div>

              <p className="text-[11px] text-[#90A1B9] uppercase font-bold flex items-center gap-1.5 tracking-wider mb-2">
                <Calendar className="h-3.5 w-3.5" />
                Est. Steel Delivery Start
              </p>

              <p className="text-[15px] font-bold text-gray-900 mb-2">
                {deadline}
              </p>

              <Badge
  className={`
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
  `}
>
  {daysLeft} DAYS LEFT
</Badge>


            </div>


            <div>

              <p className="text-[11px] text-[#90A1B9] uppercase font-bold flex items-center gap-1.5 tracking-wider mb-2">
                <Truck className="h-3.5 w-3.5" />
                Nearest Supply
              </p>

              <p className="text-[15px] font-bold text-gray-900">
                {nearestSupply}
              </p>

              <p
  className="
    text-[12px]
    leading-[16px]
    font-medium
    text-[#62748E]
    mt-2
  "
>
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
        )}


        {/* FOOTER */}
        <div className="col-span-1 lg:col-span-2 border-t bg-gray-50 px-5 py-4 flex justify-between items-center">

          <div className="flex gap-3 items-center">

            <Button
              className="
    bg-[#155DFC]
    hover:bg-[#155DFC]/90
    text-white
    h-[36px]
    px-[18px]
    gap-[8px]
    rounded-[10px]
    shadow-[0px_1px_2px_-1px_#BEDBFF,0px_1px_3px_0px_#BEDBFF]
    flex items-center justify-center
  "
            >
              <MessageSquareText className="h-4 w-4" />

              <span className="text-[14px] leading-[20px] font-medium whitespace-nowrap">
                Ask JSW AI
              </span>
            </Button>



            <div className="w-px h-6 bg-gray-200 mx-1"></div>



            <Button
              variant="ghost"
              className="
    text-[14px]
    leading-[20px]
    font-semibold
    text-[#45556C]
    h-[36px]
    px-[12px]
    gap-[8px]
    rounded-[10px]
    flex items-center justify-center
  "
            >
              <Plus className="w-[16px] h-[16px] text-[#90A1B9]" strokeWidth={2} />

              <span className="whitespace-nowrap font-semibold">
                Add to Salesforce
              </span>
            </Button>

            <Button
              variant="ghost"
              className="
    text-[14px]
    leading-[20px]
    font-semibold
    text-[#45556C]
    h-[36px]
    px-[12px]
    gap-[8px]
    rounded-[10px]
    flex items-center justify-center
  "
            >
              <Download
                className="w-[16px] h-[16px] text-[#90A1B9]"
                strokeWidth={2}
              />

              <span className="whitespace-nowrap font-semibold">
                Docs
              </span>
            </Button>


            <Button
              variant="ghost"
              className="
    text-[14px]
    leading-[20px]
    font-semibold
    text-[#45556C]
    h-[36px]
    px-[12px]
    gap-[8px]
    rounded-[10px]
    flex items-center justify-center
  "
            >
              <Info
                className="w-[16px] h-[16px] text-[#90A1B9]"
                strokeWidth={2}
              />

              <span className="whitespace-nowrap font-semibold">
                Details
              </span>
            </Button>


          </div>



<Button
  variant="outline"
  onClick={() => setDialogOpen(true)}
  className="
    h-[38px]
    px-[16px]
    gap-[8px]
    rounded-[10px]

    bg-[#EFF6FF]
    border border-[#DBEAFE]

    text-[#155DFC]
    text-[14px]
    leading-[20px]
    font-medium

    shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]

    flex items-center justify-center
  "
>
  <Sparkles
    className="w-[16px] h-[16px] text-[#1447E6]"
    strokeWidth={1.5}
  />

  <span
  className="
    text-[14px]
    leading-[20px]
    font-bold
    tracking-[-0.15px]
    text-[#1447E6]
    whitespace-nowrap
    text-center
  "
>
  {aiAction}
</span>

</Button>


        </div>

      </div>

      <AIReasoningDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        leadScore={leadScore}
        analyzedTime="Analyzed 2 hours ago"
        reasoningSteps={steps}
      />

    </Card>

  )

}
