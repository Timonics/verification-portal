'use client'

import { QuickActions } from '@/components/dashboard/quick-actions'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { SummaryCard } from '@/components/dashboard/summary-cards'
import {
  Activity,
  XCircle,
  TrendingUp,
  Calendar,
  Monitor,
} from 'lucide-react'

export default function DashboardPage() {
  const stats = {
    totalVerificationsToday: 47,
    successRate: 94.5,
    failedVerifications: 3,
    totalSpend: 4250,
    activeUsers: 156,
    avgResponseTime: 1.2
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>

      {/* Win2K Page Header — styled as a window title area */}
      <div
        style={{
          backgroundColor: "#ece9d8",
          border: "2px solid",
          borderColor: "#ffffff #808080 #808080 #ffffff",
          boxShadow: "inset -1px -1px 0 #404040, inset 1px 1px 0 #dfdfdf",
          overflow: "hidden",
        }}
      >
        {/* Blue section header */}
        <div
          style={{
            background: "linear-gradient(135deg, #1660a7 0%, #4a90d9 100%)",
            padding: "6px 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 24,
                height: 24,
                backgroundColor: "#ece9d8",
                border: "1px solid #808080",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Monitor size={14} color="#0a246a" />
            </div>
            <div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#ffffff",
                  textShadow: "1px 1px 0 #000033",
                }}
              >
                Dashboard
              </div>
              <div style={{ fontSize: 10, color: "#d0e8ff" }}>
                Welcome back! Here&apos;s what&apos;s happening with your verifications.
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {/* Date indicator */}
            <div
              style={{
                backgroundColor: "#ece9d8",
                border: "2px solid",
                borderColor: "#ffffff #808080 #808080 #ffffff",
                padding: "1px 8px",
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 11,
                color: "#000000",
              }}
            >
              <Calendar size={11} />
              Mar 27, 2026
            </div>

            {/* Live indicator */}
            <div
              style={{
                backgroundColor: "#008000",
                border: "1px solid #005500",
                padding: "1px 8px",
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 11,
                color: "#ffffff",
                fontWeight: "bold",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  backgroundColor: "#00ff00",
                  border: "1px solid #00cc00",
                  display: "inline-block",
                }}
              />
              LIVE
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 8,
        }}
      >
        <SummaryCard
          title="Total Verifications"
          value={stats.totalVerificationsToday}
          change={12}
          trend="up"
          icon={Activity}
          description="Today"
          subtitle="vs yesterday"
        />
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

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  )
}
