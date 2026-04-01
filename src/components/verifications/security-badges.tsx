'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, CheckCircle, Award } from 'lucide-react'

export function SecurityBadges() {
  const badges = [
    {
      icon: Lock,
      label: '256-bit Encrypted',
      color: 'teal'
    },
    {
      icon: Shield,
      label: 'NDPR Compliant',
      color: 'blue'
    },
    {
      icon: CheckCircle,
      label: 'Instant Results',
      color: 'green'
    },
    {
      icon: Award,
      label: 'Secure Processing',
      color: 'purple'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
    >
      {badges.map((badge, index) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-100"
        >
          <badge.icon className={`w-4 h-4 text-${badge.color}-500`} />
          <span className="text-xs font-medium text-gray-700">{badge.label}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}