"use client"


interface LeadPropensityCardProps {
  score: number
  probabilityText: string
}

export function LeadPropensityCard({
  score,
  probabilityText,
}: LeadPropensityCardProps) {

  const circumference = 2 * Math.PI * 28
  const progress = (score / 100) * circumference

  return (

    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center justify-between">

      {/* LEFT CONTENT */}
      <div>

        <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 leading-tight">
          Lead Propensity
        </p>

        <div className="flex items-baseline gap-2">

          <span className="text-[52px] font-bold text-gray-900 leading-none">
            {score}
          </span>

          <span className="text-lg text-gray-400 font-medium">
            /100
          </span>

        </div>

        <p className="text-blue-600 text-[14px] font-semibold mt-1.5">
          {probabilityText}
        </p>

      </div>


      {/* RIGHT TARGET CIRCLE */}
      <div className="relative w-16 h-16 flex items-center justify-center">

        {/* outer faint rings */}
        <div className="absolute w-full h-full rounded-full border border-blue-200 opacity-40"></div>
        <div className="absolute w-10 h-10 rounded-full border border-blue-200 opacity-40"></div>
        <div className="absolute w-4 h-4 rounded-full border border-blue-200 opacity-40"></div>

        {/* progress ring */}
        <svg
          width="64"
          height="64"
          className="absolute -rotate-90"
        >

          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="#DBEAFE"
            strokeWidth="3"
            fill="none"
          />

          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="#2563EB"
            strokeWidth="3"
            fill="none"
            strokeDasharray={`${progress} ${circumference}`}
            strokeLinecap="round"
          />

        </svg>

        {/* center dot */}
        <div className="absolute w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow"></div>

      </div>

    </div>

  )
}
