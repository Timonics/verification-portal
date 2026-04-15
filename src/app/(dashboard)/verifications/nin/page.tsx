"use client";

import { useNinVerification } from "@/hooks/useNINVerification";
import { NinForm } from "@/components/verifications/nin-form";
import { ResultCard } from "@/components/verifications/result-cards";
import { SecurityBadges } from "@/components/verifications/security-badges";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Fingerprint } from "lucide-react";
import { useState } from "react";

export default function NINVerificationPage() {
  const { mutate, isPending, data, error } = useNinVerification();
  const [submittedNin, setSubmittedNin] = useState<string>("");

  const handleVerify = (nin: string) => {
    setSubmittedNin(nin);
    mutate(nin);
  };

  const handleReset = () => {
    // Clear result – will be handled by re‑rendering when new mutation starts
  };

  // Transform API response to match ResultCard props
  const verificationResult =
    data?.success && data?.data
      ? {
          success: true,
          data: {
            nin: submittedNin,
            firstName: data.data.first_name,
            middleName: data.data.middle_name,
            lastName: data.data.last_name,
            dateOfBirth: data.data.date_of_birth,
            phoneNumber: data.data.phone_number,
            photo: data.data.photo,
            status: "valid",
            reference: `NIN_${Date.now()}`,
            verifiedAt: new Date(),
          },
        }
      : null;

  const isLoading = isPending;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-teal-100 rounded-lg">
            <Fingerprint className="w-6 h-6 text-teal-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">NIN Verification</h1>
        </div>
        <p className="text-gray-600">
          Verify National Identity Number (NIN) instantly. Get full name, date
          of birth, and phone number.
        </p>
      </motion.div>

      <SecurityBadges />

      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <NinForm
            onSubmit={handleVerify}
            isLoading={isLoading}
            onReset={handleReset}
            // error={error?.message}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {verificationResult ? (
              <ResultCard result={verificationResult} />
            ) : (
              <div className="bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-100 p-8 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Shield className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Ready to Verify
                  </h3>
                  <p className="text-sm text-gray-500">
                    Enter a valid NIN to see verification results
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
