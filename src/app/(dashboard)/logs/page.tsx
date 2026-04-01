"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  Filter,
  Search,
  Calendar,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { LogsTable } from "@/components/logs/logs-table";
import { LogsFilters } from "@/components/logs/logs-filters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockLogs } from "@/lib/mock-data";

export default function LogsPage() {
  const [logs, setLogs] = useState(mockLogs);
  const [filteredLogs, setFilteredLogs] = useState(mockLogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    service: "",
    status: "",
    dateRange: { from: null as Date | null, to: null as Date | null },
    appName: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  // Apply filters and search
  useEffect(() => {
    let filtered = [...logs];

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(
        (log) =>
          log.appName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.service.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Apply service filter
    if (filters.service) {
      filtered = filtered.filter((log) => log.service === filters.service);
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter((log) => log.status === filters.status);
    }

    // Apply app name filter
    if (filters.appName) {
      filtered = filtered.filter((log) =>
        log.appName.toLowerCase().includes(filters.appName.toLowerCase()),
      );
    }

    // Apply date range filter
    if (filters.dateRange.from instanceof Date && filters.dateRange.to instanceof Date) {
      filtered = filtered.filter((log) => {
        const logDate = new Date(log.dateTime);
        return (
          logDate >= filters.dateRange.from! && logDate <= filters.dateRange.to!
        );
      });
    }

    setFilteredLogs(filtered);
    setCurrentPage(1);
  }, [logs, searchTerm, filters]);

  const handleExport = () => {
    // Mock export functionality
    const data = JSON.stringify(filteredLogs, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `verification-logs-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Mock refresh
    setTimeout(() => {
      setLogs(mockLogs);
      setIsLoading(false);
    }, 1000);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilters({
      service: "",
      status: "",
      dateRange: { from: null, to: null },
      appName: "",
    });
  };

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLogs = filteredLogs.slice(startIndex, endIndex);

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
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Verification Logs
            </h1>
          </div>
          <p className="text-gray-600">
            View and manage all verification transactions across your
            applications
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isLoading}
            className="gap-2"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button
            onClick={handleExport}
            className="bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="bg-white rounded-lg border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Total Verifications</p>
          <p className="text-2xl font-bold text-gray-900">
            {filteredLogs.length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Success Rate</p>
          <p className="text-2xl font-bold text-green-600">
            {filteredLogs.length > 0
              ? Math.round(
                  (filteredLogs.filter((l) => l.status === "success").length /
                    filteredLogs.length) *
                    100,
                )
              : 0}
            %
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Total Cost</p>
          <p className="text-2xl font-bold text-gray-900">
            ₦
            {filteredLogs
              .reduce((sum, log) => sum + log.cost, 0)
              .toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Unique Apps</p>
          <p className="text-2xl font-bold text-gray-900">
            {new Set(filteredLogs.map((l) => l.appName)).size}
          </p>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by app name, service, or reference..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <LogsFilters
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={handleClearFilters}
        />
      </motion.div>

      {/* Logs Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <LogsTable logs={currentLogs} isLoading={isLoading} />
      </motion.div>

      {/* Pagination */}
      {filteredLogs.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between"
        >
          <p className="text-sm text-gray-500">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredLogs.length)} of {filteredLogs.length}{" "}
            results
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className={
                      currentPage === pageNum
                        ? "bg-blue-600 hover:bg-blue-700"
                        : ""
                    }
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
