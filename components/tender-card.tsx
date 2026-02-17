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
  Truck
} from "lucide-react"

import { LeadPropensityCard } from './lead-propensity-card';
import { AIReasoningDialog } from './ai-reasoning-dialog';
import { getDefaultReasoningSteps, type ReasoningStep } from '@/data/reasoning-steps';


interface TenderRequirement {
  category: string
  detail: string
}

interface TenderCardProps {
  organization: string
  location: string
  date: string
  status: string
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
  reasoningSteps?: ReasoningStep[]
}


export function TenderCard(props: TenderCardProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const {
    organization,
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
    logistics,
    logisticsDetail,
    sourcePortal,
    additionalBadge,
    aiAction,
    quote,
    reasoningSteps
  } = props

  const steps = reasoningSteps || getDefaultReasoningSteps(leadScore)


  const getDaysLeftColor = () => {
    if (daysLeft <= 5) return "bg-red-50 text-red-600"
    if (daysLeft <= 15) return "bg-orange-50 text-orange-600"
    return "bg-gray-100 text-gray-600"
  }

  const getStatusColor = () => {
    if (status === "Open Bidding")
      return "bg-green-50 text-green-700 border-green-200"

    return "bg-gray-50 text-gray-700 border-gray-200"
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
    <FileText className="h-[18px] w-[18px] text-gray-500"/>
  </div>

  <div>

    <h3 className="text-[16px] font-bold text-gray-800 leading-[1.3]">
      {organization}
    </h3>

    <div className="flex items-center gap-1.5 text-[13px] text-gray-500 mt-[4px]">
      <MapPin className="h-[14px] w-[14px]"/>
      {location}
      <span className="mx-1 text-gray-500">•</span>
      {date}
    </div>

  </div>

</div>


              <Badge variant="outline" className={getStatusColor()}>
                {status}
              </Badge>

            </div>


            <h2 className="text-[20px] font-bold text-gray-900 leading-snug mb-4">
              {title}
            </h2>


            {/* Requirements */}
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-6 mb-6">

  {requirements.map((req, i) => (

    <div key={i} className="flex items-start gap-3">

      <CheckCircle2 className="h-[18px] w-[18px] text-emerald-600 shrink-0 mt-[2px]" />

      <div>

        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.08em] leading-none">
          {req.category}
        </p>

        <p className="text-[15px] font-medium text-gray-800 leading-[1.35] mt-1">
          {req.detail}
        </p>

      </div>

    </div>

  ))}

</div>


            <Separator className="mb-5"/>
          </div>


              
          {/* Quote - Positioned at bottom above footer */}
          <div className="flex items-start">
            <div className="w-[5px] h-8 bg-blue-500 rounded mr-3 shrink-0"></div>
            <p className="text-[16px] italic font-medium text-gray-600 leading-relaxed">
              {quote}
            </p>
          </div>

        </div>


        {/* RIGHT SIDEBAR */}
        <div className="border-l bg-gray-50 px-7 py-6 space-y-4">

          {/* NEW COMPONENT HERE */}
          <LeadPropensityCard
            score={leadScore}
            probabilityText={leadProbability}
          />




          {/* VALUE */}
          <div>
            <p className="text-[11px] text-gray-500 uppercase font-semibold tracking-wider mb-2">
              Total Value
            </p>

            <p className="text-[32px] font-bold text-gray-900 leading-none">
              {totalValue}
            </p>

            <p className="text-[13px] text-gray-500 mt-1">
              {valueSource}
            </p>
          </div>



          {/* DEADLINE */}
          <div className="grid grid-cols-2 gap-4">

            <div>

              <p className="text-[11px] text-gray-400 uppercase font-semibold flex items-center gap-1.5 tracking-wider mb-2">
                <Calendar className="h-3.5 w-3.5"/>
                Deadline
              </p>

              <p className="text-[15px] font-bold text-gray-900 mb-2">
                {deadline}
              </p>

              <Badge className={`${getDaysLeftColor()} text-[10px] font-bold px-2 py-1 rounded`}>
                {daysLeft} DAYS LEFT
              </Badge>

            </div>


            <div>

              <p className="text-[11px] text-gray-400 uppercase font-semibold flex items-center gap-1.5 tracking-wider mb-2">
                <Truck className="h-3.5 w-3.5"/>
                Logistics
              </p>

              <p className="text-[15px] font-bold text-gray-900">
                {logistics}
              </p>

              <p className="text-[13px] text-gray-500 mt-1">
                {logisticsDetail}
              </p>

            </div>

          </div>


          <Separator/>

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


        {/* FOOTER */}
        <div className="col-span-1 lg:col-span-2 border-t bg-gray-50 px-5 py-4 flex justify-between items-center">

          <div className="flex gap-3 items-center">

            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-medium h-10 px-4 rounded-lg">
              <MessageSquare className="h-4 w-4 mr-2"/>
              Ask JSW AI
            </Button>

            <div className="w-px h-6 bg-gray-200 mx-1"></div>



            <Button variant="ghost" className="text-[14px] text-gray-700 h-10 px-3">
              <Plus className="h-4 w-4 mr-2"/>
              Add to Salesforce
            </Button>

            <Button variant="ghost" className="text-[14px] text-gray-700 h-10 px-3">
              <FileDown className="h-4 w-4 mr-2"/>
              Docs
            </Button>

            <Button variant="ghost" className="text-[14px] text-gray-700 h-10 px-3">
              <Info className="h-4 w-4 mr-2"/>
              Details
            </Button>

          </div>


          <Button 
            variant="outline" 
            className="text-blue-600 text-[14px] font-medium h-10 px-4 rounded-lg border-blue-200"
            onClick={() => setDialogOpen(true)}
          >
            <Sparkles className="h-4 w-4 mr-2"/>
            {aiAction}
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
