'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Fingerprint, 
  Phone, 
  Shield, 
  Lock,
  CheckCircle,
  XCircle,
  User,
  Calendar,
  Copy,
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react'
import { NinPhoneForm } from '@/components/verifications/nin-phone-form'
import { NinPhoneResultCard } from '@/components/verifications/nin-phone-result-card'
import { SecurityBadges } from '@/components/verifications/security-badges'

export default function NINWithPhonePage() {
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleVerify = async (nin: string, phone: string) => {
    setIsLoading(true)
    
    // Mock API call
    setTimeout(() => {
      // Mock success response
      setVerificationResult({
        success: true,
        data: {
          nin: nin,
          fullName: "Oluwaseun Adekunle",
          dateOfBirth: "1990-05-15",
          phoneNumber: phone,
          verifiedPhone: phone,
          status: "valid",
          matchStatus: "matched",
          reference: `NIN_PHONE_${Date.now()}`,
          verifiedAt: new Date()
        }
      })
      setIsLoading(false)
    }, 2000)
  }

  const handleReset = () => {
    setVerificationResult(null)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-linear-to-r from-teal-100 to-blue-100 rounded-lg">
            <div className="flex gap-1">
              {/* <Fingerprint className="w-5 h-5 text-teal-600" /> */}
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">NIN with Phone Verification</h1>
        </div>
        <p className="text-gray-600">
          Verify NIN and confirm phone number match. Get full identity details with phone verification.
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
          <NinPhoneForm 
            onSubmit={handleVerify} 
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
              <NinPhoneResultCard result={verificationResult} />
            ) : (
              <div className="bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-100 p-8 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <div className="flex gap-2">
                      {/* <Fingerprint className="w-8 h-8 text-gray-400" /> */}
                      <Phone className="w-8 h-8 text-gray-400" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Ready to Verify
                  </h3>
                  <p className="text-sm text-gray-500">
                    Enter NIN and phone number to verify match
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}