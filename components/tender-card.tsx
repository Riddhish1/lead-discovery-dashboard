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
            <div className="flex gap-3 mb-4">

              <div className="p-2.5 bg-gray-100 rounded-lg border">
                <FileText className="h-5 w-5 text-gray-500"/>
              </div>

              <div>

                <div className="flex items-center gap-2">

                  <h3 className="font-semibold text-gray-900">
                    {organization}
                  </h3>

                  <Badge variant="outline" className={getStatusColor()}>
                    {status}
                  </Badge>

                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <MapPin className="h-4 w-4"/>
                  {location}
                  • {date}
                </div>

              </div>

            </div>


            <h2 className="text-lg font-semibold mb-4">
              {title}
            </h2>


            {/* Requirements */}
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 mb-5">

              {requirements.map((req, i) => (

                <div key={i} className="flex gap-2.5">

                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5"/>

                  <div>

                    <p className="text-xs font-semibold text-gray-500 uppercase">
                      {req.category}
                    </p>

                    <p className="text-sm text-gray-800">
                      {req.detail}
                    </p>

                  </div>

                </div>

              ))}

            </div>
          </div>

          {/* Quote - Positioned at bottom above footer */}
          <div className="border-l-4 border-blue-500 bg-blue-50 p-3">
            <p className="text-sm italic text-gray-700">
              {quote}
            </p>
          </div>

        </div>


        {/* RIGHT SIDEBAR */}
        <div className="border-l p-5 space-y-4">

          {/* NEW COMPONENT HERE */}
          <LeadPropensityCard
            score={leadScore}
            probabilityText={leadProbability}
          />




          {/* VALUE */}
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold">
              Total Value
            </p>

            <p className="text-2xl font-bold">
              {totalValue}
            </p>

            <p className="text-xs text-gray-500">
              {valueSource}
            </p>
          </div>



          {/* DEADLINE */}
          <div className="grid grid-cols-2 gap-4">

            <div>

              <p className="text-xs text-gray-500 uppercase font-semibold flex gap-1">
                <Calendar className="h-4 w-4"/>
                Deadline
              </p>

              <p className="text-sm font-semibold">
                {deadline}
              </p>

              <Badge className={getDaysLeftColor()}>
                {daysLeft} DAYS LEFT
              </Badge>

            </div>


            <div>

              <p className="text-xs text-gray-500 uppercase font-semibold flex gap-1">
                <Truck className="h-4 w-4"/>
                Logistics
              </p>

              <p className="text-sm font-semibold">
                {logistics}
              </p>

              <p className="text-xs text-gray-500">
                {logisticsDetail}
              </p>

            </div>

          </div>


          <Separator/>

          <Badge variant="outline">
            {sourcePortal}
          </Badge>

        </div>


        {/* FOOTER */}
        <div className="col-span-1 lg:col-span-2 border-t p-3 flex justify-between items-center">

          <div className="flex gap-2">

            <Button className="bg-blue-600 text-white">
              <MessageSquare className="h-4 w-4 mr-2"/>
              Ask JSW AI
            </Button>

            <Button variant="ghost">
              <Plus className="h-4 w-4 mr-2"/>
              Add to Salesforce
            </Button>

            <Button variant="ghost">
              <FileDown className="h-4 w-4 mr-2"/>
              Docs
            </Button>

            <Button variant="ghost">
              <Info className="h-4 w-4 mr-2"/>
              Details
            </Button>

          </div>


          <Button 
            variant="outline" 
            className="text-blue-600"
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
