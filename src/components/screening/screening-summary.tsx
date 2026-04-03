'use client'

import { motion } from 'framer-motion'
import { 
  XCircle, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle 
} from 'lucide-react'

interface ScreeningSummaryProps {
  data: {
    noMatch: number
    potentialMatch: number
    partialMatch: number
    confirmedMatch: number
  }
}

export function ScreeningSummary({ data }: ScreeningSummaryProps) {
  const summaryCards = [
    {
      title: 'No Match Cases',
      value: data.noMatch,
      icon: XCircle,
      color: 'gray',
      bgColor: 'gray'
    },
    {
      title: 'Potential Matched Cases',
      value: data.potentialMatch,
      icon: AlertTriangle,
      color: 'yellow',
      bgColor: 'yellow'
    },
    {
      title: 'Partially Matched Cases',
      value: data.partialMatch,
      icon: HelpCircle,
      color: 'orange',
      bgColor: 'orange'
    },
    {
      title: 'Confirmed Matched Cases',
      value: data.confirmedMatch,
      icon: CheckCircle,
      color: 'red',
      bgColor: 'red'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryCards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
            </div>
            <div className={`p-2 bg-${card.bgColor}-100 rounded-lg`}>
              <card.icon className={`w-5 h-5 text-${card.color}-600`} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}4