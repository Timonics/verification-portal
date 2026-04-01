'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Phone, 
  CreditCard, 
  Shield, 
  Lock, 
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Smartphone,
  Search
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

interface BvnPhoneFormProps {
  onSubmit: (phone: string) => void
  isLoading: boolean
  onReset: () => void
}

export function BvnPhoneForm({ onSubmit, isLoading, onReset }: BvnPhoneFormProps) {
  const [phone, setPhone] = useState('')
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState('')
  const [isValid, setIsValid] = useState(false)

  const validatePhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    
    if (cleaned.length === 0) {
      setError('')
      setIsValid(false)
      return cleaned
    }
    
    // Nigerian phone number validation (070, 080, 081, 090, 091)
    const phoneRegex = /^(070|080|081|090|091)\d{8}$/
    if (!phoneRegex.test(cleaned) || cleaned.length !== 11) {
      setError('Invalid Nigerian phone number')
      setIsValid(false)
    } else {
      setError('')
      setIsValid(true)
    }
    
    // Auto-format phone: 08012345678 -> 080-123-4567-8
    if (cleaned.length <= 3) {
      return cleaned
    } else if (cleaned.length <= 6) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`
    } else if (cleaned.length <= 10) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
    } else {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}-${cleaned.slice(10, 11)}`
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = validatePhone(e.target.value)
    setPhone(formatted || e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isValid) {
      setError('Please enter a valid Nigerian phone number')
      return
    }
    
    if (!consent) {
      setError('You must confirm consent to proceed')
      return
    }
    
    const cleanPhone = phone.replace(/\D/g, '')
    onSubmit(cleanPhone)
  }

  const handleReset = () => {
    setPhone('')
    setConsent(false)
    setError('')
    setIsValid(false)
    onReset()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
        <div className="flex gap-1">
          <Phone className="w-5 h-5 text-blue-600" />
          <Search className="w-5 h-5 text-purple-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Retrieve BVN by Phone</h2>
      </div>

      {/* Phone Input */}
      <div>
        <Label htmlFor="phone" className="text-gray-700 font-medium">
          Registered Phone Number
        </Label>
        <div className="relative mt-2">
          <Input
            id="phone"
            type="tel"
            placeholder="080-123-4567-8"
            value={phone}
            onChange={handleChange}
            disabled={isLoading}
            className={`
              pl-10 font-mono text-lg
              ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'}
            `}
            maxLength={15}
          />
          <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          {isValid && !error && (
            <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
          )}
        </div>
        
        <div className="flex justify-between mt-1">
          <p className="text-xs text-gray-500">
            Nigerian mobile number (e.g., 08012345678)
          </p>
          {error && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {error}
            </p>
          )}
        </div>
      </div>

      {/* Information Box */}
      <div className="p-4 bg-linear-to-r from-blue-50 to-purple-50 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
            <CreditCard className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-700 font-medium">What happens next?</p>
            <p className="text-xs text-gray-500 mt-1">
              We'll search our database for the BVN linked to this phone number. 
              The phone number must be the one registered with the bank account.
              Results appear instantly.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-start gap-3">
          <Lock className="w-4 h-4 text-blue-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-gray-700 font-medium">Privacy & Security</p>
            <p className="text-xs text-gray-500 mt-1">
              Your phone number is encrypted and securely processed. We only retrieve BVN 
              information for authorized verification purposes.
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
          I confirm that I have obtained proper consent to retrieve BVN information using this phone number.
          This is required for NDPR and banking compliance.
        </Label>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading || !phone || !consent}
          className="flex-1 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Retrieving BVN...</span>
            </div>
          ) : (
            <>
              Retrieve BVN
              <ArrowRight className="ml-2 w-4 h-4" />
            </>
          )}
        </Button>
        
        {phone && (
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
          Instant Retrieval
        </span>
        <span>•</span>
        <span>Bank-Verified Data</span>
        <span>•</span>
        <span>NDPR Compliant</span>
      </div>
    </form>
  )
}