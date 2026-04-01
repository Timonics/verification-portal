"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  CreditCard,
  Shield,
  Lock,
  CheckCircle,
  XCircle,
  User,
  Calendar,
  Copy,
  FileText,
  Clock,
  Smartphone,
  Search,
} from "lucide-react";
import { BvnPhoneForm } from "@/components/verifications/bvn-phone-form";
import { BvnPhoneResultCard } from "@/components/verifications/bvn-phone-result-card";
import { SecurityBadges } from "@/components/verifications/security-badges";

export default function BVNRetrievalPage() {
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRetrieve = async (phone: string) => {
    setIsLoading(true);

    // Mock API call
    setTimeout(() => {
      // Mock success response
      setVerificationResult({
        success: true,
        data: {
          bvn: "22345678901",
          phoneNumber: phone,
          fullName: "Adebayo Ogunlesi",
          dateOfBirth: "1988-03-22",
          gender: "Male",
          retrievalMethod: "Phone Match",
          reference: `BVN_RETRIEVAL_${Date.now()}`,
          retrievedAt: new Date(),
        },
      });
      setIsLoading(false);
    }, 2000);
  };

  const handleReset = () => {
    setVerificationResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-linear-to-r from-blue-100 to-purple-100 rounded-lg">
            <div className="flex gap-1">
              <Phone className="w-5 h-5 text-blue-600" />
              {/* <CreditCard className="w-5 h-5 text-purple-600" /> */}
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            BVN Retrieval with Phone
          </h1>
        </div>
        <p className="text-gray-600">
          Retrieve BVN using phone number. Quickly get BVN details linked to a
          registered phone number.
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
          <BvnPhoneForm
            onSubmit={handleRetrieve}
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
              <BvnPhoneResultCard result={verificationResult} />
            ) : (
              <div className="bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-100 p-8 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <div className="flex gap-2">
                      <Phone className="w-8 h-8 text-gray-400" />
                      {/* <CreditCard className="w-8 h-8 text-gray-400" /> */}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Ready to Retrieve BVN
                  </h3>
                  <p className="text-sm text-gray-500">
                    Enter phone number to retrieve linked BVN
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
