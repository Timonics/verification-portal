'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Users,
  CheckCircle,
  Clock
} from 'lucide-react'

const stats = [
  {
    label: 'Verifications this week',
    value: '342',
    change: '+18%',
    trend: 'up',
    icon: CheckCircle,
    color: 'teal'
  },
  {
    label: 'Revenue this month',
    value: '₦24,580',
    change: '+12%',
    trend: 'up',
    icon: DollarSign,
    color: 'green'
  },
  {
    label: 'Average daily verifications',
    value: '48',
    change: '+5',
    trend: 'up',
    icon: Clock,
    color: 'blue'
  },
  {
    label: 'Active integrations',
    value: '12',
    change: 'New: +2',
    trend: 'up',
    icon: Users,
    color: 'purple'
  }
]

export function StatsOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Performance Overview</h2>
          <p className="text-sm text-gray-500 mt-1">Key metrics at a glance</p>
        </div>
        <TrendingUp className="w-5 h-5 text-gray-400" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-${stat.color}-50`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
            <div className={`flex items-center gap-1 text-sm ${
              stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Monthly goal progress</span>
          <span className="font-medium text-gray-900">78%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '78%' }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-linear-to-r from-teal-500 to-teal-600 rounded-full"
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          ₦32,000 of ₦41,000 goal reached
        </p>
      </div>
    </motion.div>
  )
}