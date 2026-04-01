'use client'

import { PopularServices } from '@/components/dashboard/popular-services'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { StatsOverview } from '@/components/dashboard/stats-overview'
import { SummaryCard } from '@/components/dashboard/summary-cards'
import { motion } from 'framer-motion'
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  ArrowRight,
  UserCheck,
  Building2,
  AlertTriangle,
  Activity,
  Clock,
  Zap,
  Award,
  Calendar,
  TrendingDown
} from 'lucide-react'


export default function DashboardPage() {
  // Mock data for summary cards
  const stats = {
    totalVerificationsToday: 47,
    successRate: 94.5,
    failedVerifications: 3,
    totalSpend: 4250,
    activeUsers: 156,
    avgResponseTime: 1.2
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Welcome back! Here's what's happening with your verifications.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-100 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>Mar 27, 2026</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-teal-50 rounded-lg text-sm text-teal-600">
            <Zap className="w-4 h-4" />
            <span>Live</span>
          </div>
        </div>
      </motion.div>

      {/* Summary Cards - 6 cards in 2 rows */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard
            title="Total Verifications"
            value={stats.totalVerificationsToday}
            change={12}
            trend="up"
            icon={Activity}
            description="Today"
            subtitle="vs yesterday"
          />
          {/* <SummaryCard
            title="Success Rate"
            value={`${stats.successRate}%`}
            change={2.5}
            trend="up"
            icon={CheckCircle}
            description="Last 30 days"
            subtitle="+2.3% from last month"
          /> */}
          <SummaryCard
            title="Failed Verifications"
            value={stats.failedVerifications}
            change={8}
            trend="down"
            icon={XCircle}
            description="Today"
            subtitle="vs yesterday"
          />
          <SummaryCard
            title="Total Spend"
            value={`₦${stats.totalSpend.toLocaleString()}`}
            change={15}
            trend="up"
            icon={TrendingUp}
            description="This month"
            subtitle="₦3,250 remaining"
          />
        </div>

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SummaryCard
            title="Active Apps"
            value={stats.activeUsers}
            change={8}
            trend="up"
            icon={Award}
            description="Connected apps"
            subtitle="+12 this month"
          />
          <SummaryCard
            title="Avg Response Time"
            value={`${stats.avgResponseTime}s`}
            change={0.2}
            trend="down"
            icon={Zap}
            description="Per request"
            subtitle="Faster by 0.2s"
          />
          <SummaryCard
            title="Completion Rate"
            value="98.2%"
            change={1.1}
            trend="up"
            icon={TrendingUp}
            description="All time"
            subtitle="+1.1% this quarter"
          />
          <SummaryCard
            title="Monthly Active"
            value="2,847"
            change={23}
            trend="up"
            icon={Users}
            description="Verifications"
            subtitle="+23% growth"
          />
        </div> */}
      </div>

      {/* Quick Actions Section */}
      <QuickActions />

      {/* Two Column Layout for Stats and Popular Services */}
      {/* <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StatsOverview />
        </div>
        <div className="lg:col-span-1">
          <PopularServices />
        </div>
      </div> */}

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  )
}

// Add Users icon if not imported
import { Users } from 'lucide-react'