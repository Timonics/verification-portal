'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  AlertTriangle, 
  Users, 
  Clock,
  Eye,
  DollarSign
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ScreeningSummary } from '@/components/screening/screening-summary'
import { ScreeningTable } from '@/components/screening/screening-table'
import { ScreeningDetailModal } from '@/components/screening/screening-detail-modal'

// Mock data for AML screening
const mockAmlData = {
  summary: {
    noMatch: 2,
    potentialMatch: 1,
    partialMatch: 0,
    confirmedMatch: 0
  },
  results: [
    {
      id: '1',
      name: 'Global Trading Ltd',
      riskLevel: 'Medium level',
      result: 'Potential match',
      status: 'Under Review',
      entity: 'Business',
      lastUpdated: new Date('2026-03-27T10:15:00'),
      monitoring: 'Ongoing',
      caseInfo: {
        caseId: 'aml-7f8e9d0c-1234-5678-9abc-def012345678',
        matchStatus: 'Potential Match',
        riskLevel: 'Medium level',
        matchScore: 72,
        ongoingMonitoring: true,
        assignedTo: 'Compliance Officer'
      },
      resultInfo: {
        searchResults: 3,
        pepSanctionScreening: 2
      }
    },
    {
      id: '2',
      name: 'Adebayo International',
      riskLevel: 'Low level',
      result: 'No match',
      status: 'Completed',
      entity: 'Individual',
      lastUpdated: new Date('2026-03-26T14:30:00'),
      monitoring: 'One time',
      caseInfo: {
        caseId: 'aml-9a8b7c6d-5678-1234-efgh-ijklmnopqrst',
        matchStatus: 'No Match',
        riskLevel: 'Low level',
        matchScore: 15,
        ongoingMonitoring: false,
        assignedTo: 'N/A'
      },
      resultInfo: {
        searchResults: 0,
        pepSanctionScreening: 0
      }
    }
  ]
}

export default function AMLScreeningPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedResult, setSelectedResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = () => {
    setIsLoading(true)
    // Mock API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleViewDetails = (result: any) => {
    setSelectedResult(result)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">AML Screening</h1>
          </div>
          <p className="text-gray-600">
            Anti-Money Laundering screening for individuals and businesses
          </p>
        </div>
        <Button 
          className="bg-linear-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white"
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? 'Screening...' : 'New Screening'}
        </Button>
      </motion.div>

      {/* Summary Cards */}
      <ScreeningSummary data={mockAmlData.summary} />

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl border border-gray-100 p-4"
      >
        <div className="flex gap-4">
          <div className="flex-1">
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Search by name, business, or ID
            </Label>
            <Input
              placeholder="Enter name, business name, or reference..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex items-end">
            <Button onClick={handleSearch} disabled={isLoading}>
              Search
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Results Table */}
      <ScreeningTable 
        results={mockAmlData.results}
        onViewDetails={handleViewDetails}
        type="AML"
      />

      {/* Detail Modal */}
      <ScreeningDetailModal
        data={selectedResult}
        open={!!selectedResult}
        onClose={() => setSelectedResult(null)}
        type="AML"
      />
    </div>
  )
}