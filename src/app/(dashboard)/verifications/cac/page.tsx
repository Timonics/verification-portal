"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Search,
  Shield,
  Lock,
  CheckCircle,
  XCircle,
  FileText,
  Clock,
  ArrowRight,
} from "lucide-react";
import { CacSearchForm } from "@/components/verifications/cac-search-form";
import { CacResultCard } from "@/components/verifications/cac-result-card";
import { SecurityBadges } from "@/components/verifications/security-badges";

export default function CACVerificationPage() {
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (searchType: string, query: string) => {
    setIsLoading(true);

    // Mock API call
    setTimeout(() => {
      // Mock success response
      setVerificationResult({
        success: true,
        data: {
          rcNumber: "RC1234567",
          companyName: "VerifyHub Technologies Limited",
          registrationDate: new Date("2020-05-15"),
          status: "active",
          businessType: "Information Technology & Services",
          address: "15, Adeola Odeku Street, Victoria Island, Lagos, Nigeria",
          directors: [
            { name: "Oluwaseun Adekunle", position: "CEO" },
            { name: "Adebayo Ogunlesi", position: "CTO" },
            { name: "Funke Adebayo", position: "CFO" },
          ],
          companyEmail: "info@verifyhub.com",
          companyPhone: "08012345678",
          taxId: "TAX123456789",
          reference: `CAC_${Date.now()}`,
          searchedAt: new Date(),
          searchType: searchType,
          query: query,
        },
      });
      setIsLoading(false);
    }, 2000);
  };

  const handleReset = () => {
    setVerificationResult(null);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Building2 className="w-6 h-6 text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            CAC Business Search
          </h1>
        </div>
        <p className="text-gray-600">
          Search and verify Nigerian businesses from the Corporate Affairs
          Commission (CAC) database. Get company details, registration status,
          and director information.
        </p>
      </motion.div>

      {/* Security Badges */}
      <SecurityBadges />

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <CacSearchForm
            onSubmit={handleSearch}
            isLoading={isLoading}
            onReset={handleReset}
          />
        </motion.div>

        {/* Result Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {verificationResult ? (
              <CacResultCard result={verificationResult} />
            ) : (
              <div className="bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-100 p-8 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Building2 className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Ready to Search
                  </h3>
                  <p className="text-sm text-gray-500">
                    Enter RC Number, BN Number, or Company Name to search
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
