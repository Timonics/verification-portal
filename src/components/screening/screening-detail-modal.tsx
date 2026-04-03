'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Copy, 
  Check,
  FileText,
  AlertTriangle,
  Shield,
  Clock,
  User,
  Hash,
  Activity,
  Eye
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'

interface ScreeningDetailModalProps {
  data: any
  open: boolean
  onClose: () => void
  type: 'PEP' | 'AML'
}

export function ScreeningDetailModal({ data, open, onClose, type }: ScreeningDetailModalProps) {
  const [copied, setCopied] = useState(false)

  if (!data) return null

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 ${type === 'PEP' ? 'bg-orange-100' : 'bg-purple-100'} rounded-lg`}>
                    {type === 'PEP' ? (
                      <AlertTriangle className={`w-5 h-5 text-orange-600`} />
                    ) : (
                      <Shield className={`w-5 h-5 text-purple-600`} />
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {type} Screening Details
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-gray-100"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Full Name</p>
                    <p className="text-lg font-semibold text-gray-900">{data.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Entity Type</p>
                    <p className="text-sm text-gray-900">{data.entity}</p>
                  </div>
                </div>

                {/* Case Info Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    Case Info
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Case ID</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm text-gray-900">
                          {data.caseInfo.caseId}
                        </span>
                        <button
                          onClick={() => copyToClipboard(data.caseInfo.caseId)}
                          className="p-1 hover:bg-white rounded transition"
                        >
                          {copied ? (
                            <Check className="w-3 h-3 text-green-500" />
                          ) : (
                            <Copy className="w-3 h-3 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Match status</span>
                      <Badge className={
                        data.caseInfo.matchStatus === 'No Match' 
                          ? 'bg-gray-100 text-gray-700'
                          : data.caseInfo.matchStatus === 'Potential Match'
                          ? 'bg-yellow-100 text-yellow-700'
                          : data.caseInfo.matchStatus === 'Partial Match'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-red-100 text-red-700'
                      }>
                        {data.caseInfo.matchStatus}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Risk level</span>
                      <Badge className={
                        data.caseInfo.riskLevel === 'Low level'
                          ? 'bg-green-100 text-green-700'
                          : data.caseInfo.riskLevel === 'Medium level'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }>
                        {data.caseInfo.riskLevel}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Match score</span>
                      <span className="font-semibold text-gray-900">{data.caseInfo.matchScore}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Ongoing monitoring</span>
                      <Badge variant="outline">
                        {data.caseInfo.ongoingMonitoring ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Assigned to</span>
                      <span className="text-sm text-gray-900">{data.caseInfo.assignedTo}</span>
                    </div>
                  </div>
                </div>

                {/* Result Info Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-gray-500" />
                    Result Info
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">No. of search results</span>
                      <span className="font-semibold text-gray-900">{data.resultInfo.searchResults}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">No. of PEP/Sanction Screening</span>
                      <span className="font-semibold text-gray-900">{data.resultInfo.pepSanctionScreening}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="border-t border-gray-100 pt-4 flex justify-end gap-3">
                  <Button variant="outline" onClick={onClose}>
                    Close
                  </Button>
                  <Button className={`bg-linear-to-r ${
                    type === 'PEP' 
                      ? 'from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600' 
                      : 'from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600'
                  } text-white`}>
                    Start Monitoring
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}