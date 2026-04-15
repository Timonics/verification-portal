'use client'

import { motion } from 'framer-motion'
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
  UserRound
} from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'

interface ResultCardProps {
  result: {
    success: boolean
    data?: any
    error?: string
  }
}

export function ResultCard({ result }: ResultCardProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!result.success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-red-50 rounded-xl border border-red-100 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <XCircle className="w-8 h-8 text-red-500" />
          <h3 className="text-lg font-semibold text-red-900">Verification Failed</h3>
        </div>
        <p className="text-red-700">{result.error || 'Invalid NIN or verification failed'}</p>
      </motion.div>
    )
  }

  const { data } = result

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="bg-linear-to-r from-teal-600 to-teal-500 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">Verification Successful</span>
          </div>
          <Badge className="bg-white/20 text-white hover:bg-white/30">
            Valid
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Photo Placeholder */}
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-gray-400" />
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <UserRound className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">First Name</span>
            </div>
            <span className="font-medium text-gray-900">{data.firstName}</span>
          </div>

          {data.middleName && (
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <UserRound className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Middle Name</span>
              </div>
              <span className="font-medium text-gray-900">{data.middleName}</span>
            </div>
          )}

          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <UserRound className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Last Name</span>
            </div>
            <span className="font-medium text-gray-900">{data.lastName}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Date of Birth</span>
            </div>
            <span className="font-medium text-gray-900">
              {new Date(data.dateOfBirth).toLocaleDateString('en-NG', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </span>
          </div>

          {data.phoneNumber && (
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Phone Number</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">{data.phoneNumber}</span>
                <button
                  onClick={() => copyToClipboard(data.phoneNumber)}
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
          )}

          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Fingerprint className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">NIN</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-gray-900">{data.nin}</span>
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
            <span className="font-mono text-xs text-gray-500">{data.reference}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Clock className="w-3 h-3" />
            <span>Verified: {formatDate(data.verifiedAt)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}