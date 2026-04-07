// src/components/verifications/cac-result-card.tsx
"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Building2,
  MapPin,
  Mail,
  FileText,
  Copy,
  Check,
  Clock,
  BadgeCheck,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface CacResultCardProps {
  result: {
    success: boolean;
    data?: {
      company_name: string;
      type_of_company: string;
      rc_number: string;
      business_number?: string | null;
      status: string;
      email: string;
      address: string;
      state: string;
      city: string;
      lga: string;
      reference?: string;
      searchedAt?: Date;
    };
    error?: string;
  };
}

export function CacResultCard({ result }: CacResultCardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            Company Not Found
          </h3>
        </div>
        <p className="text-red-700">
          {result.error ||
            "No company found. Check the RC number and company type."}
        </p>
      </motion.div>
    );
  }

  const { data } = result;

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
          The company was found but no details are available. This may be due to
          an issue with the CAC database or the provided information.
        </p>
      </motion.div>
    );
  }

  const isActive = data.status?.toLowerCase() === "active";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden"
    >
      <div
        className={`px-6 py-4 ${isActive ? "bg-linear-to-r from-green-600 to-green-500" : "bg-linear-to-r from-red-600 to-red-500"}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isActive ? (
              <CheckCircle className="w-5 h-5 text-white" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-white" />
            )}
            <span className="text-white font-semibold">
              {isActive ? "Active Company" : "Inactive Company"}
            </span>
          </div>
          <Badge className="bg-white/20 text-white">RC Number</Badge>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <div className="text-center border-b border-gray-100 pb-4">
          <Building2 className="w-12 h-12 text-purple-600 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-gray-900">
            {data.company_name}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            RC Number: {data.rc_number}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Business Type</span>
            <Badge
              variant="outline"
              className="border-purple-200 text-purple-700"
            >
              {data.type_of_company}
            </Badge>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Status</span>
            <Badge
              className={
                isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }
            >
              {data.status}
            </Badge>
          </div>

          {data.email && (
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Email</span>
              </div>
              <span className="text-sm text-gray-900">{data.email}</span>
            </div>
          )}

          <div className="flex items-start gap-2 py-2 border-b border-gray-100">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
            <div className="flex-1">
              <span className="text-sm text-gray-600 block mb-1">
                Registered Address
              </span>
              <p className="text-sm text-gray-900">{data.address}</p>
              <p className="text-xs text-gray-500 mt-1">
                {data.city}, {data.state}, {data.lga}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-gray-400">
              <FileText className="w-3 h-3" />
              <span>Ref: {data.reference || "CAC_" + Date.now()}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-3 h-3" />
              <span>Searched: {formatDate(data.searchedAt || new Date())}</span>
            </div>
          </div>
        </div>

        <div className="mt-3 p-3 bg-linear-to-r from-purple-50 to-purple-100 rounded-lg">
          <p className="text-xs text-purple-700 text-center">
            ✓ Official CAC database record • Valid for business verification
          </p>
        </div>
      </div>
    </motion.div>
  );
}
