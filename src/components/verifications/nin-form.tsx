'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Fingerprint, 
  Shield, 
  Lock, 
  AlertCircle,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface NinFormProps {
  onSubmit: (nin: string) => void
  isLoading: boolean
  onReset: () => void
}

export function NinForm({ onSubmit, isLoading, onReset }: NinFormProps) {
  const [nin, setNin] = useState('')
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState('')
  const [isValid, setIsValid] = useState(false)

  const validateNIN = (value: string) => {
    // Remove non-digits
    const cleaned = value.replace(/\D/g, '')
    
    if (cleaned.length === 0) {
      setError('')
      setIsValid(false)
      return
    }
    
    if (cleaned.length !== 11) {
      setError('NIN must be 11 digits')
      setIsValid(false)
    } else {
      setError('')
      setIsValid(true)
    }
    
    // Auto-format: 12345678901 -> 1234-5678-901
    if (cleaned.length <= 4) {
      return cleaned
    } else if (cleaned.length <= 8) {
      return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`
    } else {
      return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 8)}-${cleaned.slice(8, 11)}`
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = validateNIN(e.target.value)
    setNin(formatted || e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isValid) {
      setError('Please enter a valid 11-digit NIN')
      return
    }
    
    if (!consent) {
      setError('You must confirm consent to proceed')
      return
    }
    
    const cleanNIN = nin.replace(/\D/g, '')
    onSubmit(cleanNIN)
  }

  const handleReset = () => {
    setNin('')
    setConsent(false)
    setError('')
    setIsValid(false)
    onReset()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
        <Fingerprint className="w-5 h-5 text-teal-600" />
        <h2 className="text-lg font-semibold text-gray-900">Enter NIN Details</h2>
      </div>

      {/* NIN Input */}
      <div>
        <Label htmlFor="nin" className="text-gray-700 font-medium">
          National Identity Number
        </Label>
        <div className="relative mt-2">
          <Input
            id="nin"
            type="text"
            placeholder="1234-5678-901"
            value={nin}
            onChange={handleChange}
            disabled={isLoading}
            className={`
              pl-10 font-mono text-lg tracking-wider
              ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-teal-500 focus:ring-teal-500'}
            `}
            maxLength={14} // 11 digits + 2 hyphens
          />
          <Fingerprint className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          {isValid && !error && (
            <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
          )}
        </div>
        
        {/* Character counter */}
        <div className="flex justify-between mt-1">
          <p className="text-xs text-gray-500">
            {nin.replace(/\D/g, '').length}/11 digits
          </p>
          {error && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {error}
            </p>
          )}
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-start gap-3">
          <Lock className="w-4 h-4 text-teal-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-gray-700 font-medium">Privacy Notice</p>
            <p className="text-xs text-gray-500 mt-1">
              Your NIN is encrypted and securely processed. We never store sensitive data without your consent.
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
          I confirm that I have obtained proper consent from the NIN owner to verify their identity.
          This is required for NDPR compliance.
        </Label>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading || !nin || !consent}
          className="flex-1 bg-linear-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Verifying...</span>
            </div>
          ) : (
            <>
              Verify NIN Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </>
          )}
        </Button>
        
        {nin && (
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
          256-bit Encrypted
        </span>
        <span>•</span>
        <span>NDPR Compliant</span>
        <span>•</span>
        <span>Instant Results</span>
      </div>
    </form>
  )
}