"use client";

import { motion } from "framer-motion";
import { Eye, Clock, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface ScreeningTableProps {
  results: any[];
  onViewDetails: (result: any) => void;
  type: "PEP" | "AML";
}

export function ScreeningTable({
  results,
  onViewDetails,
  type,
}: ScreeningTableProps) {
  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case "low level":
        return <Badge className="bg-green-100 text-green-700">Low</Badge>;
      case "medium level":
        return <Badge className="bg-yellow-100 text-yellow-700">Medium</Badge>;
      case "high level":
        return <Badge className="bg-red-100 text-red-700">High</Badge>;
      default:
        return <Badge variant="outline">{riskLevel}</Badge>;
    }
  };

  const getResultBadge = (result: string) => {
    switch (result.toLowerCase()) {
      case "no match":
        return <Badge className="bg-gray-100 text-gray-700">No Match</Badge>;
      case "potential match":
        return (
          <Badge className="bg-yellow-100 text-yellow-700">Potential</Badge>
        );
      case "partial match":
        return <Badge className="bg-orange-100 text-orange-700">Partial</Badge>;
      case "confirmed match":
        return <Badge className="bg-red-100 text-red-700">Confirmed</Badge>;
      default:
        return <Badge variant="outline">{result}</Badge>;
    }
  };

  if (results.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Eye className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No screening results
        </h3>
        <p className="text-gray-500">
          Run a new {type} screening to see results here
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                NAME
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                RISK LEVEL
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                RESULT
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                STATUS
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ENTITY
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                LAST UPDATED
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                MONITORING
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {results.map((result, index) => (
              <motion.tr
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900">{result.name}</p>
                </td>
                <td className="px-6 py-4">{getRiskBadge(result.riskLevel)}</td>
                <td className="px-6 py-4">{getResultBadge(result.result)}</td>
                <td className="px-6 py-4">
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700"
                  >
                    {result.status}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{result.entity}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {formatDate(result.lastUpdated)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="outline" className="bg-gray-50">
                    {result.monitoring}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(result)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
        <p className="text-sm text-gray-500">1-1 of 1</p>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500">Rows per page: 10</p>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>
              1
            </Button>
          </div>
          <p className="text-sm text-gray-500">1/1</p>
        </div>
      </div>
    </div>
  );
}
