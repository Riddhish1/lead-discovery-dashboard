"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronRight, Download } from "lucide-react"

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
    <Dialog  open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-2xl w-[90vw] p-0 flex flex-col max-h-[85vh]">
        <DialogHeader className="px-6 pt-6 pb-4 shrink-0">
          <DialogTitle className="text-xl font-bold text-gray-900">
            AI Reasoning Breakdown
          </DialogTitle>
          <div className="flex items-center gap-2 text-sm pt-1">
            <span className="text-gray-600">
              Lead Score: <span className="font-bold text-blue-600 bg-blue-50 px-1.5">{leadScore}/100</span>
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">{analyzedTime}</span>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-2 space-y-3 scrollbar-hide">
          {reasoningSteps.map((step) => (
            <div
              key={step.step}
              className="flex gap-4 p-4 rounded-lg border border-gray-200 bg-white hover:border-gray-300 transition-colors cursor-pointer"
            >
              <div className="shrink-0">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                  {step.step}
                </div>
              </div>

              <div className="flex-1 space-y-1">
                <p className="text-sm leading-relaxed text-gray-900">
                  {step.description}
                </p>
                <p className="text-xs text-gray-400">
                  • Confidence: {step.confidence}%
                </p>
              </div>

              <ChevronRight className="h-5 w-5 text-gray-300 self-center shrink-0" />
            </div>
          ))}
        </div>

        <DialogFooter className="gap-2 px-6 py-4 border-t shrink-0">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="text-gray-700">
            Close
          </Button>
          <Button
            onClick={handleExport}
            className="bg-gray-900 hover:bg-gray-800 text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Reasoning
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
