"use client";

import { motion } from "framer-motion";
import {
  UserCheck,
  CreditCard,
  Building2,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const services = [
  {
    name: "NIN Verification",
    icon: UserCheck,
    count: 1247,
    percentage: 45,
    trend: "+12%",
    color: "teal",
    href: "/dashboard/verifications/nin",
  },
  {
    name: "BVN Verification",
    icon: CreditCard,
    count: 892,
    percentage: 32,
    trend: "+8%",
    color: "blue",
    href: "/dashboard/verifications/bvn",
  },
  {
    name: "CAC Verification",
    icon: Building2,
    count: 534,
    percentage: 19,
    trend: "+15%",
    color: "purple",
    href: "/dashboard/verifications/cac",
  },
  {
    name: "PEP Screening",
    icon: TrendingUp,
    count: 98,
    percentage: 4,
    trend: "Coming Soon",
    color: "orange",
    href: "/dashboard/pep",
    comingSoon: true,
  },
];

export function PopularServices() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Popular Services
          </h2>
          <p className="text-sm text-gray-500 mt-1">Most used verifications</p>
        </div>
        <TrendingUp className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {services.map((service, index) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`group relative ${!service.comingSoon && "cursor-pointer"}`}
          >
            <Link href={service.comingSoon ? "#" : service.href}>
              <div
                className={`p-4 rounded-lg transition-all duration-300 ${
                  service.comingSoon
                    ? "bg-gray-50 opacity-60 cursor-not-allowed"
                    : "hover:bg-gray-50 hover:shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-${service.color}-50`}>
                      <service.icon
                        className={`w-5 h-5 text-${service.color}-600`}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {service.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {service.count} verifications
                      </p>
                    </div>
                  </div>
                  {!service.comingSoon && (
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                  )}
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Usage</span>
                    <span
                      className={`font-medium ${
                        service.comingSoon ? "text-gray-400" : "text-teal-600"
                      }`}
                    >
                      {service.comingSoon ? service.trend : service.trend}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${service.percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className={`h-full rounded-full bg-${service.color}-500`}
                    />
                  </div>
                </div>

                {service.comingSoon && (
                  <div className="mt-2">
                    <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                      Coming Soon
                    </span>
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <Button
          variant="ghost"
          className="w-full text-teal-600 hover:text-teal-700"
        >
          View All Services
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}
