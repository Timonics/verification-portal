'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  CheckCircle, 
  XCircle, 
  Copy,
  Check,
  Calendar,
  Clock,
  DollarSign,
  User,
  FileText,
  Tag
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDate, formatCurrency } from '@/lib/utils'

interface LogDetailModalProps {
  log: any
  open: boolean
  onClose: () => void
}

export function LogDetailModal({ log, open, onClose }: LogDetailModalProps) {
  const [copied, setCopied] = useState(false)

  if (!log) return null

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
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Verification Details</h2>
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
                {/* Status Header */}
                <div className={`p-4 rounded-lg ${
                  log.status === 'success' ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  <div className="flex items-center gap-3">
                    {log.status === 'success' ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                    <div>
                      <p className="font-semibold text-gray-900">
                        {log.status === 'success' ? 'Verification Successful' : 'Verification Failed'}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Reference: {log.reference}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Service Type</p>
                    <Badge variant="outline" className="bg-gray-50">
                      {log.service}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Status</p>
                    <Badge className={log.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                      {log.status === 'success' ? 'Success' : 'Failed'}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Application</p>
                    <p className="text-sm font-medium text-gray-900">{log.appName}</p>
                  </div>
                  {log.userIdentifier && (
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">User Identifier</p>
                      <p className="text-sm font-mono text-gray-900">{log.userIdentifier}</p>
                    </div>
                  )}
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Date & Time</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <p className="text-sm text-gray-900">{formatDate(log.dateTime)}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Cost</p>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-3 h-3 text-gray-400" />
                      <p className="text-sm font-semibold text-gray-900">{formatCurrency(log.cost)}</p>
                    </div>
                  </div>
                </div>

                {/* Reference */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Transaction Reference</p>
                      <div className="flex items-center gap-2">
                        <Tag className="w-3 h-3 text-gray-400" />
                        <p className="text-sm font-mono text-gray-900">{log.reference}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(log.reference)}
                      className="text-gray-500"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Verification Data */}
                {log.details && (
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-xs text-gray-500 mb-3">Verification Data</p>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      {Object.entries(log.details).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-gray-600">{key}</span>
                          <span className="font-mono text-gray-900">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Error Details (if failed) */}
                {log.status === 'failed' && log.details?.error && (
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-xs text-gray-500 mb-2">Error Details</p>
                    <div className="bg-red-50 rounded-lg p-3">
                      <p className="text-sm text-red-700">{log.details.error}</p>
                    </div>
                  </div>
                )}

                {/* Footer Actions */}
                <div className="border-t border-gray-100 pt-4 flex justify-end gap-3">
                  <Button variant="outline" onClick={onClose}>
                    Close
                  </Button>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => {
                      // Mock retry action
                      alert('Retry functionality would be implemented here')
                    }}
                  >
                    Retry Verification
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