'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  UserCheck, 
  CreditCard, 
  Building2, 
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const actions = [
  {
    title: 'NIN Verification',
    description: 'Verify National Identity Number',
    icon: UserCheck,
    href: '/verifications/nin',
    color: 'teal',
    price: '₦80',
    popular: true
  },
  {
    title: 'BVN Verification',
    description: 'Verify Bank Verification Number',
    icon: CreditCard,
    href: '/verifications/bvn',
    color: 'blue',
    price: '₦50'
  },
  {
    title: 'CAC Business Search',
    description: 'Search Nigerian businesses',
    icon: Building2,
    href: '/verifications/cac',
    color: 'purple',
    price: '₦150'
  },
  {
    title: 'AML Screening',
    description: 'Anti-Money Laundering Screening',
    icon: AlertTriangle,
    href: '/verifications/aml',
    color: 'orange',
    comingSoon: false
  }
]

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-100 p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          <p className="text-sm text-gray-500 mt-1">Start a new verification in seconds</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-teal-50 rounded-lg">
          <Zap className="w-4 h-4 text-teal-600" />
          <span className="text-xs font-medium text-teal-600">Instant Results</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="group"
          >
            <Link href={action.comingSoon ? '#' : action.href}>
              <div className={cn(
                "relative h-full p-5 rounded-xl border transition-all duration-300",
                action.comingSoon 
                  ? "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed" 
                  : "border-gray-100 bg-white hover:border-teal-200 hover:shadow-lg cursor-pointer"
              )}>
                {action.popular && (
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-linear-to-r from-teal-500 to-teal-600 text-white text-xs px-2 py-0.5">
                      Popular
                    </Badge>
                  </div>
                )}
                
                {action.comingSoon && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-purple-100 text-purple-600 text-xs">
                      Coming Soon
                    </Badge>
                  </div>
                )}
                
                <div className="flex flex-col items-center text-center">
                  <div className={cn(
                    "p-3 rounded-xl mb-4 transition-all duration-300",
                    action.comingSoon 
                      ? "bg-gray-100" 
                      : `bg-${action.color}-50 group-hover:scale-110 group-hover:shadow-md`
                  )}>
                    <action.icon className={cn(
                      "w-8 h-8",
                      action.comingSoon 
                        ? "text-gray-400" 
                        : `text-${action.color}-600`
                    )} />
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{action.description}</p>
                  
                  {!action.comingSoon && (
                    <div className="flex items-center justify-between w-full mt-2 pt-2 border-t border-gray-100">
                      {/* <span className="text-sm font-bold text-teal-600">{action.price}</span> */}
                      <span className="text-xs text-teal-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Verify
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Helper function
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}