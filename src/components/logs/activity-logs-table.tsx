"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Eye,
  ChevronDown,
  Calendar,
  User,
  Activity,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import type { ActivityLog } from "@/types/activity-logs.types";

interface ActivityLogsTableProps {
  logs: ActivityLog[];
  isLoading: boolean;
  onViewDetails: (log: ActivityLog) => void;
}

export function ActivityLogsTable({
  logs,
  isLoading,
  onViewDetails,
}: ActivityLogsTableProps) {
  const [sortField, setSortField] = useState<keyof ActivityLog>("timestamp");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: keyof ActivityLog) => {
    if (sortField === field)
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedLogs = [...logs].sort((a, b) => {
    let aVal = a[sortField]!;
    let bVal = b[sortField];
    // if (sortField === "timestamp") {
    //   aVal = new Date(aVal);
    //   bVal = new Date(bVal);
    // }
    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDirection === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    return sortDirection === "asc"
      ? aVal! > bVal!
        ? 1
        : -1
      : aVal! < bVal!
        ? 1
        : -1;
  });

  const getActionBadge = (action: string) => {
    const colors: Record<string, string> = {
      LOGIN: "bg-blue-100 text-blue-700",
      LOGOUT: "bg-gray-100 text-gray-700",
      NIN_VERIFICATION: "bg-teal-100 text-teal-700",
      NIN_PHONE_VERIFICATION: "bg-teal-100 text-teal-700",
      BVN_VERIFICATION: "bg-blue-100 text-blue-700",
      BVN_RETRIEVAL: "bg-blue-100 text-blue-700",
      CAC_SEARCH: "bg-purple-100 text-purple-700",
      AML_SCREENING: "bg-purple-100 text-purple-700",
      PEP_SCREENING: "bg-orange-100 text-orange-700",
    };
    return colors[action] || "bg-gray-100 text-gray-700";
  };

  const formatAction = (action: string) =>
    action
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());

  if (isLoading)
    return (
      <div className="bg-white rounded-xl p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-500">Loading logs...</p>
      </div>
    );
  if (logs.length === 0)
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
        <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900">
          No activity logs
        </h3>
        <p className="text-gray-500">Actions you perform will appear here.</p>
      </div>
    );

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort("action")}
              >
                <div className="flex items-center gap-1">
                  Action{" "}
                  {sortField === "action" && (
                    <ChevronDown
                      className={`w-3 h-3 transition-transform ${sortDirection === "desc" ? "rotate-180" : ""}`}
                    />
                  )}
                </div>
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort("timestamp")}
              >
                <div className="flex items-center gap-1">
                  Timestamp{" "}
                  {sortField === "timestamp" && (
                    <ChevronDown
                      className={`w-3 h-3 transition-transform ${sortDirection === "desc" ? "rotate-180" : ""}`}
                    />
                  )}
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <AnimatePresence>
              {sortedLogs.map((log) => (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <Badge className={getActionBadge(log.action)}>
                      {formatAction(log.action)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {formatDate(log.timestamp)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      className={
                        log.status === "SUCCESS"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    >
                      {log.status === "SUCCESS" ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <XCircle className="w-3 h-3 mr-1" />
                      )}
                      {log.status === "SUCCESS" ? "Success" : "Failed"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {log.userEmail || "admin@verifyhub.com"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails(log)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Eye className="w-4 h-4 mr-1" /> View
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
