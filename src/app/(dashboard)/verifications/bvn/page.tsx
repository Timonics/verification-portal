"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Shield } from "lucide-react";
import { useBvnVerification } from "@/hooks/useBVNVerification";
import { BvnForm } from "@/components/verifications/bvn-form";
import { BvnResultCard } from "@/components/verifications/bvn-result-card";
import { SecurityBadges } from "@/components/verifications/security-badges";

export default function BVNVerificationPage() {
  const { mutate, isPending, data, error } = useBvnVerification();
  const [submittedBvn, setSubmittedBvn] = useState("");

  const handleVerify = (bvn: string) => {
    setSubmittedBvn(bvn);
    mutate(bvn);
  };

  const handleReset = () => {
    // Reset handled by form – no extra state needed
  };

  // Transform API response to match result card props
  const verificationResult = data?.success && data?.data
    ? {
        success: true,
        data: {
          bvn: data.data.bvn,
          first_name: data.data.first_name,
          last_name: data.data.last_name,
          middle_name: data.data.middle_name,
          gender: data.data.gender,
          date_of_birth: data.data.date_of_birth,
          phone_number1: data.data.phone_number1,
          phone_number2: data.data.phone_number2,
          image: data.data.image,
          reference: `BVN_${Date.now()}`,
          verifiedAt: new Date(),
        },
      }
    : null;

  const isLoading = isPending;

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <CreditCard className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">BVN Verification</h1>
        </div>
        <p className="text-gray-600">
          Verify Bank Verification Number (BVN) instantly. Get full name, date of birth, phone number, and gender.
        </p>
      </motion.div>

      <SecurityBadges />

      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <BvnForm
            onSubmit={handleVerify}
            isLoading={isLoading}
            onReset={handleReset}
            error={error?.message}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {verificationResult ? (
              <BvnResultCard result={verificationResult} />
            ) : (
              <div className="bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-100 p-8 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <CreditCard className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Verify</h3>
                  <p className="text-sm text-gray-500">Enter a valid BVN to see verification results</p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}