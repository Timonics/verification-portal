// src/components/verifications/nin-details-modal.tsx

"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  X as XMark,
  User,
  Calendar,
  Phone,
  Fingerprint,
  Copy,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { BulkRetrievalRow } from "@/types/bulk-nin.types";

interface NinDetailsModalProps {
  row: BulkRetrievalRow | null;
  open: boolean;
  onClose: () => void;
}

export function NinDetailsModal({ row, open, onClose }: NinDetailsModalProps) {
  const [copied, setCopied] = useState(false);
  if (!row || !row.matchedDetails) return null;

  const submitted = {
    fullName: `${row.firstName} ${row.middleName ? row.middleName + " " : ""}${row.lastName}`,
    firstName: row.firstName,
    lastName: row.lastName,
    middleName: row.middleName || "—",
    dateOfBirth: row.dateOfBirth,
    gender: row.gender,
    phone: row.phone,
  };

  const retrieved = {
    fullName: `${row.matchedDetails.firstName} ${row.matchedDetails.middleName ? row.matchedDetails.middleName + " " : ""}${row.matchedDetails.lastName}`,
    firstName: row.matchedDetails.firstName,
    lastName: row.matchedDetails.lastName,
    middleName: row.matchedDetails.middleName || "—",
    dateOfBirth: row.matchedDetails.dateOfBirth,
    gender: row.matchedDetails.gender,
    phone: row.matchedDetails.phone,
    nin: row.matchedDetails.nin,
    photo: row.matchedDetails.photo,
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const compareField = (submittedVal: string, retrievedVal: string) => {
    if (!submittedVal || !retrievedVal) return null;
    const isMatch = submittedVal.toLowerCase() === retrievedVal.toLowerCase();
    return isMatch ? (
      <Check className="w-4 h-4 text-green-600" />
    ) : (
      <XMark className="w-4 h-4 text-red-500" />
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  NIN Verification Details
                </h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="p-6 space-y-6">
                {/* Photo */}
                {retrieved.photo && (
                  <div className="flex justify-center">
                    <div className="relative">
                      <img
                        src={`data:image/jpeg;base64,${retrieved.photo}`}
                        alt="Profile"
                        className="w-28 h-28 rounded-full object-cover border-4 border-teal-200 shadow-md"
                      />
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                        NIN Record
                      </div>
                    </div>
                  </div>
                )}

                {/* Comparison Table */}
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">
                          Field
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">
                          Submitted Data
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">
                          NIN Record
                        </th>
                        <th className="px-4 py-3 text-center font-medium text-gray-700">
                          Match
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">Full Name</td>
                        <td className="px-4 py-3">{submitted.fullName}</td>
                        <td className="px-4 py-3">{retrieved.fullName}</td>
                        <td className="px-4 py-3 text-center">
                          {compareField(submitted.fullName, retrieved.fullName)}
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">First Name</td>
                        <td className="px-4 py-3">{submitted.firstName}</td>
                        <td className="px-4 py-3">{retrieved.firstName}</td>
                        <td className="px-4 py-3 text-center">
                          {compareField(
                            submitted.firstName,
                            retrieved.firstName,
                          )}
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">Last Name</td>
                        <td className="px-4 py-3">{submitted.lastName}</td>
                        <td className="px-4 py-3">{retrieved.lastName}</td>
                        <td className="px-4 py-3 text-center">
                          {compareField(submitted.lastName, retrieved.lastName)}
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">Middle Name</td>
                        <td className="px-4 py-3">{submitted.middleName}</td>
                        <td className="px-4 py-3">{retrieved.middleName}</td>
                        <td className="px-4 py-3 text-center">
                          {compareField(
                            submitted.middleName,
                            retrieved.middleName,
                          )}
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">Date of Birth</td>
                        <td className="px-4 py-3">{submitted.dateOfBirth}</td>
                        <td className="px-4 py-3">{retrieved.dateOfBirth}</td>
                        <td className="px-4 py-3 text-center">
                          {compareField(
                            submitted.dateOfBirth,
                            retrieved.dateOfBirth,
                          )}
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">Gender</td>
                        <td className="px-4 py-3">{submitted.gender}</td>
                        <td className="px-4 py-3">{retrieved.gender}</td>
                        <td className="px-4 py-3 text-center">
                          {compareField(submitted.gender, retrieved.gender)}
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">Phone Number</td>
                        <td className="px-4 py-3">{submitted.phone}</td>
                        <td className="px-4 py-3">{retrieved.phone}</td>
                        <td className="px-4 py-3 text-center">
                          {compareField(submitted.phone, retrieved.phone)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* NIN Section */}
                <div className="bg-teal-50 rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-teal-700 uppercase tracking-wide">
                      Retrieved NIN
                    </p>
                    <p className="text-2xl font-mono font-bold text-teal-900 tracking-wider">
                      {retrieved.nin.replace(
                        /(\d{4})(\d{4})(\d{3})/,
                        "$1-$2-$3",
                      )}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(retrieved.nin)}
                    className="gap-1 border-teal-300 text-teal-700"
                  >
                    {copied ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    Copy
                  </Button>
                </div>

                {/* Overall match status */}
                <div className="text-center text-sm text-gray-500 border-t pt-4">
                  {row.matchStatus === "matched" ? (
                    <Badge className="bg-green-100 text-green-700 px-3 py-1">
                      ✅ All fields matched
                    </Badge>
                  ) : (
                    <Badge className="bg-yellow-100 text-yellow-700 px-3 py-1">
                      ⚠️ One or more fields do not match
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
