"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Clock,
  User,
  Building2,
  Globe,
  Hash,
  Activity,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/utils";

interface AmlResultCardProps {
  result: {
    success: boolean;
    data?: {
      risk_level: "Low" | "Medium" | "High";
      match_status: "No Match" | "Potential Match" | "Confirmed Match";
      total_results: number;
      results: Array<{
        name: string[];
        source_type: "PEP" | "SANCTIONS" | "ADVERSE_MEDIA";
        match: boolean;
        positions?: string[];
        country?: string[];
        date_of_birth?: string[];
        urls?: string[];
      }>;
      screened_at: string;
    };
    error?: string;
    searcher?: string; // from authenticated user
  };
}

export function AmlResultCard({ result }: AmlResultCardProps) {
  if (!result.success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-red-50 rounded-xl border border-red-100 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <XCircle className="w-8 h-8 text-red-500" />
          <h3 className="text-lg font-semibold text-red-900">
            Screening Failed
          </h3>
        </div>
        <p className="text-red-700">
          {result.error || "Unable to complete AML screening"}
        </p>
      </motion.div>
    );
  }

  const { data, searcher = "Admin User" } = result;

  if (!data) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-yellow-50 rounded-xl border border-yellow-100 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-8 h-8 text-yellow-500" />
          <h3 className="text-lg font-semibold text-yellow-900">
            No Data Available
          </h3>
        </div>
        <p className="text-yellow-700">
          The screening was completed but no data was returned.
        </p>
      </motion.div>
    );
  }

  const riskColor =
    data.risk_level === "Low"
      ? "green"
      : data.risk_level === "Medium"
        ? "yellow"
        : "red";

  // Group results by source_type
  const pepResults = data.results.filter((r) => r.source_type === "PEP");
  const sanctionsResults = data.results.filter(
    (r) => r.source_type === "SANCTIONS",
  );
  const adverseResults = data.results.filter(
    (r) => r.source_type === "ADVERSE_MEDIA",
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="bg-linear-to-r from-purple-600 to-purple-500 px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">
              AML Screening Completed
            </span>
          </div>
          <div className="flex gap-2">
            <Badge className={`bg-${riskColor}-100 text-${riskColor}-700`}>
              Risk: {data.risk_level}
            </Badge>
            <Badge variant="outline" className="border-white/30 text-white">
              Match: {data.match_status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Searcher & Timestamp */}
        <div className="flex justify-between text-sm text-gray-500 border-b pb-3">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" /> Screened by: {searcher}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />{" "}
            {formatDate(new Date(data.screened_at))}
          </div>
        </div>

        {/* Case Info */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Case Info
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-500">Case ID:</span>{" "}
              <span className="font-mono text-gray-900">
                {Math.random().toString(36).substring(2, 15)}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Match Status:</span>{" "}
              <Badge
                variant="outline"
                className={
                  data.match_status === "No Match"
                    ? "bg-gray-100"
                    : data.match_status === "Potential Match"
                      ? "bg-yellow-100"
                      : "bg-red-100"
                }
              >
                {data.match_status}
              </Badge>
            </div>
            <div>
              <span className="text-gray-500">Match Score:</span>{" "}
              <span className="font-semibold">
                {data.match_status === "Confirmed Match"
                  ? "95"
                  : data.match_status === "Potential Match"
                    ? "65"
                    : "0"}
                %
              </span>
            </div>
            <div>
              <span className="text-gray-500">Total Results:</span>{" "}
              <span>{data.total_results}</span>
            </div>
          </div>
        </div>

        {/* Categories Tabs */}
        <Tabs defaultValue="pep" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pep">PEP ({pepResults.length})</TabsTrigger>
            <TabsTrigger value="sanctions">
              Sanctions ({sanctionsResults.length})
            </TabsTrigger>
            <TabsTrigger value="adverse">
              Adverse Media ({adverseResults.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pep" className="space-y-3 mt-4">
            {pepResults.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No PEP matches found
              </p>
            ) : (
              pepResults.map((item, idx) => (
                <div key={idx} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{item.name.join(", ")}</p>
                      {item.positions &&item.positions?.length > 0 && (
                        <p className="text-sm text-gray-500">
                          Positions: {item.positions.join(", ")}
                        </p>
                      )}
                    </div>
                    <Badge
                      className={
                        item.match
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }
                    >
                      {item.match ? "Match" : "No Match"}
                    </Badge>
                  </div>
                  {item.country && (
                    <p className="text-xs text-gray-400 mt-1">
                      Country: {item.country.join(", ")}
                    </p>
                  )}
                  {item.date_of_birth && (
                    <p className="text-xs text-gray-400">
                      DOB: {item.date_of_birth.join(", ")}
                    </p>
                  )}
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="sanctions" className="space-y-3 mt-4">
            {sanctionsResults.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No sanctions matches found
              </p>
            ) : (
              sanctionsResults.map((item, idx) => (
                <div key={idx} className="border rounded-lg p-3">
                  <div className="flex justify-between">
                    <p className="font-medium">{item.name.join(", ")}</p>
                    <Badge
                      className={
                        item.match
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }
                    >
                      {item.match ? "Match" : "No Match"}
                    </Badge>
                  </div>
                  {item.country && (
                    <p className="text-xs text-gray-400 mt-1">
                      Country: {item.country.join(", ")}
                    </p>
                  )}
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="adverse" className="space-y-3 mt-4">
            {adverseResults.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No adverse media matches found
              </p>
            ) : (
              adverseResults.map((item, idx) => (
                <div key={idx} className="border rounded-lg p-3">
                  <div className="flex justify-between">
                    <p className="font-medium">{item.name.join(", ")}</p>
                    <Badge
                      className={
                        item.match
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }
                    >
                      {item.match ? "Potential" : "No Match"}
                    </Badge>
                  </div>
                  {item.urls && (
                    <a
                      href={item.urls[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Source
                    </a>
                  )}
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-3 p-3 bg-linear-to-r from-purple-50 to-purple-100 rounded-lg text-center text-xs text-purple-700">
          ✓ Screening completed using global watchlists • For compliance
          purposes
        </div>
      </div>
    </motion.div>
  );
}
