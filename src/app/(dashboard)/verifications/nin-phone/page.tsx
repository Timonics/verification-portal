"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Shield } from "lucide-react";
import { useNinByPhone } from "@/hooks/useNINByPhone";
import { NinPhoneForm } from "@/components/verifications/nin-phone-form";
import { NinPhoneResultCard } from "@/components/verifications/nin-phone-result-card";
import { SecurityBadges } from "@/components/verifications/security-badges";

export default function NINWithPhonePage() {
  const { mutate, isPending, data, error } = useNinByPhone();
  const [submittedPhone, setSubmittedPhone] = useState("");

  const handleVerify = (phone: string) => {
    setSubmittedPhone(phone);
    mutate(phone);
  };

  const handleReset = () => {
    // nothing else needed
  };

  const verificationResult =
    data?.success && data?.data
      ? {
          success: true,
          data: {
            first_name: data.data.first_name,
            last_name: data.data.last_name,
            middle_name: data.data.middle_name,
            date_of_birth: data.data.date_of_birth,
            gender: data.data.gender,
            phone_number: data.data.phone_number,
            nin: data.data.nin,
            reference: `NIN_PHONE_${Date.now()}`,
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
          <div className="p-2 bg-linear-to-r from-teal-100 to-blue-100 rounded-lg">
            <Phone className="w-5 h-5 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            NIN with Phone Verification
          </h1>
        </div>
        <p className="text-gray-600">
          Retrieve NIN details using a phone number. Instantly get name, date of
          birth, and the linked NIN.
        </p>
      </motion.div>

      <SecurityBadges />

      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <NinPhoneForm
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
              <NinPhoneResultCard result={verificationResult} />
            ) : (
              <div className="bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-100 p-8 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Phone className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Ready to Verify
                  </h3>
                  <p className="text-sm text-gray-500">
                    Enter a phone number to retrieve NIN details
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
