'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface SummaryCardProps {
  title: string
  value: string | number
  change?: number
  trend?: 'up' | 'down'
  icon: LucideIcon
  description?: string
  subtitle?: string
}

export function SummaryCard({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon,
  description,
  subtitle
}: SummaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="group bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          
          {change !== undefined && (
            <div className="flex items-center gap-2">
              <span className={cn(
                "inline-flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded",
                trend === 'up' 
                  ? "text-green-700 bg-green-50" 
                  : "text-red-700 bg-red-50"
              )}>
                {trend === 'up' ? '↑' : '↓'} {Math.abs(change)}%
              </span>
              {subtitle && (
                <span className="text-xs text-gray-400">{subtitle}</span>
              )}
            </div>
          )}
          
          {description && (
            <p className="text-xs text-gray-400 mt-1">{description}</p>
          )}
        </div>
        
        <div className="p-2.5 bg-linear-to-br from-teal-50 to-teal-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-5 h-5 text-teal-600" />
        </div>
      </div>
    </motion.div>
  )
}