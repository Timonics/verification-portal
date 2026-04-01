'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield, 
  Lock, 
  CheckCircle, 
  XCircle,
  User,
  Calendar,
  Phone,
  Fingerprint,
  FileText,
  Copy,
  Eye,
  AlertCircle,
  ArrowRight,
  CreditCard,
  Venus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { BvnForm } from '@/components/verifications/bvn-form'
import { BvnResultCard } from '@/components/verifications/bvn-result-card'
import { SecurityBadges } from '@/components/verifications/security-badges'

export default function BVNVerificationPage() {
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleVerify = async (bvn: string) => {
    setIsLoading(true)
    
    // Mock API call
    setTimeout(() => {
      // Mock success response
      setVerificationResult({
        success: true,
        data: {
          bvn: bvn,
          fullName: "Adebayo Ogunlesi",
          dateOfBirth: "1988-03-22",
          phoneNumber: "08098765432",
          gender: "Male",
          photo: null,
          reference: `BVN_${Date.now()}`,
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
          <div className="p-2 bg-blue-100 rounded-lg">
            <CreditCard className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">BVN Verification</h1>
        </div>
        <p className="text-gray-600">
          Verify Bank Verification Number (BVN) instantly. Get full name, date of birth, phone number, and gender.
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
          <BvnForm 
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
              <BvnResultCard result={verificationResult} />
            ) : (
              <div className="bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-100 p-8 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <CreditCard className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Ready to Verify
                  </h3>
                  <p className="text-sm text-gray-500">
                    Enter a valid BVN to see verification results
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