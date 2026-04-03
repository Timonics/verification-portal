"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Shield,
  Users,
  Clock,
  Eye,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScreeningSummary } from "@/components/screening/screening-summary";
import { ScreeningTable } from "@/components/screening/screening-table";
import { ScreeningDetailModal } from "@/components/screening/screening-detail-modal";

// Mock data for PEP screening
const mockScreeningData = {
  summary: {
    noMatch: 1,
    potentialMatch: 0,
    partialMatch: 0,
    confirmedMatch: 0,
  },
  results: [
    {
      id: "1",
      name: "Olatunji Shoyemi",
      riskLevel: "Low level",
      result: "No match",
      status: "Completed",
      entity: "Individual",
      lastUpdated: new Date("2026-03-27T08:29:00"),
      monitoring: "One time",
      caseInfo: {
        caseId: "5c4021eb-95d6-400a-bd4c-1ba31ada8f9e",
        matchStatus: "No Match",
        riskLevel: "Low level",
        matchScore: 85,
        ongoingMonitoring: false,
        assignedTo: "N/A",
      },
      resultInfo: {
        searchResults: 0,
        pepSanctionScreening: 0,
      },
    },
  ],
};

export default function PEPScreeningPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResult, setSelectedResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleViewDetails = (result: any) => {
    setSelectedResult(result);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">PEP Screening</h1>
          </div>
          <p className="text-gray-600">
            Screen individuals against global Politically Exposed Persons (PEP)
            watchlists
          </p>
        </div>
        <Button
          className="bg-linear-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white"
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? "Screening..." : "New Screening"}
        </Button>
      </motion.div>

      {/* Summary Cards */}
      <ScreeningSummary data={mockScreeningData.summary} />

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl border border-gray-100 p-4"
      >
        <div className="flex gap-4">
          <div className="flex-1">
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Search by name or ID
            </Label>
            <Input
              placeholder="Enter name, PEP ID, or reference..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex items-end">
            <Button onClick={handleSearch} disabled={isLoading}>
              Search
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Results Table */}
      <ScreeningTable
        results={mockScreeningData.results}
        onViewDetails={handleViewDetails}
        type="PEP"
      />

      {/* Detail Modal */}
      <ScreeningDetailModal
        data={selectedResult}
        open={!!selectedResult}
        onClose={() => setSelectedResult(null)}
        type="PEP"
      />
    </div>
  );
}
