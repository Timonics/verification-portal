"use client";

import DateBadge from "@/components/dashboard/live-date";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { SummaryCard } from "@/components/dashboard/summary-cards";
import { motion } from "framer-motion";
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
  TrendingDown,
} from "lucide-react";

export default function DashboardPage() {
  // Mock data for summary cards
  const stats = {
    totalVerificationsToday: 47,
    successRate: 94.5,
    failedVerifications: 3,
    totalSpend: 4250,
    activeUsers: 156,
    avgResponseTime: 1.2,
  };

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
          {/* <p className="text-gray-500 mt-1">
            Welcome back! Here's what's happening with your verifications.
          </p> */}
        </div>
        <DateBadge />
      </motion.div>

      {/* Summary Cards - 6 cards in 2 rows */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard
            title="Total Verifications"
            value={stats.totalVerificationsToday}
            icon={Activity}
          />
          <SummaryCard
            title="Successful Verifications"
            value={`${stats.successRate}%`}
            icon={CheckCircle}
          />
          <SummaryCard
            title="Failed Verifications"
            value={stats.failedVerifications}
            icon={XCircle}
          />
        </div>
      </div>

      {/* Quick Actions Section */}
      <QuickActions />

      {/* Recent Activity */}
      {/* <RecentActivity /> */}
    </div>
  );
}

// Add Users icon if not imported
import { Users } from "lucide-react";
