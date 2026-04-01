'use client'

import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  XCircle, 
  Clock,
  Eye,
  UserCheck,
  CreditCard,
  Building2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const recentActivities = [
  {
    id: 1,
    service: 'NIN Verification',
    status: 'success',
    timestamp: '2 minutes ago',
    reference: 'NIN_REF_001',
    user: 'Insurance Onboarding App',
    icon: UserCheck,
    color: 'teal'
  },
  {
    id: 2,
    service: 'BVN Verification',
    status: 'success',
    timestamp: '5 minutes ago',
    reference: 'BVN_REF_002',
    user: 'Insurance Onboarding App',
    icon: CreditCard,
    color: 'blue'
  },
  {
    id: 3,
    service: 'BVN Verification',
    status: 'failed',
    timestamp: '7 minutes ago',
    reference: 'BVN_REF_003',
    user: 'Insurance Onboarding App',
    icon: CreditCard,
    color: 'red'
  },
  {
    id: 4,
    service: 'CAC Verification',
    status: 'success',
    timestamp: '12 minutes ago',
    reference: 'CAC_REF_004',
    user: 'Fintech Ltd',
    icon: Building2,
    color: 'purple'
  },
  {
    id: 5,
    service: 'NIN Verification',
    status: 'success',
    timestamp: '15 minutes ago',
    reference: 'NIN_REF_005',
    user: 'Banking Corp',
    icon: UserCheck,
    color: 'teal'
  }
]

export function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <p className="text-sm text-gray-500 mt-1">Latest verifications from your apps</p>
          </div>
          <Button variant="ghost" size="sm" className="text-teal-600 hover:text-teal-700">
            View All
            <Eye className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {recentActivities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-4 hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg bg-${activity.color}-50`}>
                  <activity.icon className={`w-5 h-5 text-${activity.color}-600`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900">{activity.service}</p>
                    <Badge 
                      variant={activity.status === 'success' ? 'default' : 'destructive'}
                      className={activity.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                    >
                      {activity.status === 'success' ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <XCircle className="w-3 h-3 mr-1" />
                      )}
                      {activity.status === 'success' ? 'Success' : 'Failed'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {activity.user} • Ref: {activity.reference}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>{activity.timestamp}</span>
                </div>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {recentActivities.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-gray-500">No recent activity</p>
        </div>
      )}
    </motion.div>
  )
}