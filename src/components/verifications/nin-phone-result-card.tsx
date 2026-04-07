"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  User,
  Calendar,
  Phone,
  Fingerprint,
  Copy,
  Check,
  FileText,
  Clock,
  BadgeCheck,
  Smartphone,
  Venus,
  Mars,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface NinPhoneResultCardProps {
  result: {
    success: boolean;
    data?: {
      first_name: string;
      last_name: string;
      middle_name?: string;
      date_of_birth: string;
      gender: string;
      phone_number: string;
      nin: string;
      reference?: string;
      verifiedAt?: Date;
    };
    error?: string;
  };
}

export function NinPhoneResultCard({ result }: NinPhoneResultCardProps) {
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
            Verification Failed
          </h3>
        </div>
        <p className="text-red-700">
          {result.error || "No NIN found for this phone number."}
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
          <Smartphone className="w-8 h-8 text-yellow-500" />
          <h3 className="text-lg font-semibold text-yellow-900">
            No Data Available
          </h3>
        </div>
        <p className="text-yellow-700">
          The phone number was verified, but no associated NIN details were
          found.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="bg-linear-to-r from-teal-600 to-blue-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BadgeCheck className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">
              NIN Retrieved Successfully
            </span>
          </div>
          <Badge className="bg-white/20 text-white hover:bg-white/30">
            Phone Matched
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Photo Placeholder (optional – API may provide photo) */}
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 bg-linear-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-teal-600" />
          </div>
        </div>

        {/* Personal Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <UserRound className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">First Name</span>
            </div>
            <span className="font-medium text-gray-900">{data.first_name}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <UserRound className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Last Name</span>
            </div>
            <span className="font-medium text-gray-900">{data.last_name}</span>
          </div>

          {data.middle_name && (
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <UserRound className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Middle Name</span>
              </div>
              <span className="font-medium text-gray-900">
                {data.middle_name}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Date of Birth</span>
            </div>
            <span className="font-medium text-gray-900">
              {new Date(data.date_of_birth).toLocaleDateString("en-NG", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              {data.gender?.toLowerCase() === "male" ? (
                <Mars className="w-4 h-4 text-blue-500" />
              ) : (
                <Venus className="w-4 h-4 text-pink-500" />
              )}
              <span className="text-sm text-gray-600">Gender</span>
            </div>
            <Badge
              variant="outline"
              className={
                data.gender?.toLowerCase() === "male"
                  ? "border-blue-200 text-blue-700"
                  : "border-pink-200 text-pink-700"
              }
            >
              {data.gender}
            </Badge>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Phone Number</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">
                {data.phone_number}
              </span>
              <button
                onClick={() => copyToClipboard(data.phone_number)}
                className="p-1 hover:bg-gray-100 rounded transition"
              >
                {copied ? (
                  <Check className="w-3 h-3 text-green-500" />
                ) : (
                  <Copy className="w-3 h-3 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Fingerprint className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">NIN</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-gray-900">
                {data.nin.replace(/(\d{4})(\d{4})(\d{3})/, "$1-$2-$3")}
              </span>
              <button
                onClick={() => copyToClipboard(data.nin)}
                className="p-1 hover:bg-gray-100 rounded transition"
              >
                {copied ? (
                  <Check className="w-3 h-3 text-green-500" />
                ) : (
                  <Copy className="w-3 h-3 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Reference</span>
            </div>
            <span className="font-mono text-xs text-gray-500">
              {data.reference}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Clock className="w-3 h-3" />
            <span>Retrieved: {formatDate(data.verifiedAt || new Date())}</span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-3 p-3 bg-linear  -to-r from-teal-50 to-blue-50 rounded-lg">
          <p className="text-xs text-teal-700 text-center">
            ✓ Phone number verified against NIN database • Enhanced identity
            assurance
          </p>
        </div>
      </div>
    </motion.div>
  );
}
