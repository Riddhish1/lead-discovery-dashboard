"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, ChevronRight, FileDown } from "lucide-react"

interface ReasoningStep {
  step: number
  description: string
  confidence: number
}

interface AIReasoningDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  leadScore: number
  analyzedTime: string
  reasoningSteps: ReasoningStep[]
}

export function AIReasoningDialog({
  open,
  onOpenChange,
  leadScore,
  analyzedTime,
  reasoningSteps,
}: AIReasoningDialogProps) {
  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Exporting reasoning...")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 border-2 border-blue-500 flex flex-col max-h-[85vh]">
        <DialogHeader className="px-6 pt-6 pb-4 shrink-0">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Brain className="h-6 w-6 text-blue-600" />
            AI Reasoning Breakdown
          </DialogTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
            <span className="font-semibold">
              Lead Score: <span className="text-blue-600">{leadScore}/100</span>
            </span>
            <span>•</span>
            <span>{analyzedTime}</span>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 scrollbar-hide">
          {reasoningSteps.map((step) => (
            <div
              key={step.step}
              className="flex gap-3 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors group cursor-pointer"
            >
              <div className="shrink-0">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-sm font-semibold text-muted-foreground">
                  {step.step}
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <p className="text-sm leading-relaxed text-foreground">
                  {step.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    Confidence:
                  </span>
                  <Badge
                    variant="secondary"
                    className="text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100"
                  >
                    {step.confidence}%
                  </Badge>
                </div>
              </div>

              <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity self-center" />
            </div>
          ))}
        </div>

        <DialogFooter className="gap-2 px-6 py-4 border-t shrink-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button
            onClick={handleExport}
            className="bg-gray-900 hover:bg-gray-800 text-white"
          >
            <FileDown className="h-4 w-4 mr-2" />
            Export Reasoning
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
