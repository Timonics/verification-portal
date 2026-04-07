'use client'

import { useState } from 'react'
import { 
  Filter, 
  X, 
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { format } from 'date-fns'

const services = [
  'NIN Verification',
  'NIN with Phone',
  'BVN Verification',
  'BVN Retrieval with Phone',
  'CAC Verification'
]

const statuses = [
  { value: 'success', label: 'Success', color: 'green' },
  { value: 'failed', label: 'Failed', color: 'red' }
]

interface ApiCallsFiltersProps {
  filters: {
    service: string
    status: string
    dateRange: { from: Date | null; to: Date | null }
    appName: string
  }
  onFiltersChange: (filters: any) => void
  onClearFilters: () => void
}

export function ApiCallsFilters({ filters, onFiltersChange, onClearFilters }: ApiCallsFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const activeFiltersCount = [
    filters.service,
    filters.status,
    filters.appName,
    filters.dateRange.from
  ].filter(Boolean).length

  // Use undefined instead of empty string for clearing selection
  const handleServiceChange = (value: string) => {
    onFiltersChange({ ...filters, service: value === 'all' ? '' : value })
  }

  const handleStatusChange = (value: string) => {
    onFiltersChange({ ...filters, status: value === 'all' ? '' : value })
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
        >
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filters</span>
          {activeFiltersCount > 0 && (
            <Badge className="bg-blue-100 text-blue-700">
              {activeFiltersCount}
            </Badge>
          )}
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-3 h-3 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100">
          {/* Service Filter */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Service Type
            </Label>
            <Select
              value={filters.service || 'all'}
              onValueChange={handleServiceChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Services" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                {services.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Status
            </Label>
            <Select
              value={filters.status || 'all'}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-${status.color}-500`} />
                      {status.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* App Name Filter */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              App/User Name
            </Label>
            <Input
              type="text"
              placeholder="Search by app name..."
              value={filters.appName}
              onChange={(e) => onFiltersChange({ ...filters, appName: e.target.value })}
            />
          </div>

          {/* Date Range Filter */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Date Range
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateRange.from ? (
                    filters.dateRange.to ? (
                      <>
                        {format(filters.dateRange.from, 'LLL dd, y')} -{' '}
                        {format(filters.dateRange.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(filters.dateRange.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={{
                    from: filters.dateRange.from || undefined,
                    to: filters.dateRange.to || undefined
                  }}
                  onSelect={(range: any) => onFiltersChange({
                    ...filters,
                    dateRange: { from: range?.from || null, to: range?.to || null }
                  })}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}
    </div>
  )
}