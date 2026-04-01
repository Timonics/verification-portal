'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Building2, 
  Search, 
  FileText, 
  Shield, 
  Lock, 
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Hash,
  Tag
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'

interface CacSearchFormProps {
  onSubmit: (searchType: string, query: string) => void
  isLoading: boolean
  onReset: () => void
}

export function CacSearchForm({ onSubmit, isLoading, onReset }: CacSearchFormProps) {
  const [searchType, setSearchType] = useState<string>('rc')
  const [query, setQuery] = useState('')
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState('')
  const [isValid, setIsValid] = useState(false)

  const validateQuery = (value: string, type: string) => {
    const trimmed = value.trim()
    
    if (trimmed.length === 0) {
      setError('')
      setIsValid(false)
      return
    }
    
    if (type === 'rc') {
      // RC Number format: RC followed by numbers (e.g., RC1234567)
      const rcRegex = /^RC\d{6,10}$/i
      if (!rcRegex.test(trimmed.replace(/\s/g, ''))) {
        setError('Invalid RC Number format. Example: RC1234567')
        setIsValid(false)
      } else {
        setError('')
        setIsValid(true)
      }
    } else if (type === 'bn') {
      // BN Number format: BN followed by numbers (e.g., BN1234567)
      const bnRegex = /^BN\d{6,10}$/i
      if (!bnRegex.test(trimmed.replace(/\s/g, ''))) {
        setError('Invalid BN Number format. Example: BN1234567')
        setIsValid(false)
      } else {
        setError('')
        setIsValid(true)
      }
    } else {
      // Company name - at least 3 characters
      if (trimmed.length < 3) {
        setError('Company name must be at least 3 characters')
        setIsValid(false)
      } else {
        setError('')
        setIsValid(true)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    validateQuery(value, searchType)
  }

  const handleTabChange = (value: string) => {
    setSearchType(value)
    setQuery('')
    setError('')
    setIsValid(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isValid) {
      if (searchType === 'rc') setError('Please enter a valid RC Number')
      if (searchType === 'bn') setError('Please enter a valid BN Number')
      if (searchType === 'name') setError('Please enter a valid company name')
      return
    }
    
    if (!consent) {
      setError('You must confirm consent to proceed')
      return
    }
    
    const cleanQuery = query.trim()
    onSubmit(searchType, cleanQuery)
  }

  const handleReset = () => {
    setQuery('')
    setConsent(false)
    setError('')
    setIsValid(false)
    onReset()
  }

  const getPlaceholder = () => {
    switch(searchType) {
      case 'rc':
        return 'e.g., RC1234567'
      case 'bn':
        return 'e.g., BN1234567'
      default:
        return 'e.g., VerifyHub Technologies Limited'
    }
  }

  const getIcon = () => {
    switch(searchType) {
      case 'rc':
        return <Hash className="w-4 h-4" />
      case 'bn':
        return <Tag className="w-4 h-4" />
      default:
        return <Building2 className="w-4 h-4" />
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
        <Search className="w-5 h-5 text-purple-600" />
        <h2 className="text-lg font-semibold text-gray-900">Search Business</h2>
      </div>

      {/* Search Type Tabs */}
      <div>
        <Label className="text-gray-700 font-medium mb-2 block">
          Search By
        </Label>
        <Tabs defaultValue="rc" onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rc">RC Number</TabsTrigger>
            {/* <TabsTrigger value="bn">BN Number</TabsTrigger> */}
            <TabsTrigger value="name">Company Name</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Search Input */}
      <div>
        <Label htmlFor="query" className="text-gray-700 font-medium">
          {searchType === 'rc' ? 'RC Number' : searchType === 'bn' ? 'BN Number' : 'Company Name'}
        </Label>
        <div className="relative mt-2">
          <Input
            id="query"
            type="text"
            placeholder={getPlaceholder()}
            value={query}
            onChange={handleChange}
            disabled={isLoading}
            className={`
              pl-10
              ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-purple-500 focus:ring-purple-500'}
            `}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {getIcon()}
          </div>
          {isValid && !error && (
            <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
          )}
        </div>
        
        {error && (
          <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
            <AlertCircle className="w-3 h-3" />
            {error}
          </p>
        )}
      </div>

      {/* Information Box */}
      <div className="p-4 bg-linear-to-r from-purple-50 to-purple-100 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center shrink-0">
            <Building2 className="w-4 h-4 text-purple-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-700 font-medium">What you'll get</p>
            <p className="text-xs text-gray-500 mt-1">
              • Company registration details<br />
              • Registration status (Active/Inactive)<br />
              • Directors and officers information<br />
              • Registered address and contact details
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-start gap-3">
          <Lock className="w-4 h-4 text-purple-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-gray-700 font-medium">Official CAC Data</p>
            <p className="text-xs text-gray-500 mt-1">
              Search results are sourced directly from the Corporate Affairs Commission (CAC) database.
              Information is official and up-to-date.
            </p>
          </div>
        </div>
      </div>

      {/* Consent Checkbox */}
      <div className="flex items-start space-x-3">
        <Checkbox
          id="consent"
          checked={consent}
          onCheckedChange={(checked) => setConsent(checked as boolean)}
          disabled={isLoading}
          className="mt-0.5"
        />
        <Label htmlFor="consent" className="text-sm text-gray-600 cursor-pointer leading-relaxed">
          I confirm that I am authorized to search for this business information.
          This is for legitimate business purposes.
        </Label>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading || !query || !consent}
          className="flex-1 bg-linear-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Searching...</span>
            </div>
          ) : (
            <>
              Search Business
              <Search className="ml-2 w-4 h-4" />
            </>
          )}
        </Button>
        
        {query && (
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={isLoading}
          >
            Clear
          </Button>
        )}
      </div>

      {/* Security Note */}
      <div className="flex items-center justify-center gap-4 pt-2 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <Shield className="w-3 h-3" />
          Official CAC Data
        </span>
        <span>•</span>
        <span>Real-time Search</span>
        <span>•</span>
        <span>Company Verified</span>
      </div>
    </form>
  )
}