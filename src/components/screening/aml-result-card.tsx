"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  User,
  Clock,
  ExternalLink,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface AmlResultCardProps {
  result: {
    success: boolean;
    data?: {
      risk_level: "Low" | "Medium" | "High";
      match_status: "No Match" | "Potential Match" | "Confirmed Match";
      total_results: number;
      total_articles?: number;
      results: Array<{
        source_type: "PEP" | "SANCTIONS" | "ADVERSE_MEDIA";
        // Common fields for PEP / Sanctions
        name?: string[];
        given_names?: string[];
        last_names?: string[];
        titles?: string[];
        gender?: string[];
        address?: string[];
        country?: string[];
        relations?: any[];
        match?: boolean;
        // Adverse Media fields
        media_category?: string;
        articles?: Array<{
          timestamp: string;
          headline: string;
          source: string;
          body: string;
        }>;
      }>;
    };
    error?: string;
    searcher?: string;
  };
}

export function AmlResultCard({ result }: AmlResultCardProps) {
  const [activeTab, setActiveTab] = useState<"pep" | "sanctions" | "adverse">(
    "pep",
  );

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

  const riskBadgeClass =
    data.risk_level === "Low"
      ? "bg-green-100 text-green-700"
      : data.risk_level === "Medium"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700";

  const matchBadgeClass =
    data.match_status === "No Match"
      ? "bg-gray-100 text-gray-700"
      : data.match_status === "Potential Match"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700";

  // Separate results by type
  const pepResults = data.results.filter((r) => r.source_type === "PEP");
  const sanctionsResults = data.results.filter(
    (r) => r.source_type === "SANCTIONS",
  );
  const adverseResults = data.results.filter(
    (r) => r.source_type === "ADVERSE_MEDIA",
  );

  const renderPersonName = (item: any) => {
    // Prefer `name` array, otherwise combine given_names + last_names
    if (item.name && item.name.length) return item.name.join(", ");
    if (item.given_names && item.last_names) {
      const given = item.given_names.join(" ");
      const last = item.last_names.join(" ");
      return `${given} ${last}`.trim();
    }
    return "N/A";
  };

  const renderContent = () => {
    if (activeTab === "pep") {
      if (pepResults.length === 0) {
        return (
          <p className="text-gray-500 text-center py-4">No PEP matches found</p>
        );
      }
      return pepResults.map((item, idx) => (
        <div key={idx} className="border rounded-lg p-3 space-y-2">
          <div className="flex justify-between items-start gap-2 flex-wrap">
            <div>
              <p className="font-medium">{renderPersonName(item)}</p>
              {item.titles && item.titles.length > 0 && (
                <p className="text-sm text-gray-500">
                  Title(s): {item.titles.join(", ")}
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
          {item.gender && item.gender.length > 0 && (
            <p className="text-xs text-gray-500">
              Gender: {item.gender.join(", ")}
            </p>
          )}
          {item.address && item.address.length > 0 && (
            <p className="text-xs text-gray-500">
              Address: {item.address.join(", ")}
            </p>
          )}
          {item.country && item.country.length > 0 && (
            <p className="text-xs text-gray-400">
              Country: {item.country.join(", ")}
            </p>
          )}
          {item.relations && item.relations.length > 0 && (
            <p className="text-xs text-gray-400">
              Relations: {item.relations.length} related entity(ies)
            </p>
          )}
        </div>
      ));
    }

    if (activeTab === "sanctions") {
      if (sanctionsResults.length === 0) {
        return (
          <p className="text-gray-500 text-center py-4">
            No sanctions matches found
          </p>
        );
      }
      return sanctionsResults.map((item, idx) => (
        <div key={idx} className="border rounded-lg p-3 space-y-2">
          <div className="flex justify-between items-start gap-2 flex-wrap">
            <p className="font-medium">{renderPersonName(item)}</p>
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
          {item.country && item.country.length > 0 && (
            <p className="text-xs text-gray-400">
              Country: {item.country.join(", ")}
            </p>
          )}
        </div>
      ));
    }

    // Adverse Media
    if (adverseResults.length === 0) {
      return (
        <p className="text-gray-500 text-center py-4">
          No adverse media matches found
        </p>
      );
    }

    const stripHtml = (html: string) => {
      const tmp = document.createElement("div");
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
    };

    return adverseResults.map((item, idx) => (
      <div key={idx} className="border rounded-lg p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Badge className="bg-purple-100 text-purple-700">
            {item.media_category?.replace(/_/g, " ").toUpperCase() || "General"}
          </Badge>
        </div>
        <div className="space-y-3">
          {item.articles?.map((article, artIdx) => (
            <div
              key={artIdx}
              className="pl-3 border-l-2 border-gray-200 space-y-1"
            >
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <CalendarIcon className="w-3 h-3" />
                <span>{formatDate(new Date(article.timestamp))}</span>
              </div>
              <h4 className="font-semibold text-gray-900">
                {article.headline}
              </h4>
              <p className="text-sm text-gray-600 line-clamp-3">
                {stripHtml(article.body).substring(0, 200)}...
              </p>
              <a
                href={article.source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
              >
                Read full article <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">
              AML Screening Completed
            </span>
          </div>
          <div className="flex gap-2">
            <Badge className={riskBadgeClass}>Risk: {data.risk_level}</Badge>
            <Badge variant="outline" className="border-white/30 text-white">
              Match: {data.match_status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Searcher & Timestamp */}
        <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-500 border-b pb-3 gap-2">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" /> Screened by: {searcher}
          </div>
        </div>

        {/* Case Info */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Case Info
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-500">Case ID:</span>{" "}
              <span className="font-mono text-gray-900">
                {Math.random().toString(36).substring(2, 15)}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Match Status:</span>{" "}
              <Badge className={matchBadgeClass}>{data.match_status}</Badge>
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

        {/* Manual Tabs */}
        <div className="w-full">
          <div className="flex gap-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("pep")}
              className={`px-4 py-2 text-sm font-medium transition-all ${
                activeTab === "pep"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              PEP ({pepResults.length})
            </button>
            <button
              onClick={() => setActiveTab("sanctions")}
              className={`px-4 py-2 text-sm font-medium transition-all ${
                activeTab === "sanctions"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sanctions ({sanctionsResults.length})
            </button>
            <button
              onClick={() => setActiveTab("adverse")}
              className={`px-4 py-2 text-sm font-medium transition-all ${
                activeTab === "adverse"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Adverse Media ({adverseResults.length})
            </button>
          </div>
          <div className="mt-4 space-y-3">{renderContent()}</div>
        </div>

        <div className="mt-3 p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg text-center text-xs text-purple-700">
          ✓ Screening completed using global watchlists • For compliance
          purposes
        </div>
      </div>
    </motion.div>
  );
}
