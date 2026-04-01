'use client'

import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  XCircle, 
  Building2, 
  Calendar, 
  MapPin, 
  Users,
  Mail,
  Phone,
  FileText,
  Copy,
  Check,
  Clock,
  BadgeCheck,
  AlertTriangle,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'

interface CacResultCardProps {
  result: {
    success: boolean
    data?: any
    error?: string
  }
}

export function CacResultCard({ result }: CacResultCardProps) {
  const [copied, setCopied] = useState(false)
  const [showDirectors, setShowDirectors] = useState(false)

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
          <h3 className="text-lg font-semibold text-red-900">Company Not Found</h3>
        </div>
        <p className="text-red-700">
          {result.error || 'No company found matching your search criteria. Please verify the details and try again.'}
        </p>
        <div className="mt-4 p-3 bg-red-100 rounded-lg">
          <p className="text-xs text-red-700">
            💡 Tip: Check the RC/BN number format or try searching by company name.
          </p>
        </div>
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
      <div className={`px-6 py-4 ${
        data.status === 'active' 
          ? 'bg-linear-to-r from-green-600 to-green-500' 
          : 'bg-linear-to-r from-red-600 to-red-500'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {data.status === 'active' ? (
              <CheckCircle className="w-5 h-5 text-white" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-white" />
            )}
            <span className="text-white font-semibold">
              {data.status === 'active' ? 'Active Company' : 'Inactive Company'}
            </span>
          </div>
          <Badge className="bg-white/20 text-white hover:bg-white/30">
            {data.searchType === 'rc' ? 'RC Number' : data.searchType === 'bn' ? 'BN Number' : 'Company Name'}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-5">
        {/* Company Name */}
        <div className="text-center border-b border-gray-100 pb-4">
          <Building2 className="w-12 h-12 text-purple-600 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-gray-900">{data.companyName}</h2>
          <p className="text-sm text-gray-500 mt-1">Registration Number: {data.rcNumber}</p>
        </div>

        {/* Registration Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">RC/BN Number</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-medium text-gray-900">{data.rcNumber}</span>
              <button
                onClick={() => copyToClipboard(data.rcNumber)}
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
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Registration Date</span>
            </div>
            <span className="text-sm text-gray-900">
              {new Date(data.registrationDate).toLocaleDateString('en-NG', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Business Type</span>
            </div>
            <Badge variant="outline" className="border-purple-200 text-purple-700">
              {data.businessType}
            </Badge>
          </div>

          <div className="flex items-start gap-2 py-2 border-b border-gray-100">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
            <div className="flex-1">
              <span className="text-sm text-gray-600 block mb-1">Registered Address</span>
              <p className="text-sm text-gray-900">{data.address}</p>
            </div>
          </div>

          {data.companyEmail && (
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Company Email</span>
              </div>
              <span className="text-sm text-gray-900">{data.companyEmail}</span>
            </div>
          )}

          {data.companyPhone && (
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Phone Number</span>
              </div>
              <span className="text-sm text-gray-900">{data.companyPhone}</span>
            </div>
          )}

          {data.taxId && (
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Tax ID</span>
              </div>
              <span className="text-sm text-gray-900">{data.taxId}</span>
            </div>
          )}
        </div>

        {/* Directors Section */}
        <div className="pt-2">
          <button
            onClick={() => setShowDirectors(!showDirectors)}
            className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Directors & Officers</span>
              <Badge className="bg-purple-100 text-purple-700">
                {data.directors.length}
              </Badge>
            </div>
            {showDirectors ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {showDirectors && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 space-y-2"
            >
              {data.directors.map((director: any, index: number) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">{director.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{director.position}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-gray-400">
              <FileText className="w-3 h-3" />
              <span>Ref: {data.reference}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-3 h-3" />
              <span>Searched: {formatDate(data.searchedAt)}</span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-3 p-3 bg-linear-to-r from-purple-50 to-purple-100 rounded-lg">
          <p className="text-xs text-purple-700 text-center">
            ✓ Official CAC database record • Valid for business verification and due diligence
          </p>
        </div>
      </div>
    </motion.div>
  )
}