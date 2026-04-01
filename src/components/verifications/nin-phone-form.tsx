'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Fingerprint, 
  Phone, 
  Shield, 
  Lock, 
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Smartphone
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

interface NinPhoneFormProps {
  onSubmit: (nin: string, phone: string) => void
  isLoading: boolean
  onReset: () => void
}

export function NinPhoneForm({ onSubmit, isLoading, onReset }: NinPhoneFormProps) {
  const [nin, setNin] = useState('')
  const [phone, setPhone] = useState('')
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState({ nin: '', phone: '' })
  const [isValid, setIsValid] = useState({ nin: false, phone: false })

  const validateNIN = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    
    if (cleaned.length === 0) {
      setErrors(prev => ({ ...prev, nin: '' }))
      setIsValid(prev => ({ ...prev, nin: false }))
      return
    }
    
    if (cleaned.length !== 11) {
      setErrors(prev => ({ ...prev, nin: 'NIN must be 11 digits' }))
      setIsValid(prev => ({ ...prev, nin: false }))
    } else {
      setErrors(prev => ({ ...prev, nin: '' }))
      setIsValid(prev => ({ ...prev, nin: true }))
    }
    
    // Auto-format NIN
    if (cleaned.length <= 4) {
      return cleaned
    } else if (cleaned.length <= 8) {
      return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`
    } else {
      return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 8)}-${cleaned.slice(8, 11)}`
    }
  }

  const validatePhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    
    if (cleaned.length === 0) {
      setErrors(prev => ({ ...prev, phone: '' }))
      setIsValid(prev => ({ ...prev, phone: false }))
      return
    }
    
    // Nigerian phone number validation (070, 080, 081, 090, 091)
    const phoneRegex = /^(070|080|081|090|091)\d{8}$/
    if (!phoneRegex.test(cleaned) || cleaned.length !== 11) {
      setErrors(prev => ({ ...prev, phone: 'Invalid Nigerian phone number' }))
      setIsValid(prev => ({ ...prev, phone: false }))
    } else {
      setErrors(prev => ({ ...prev, phone: '' }))
      setIsValid(prev => ({ ...prev, phone: true }))
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

  const handleNinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = validateNIN(e.target.value)
    setNin(formatted || e.target.value)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = validatePhone(e.target.value)
    setPhone(formatted || e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // if (!isValid.nin) {
    //   setErrors(prev => ({ ...prev, nin: 'Please enter a valid 11-digit NIN' }))
    //   return
    // }
    
    if (!isValid.phone) {
      setErrors(prev => ({ ...prev, phone: 'Please enter a valid Nigerian phone number' }))
      return
    }
    
    if (!consent) {
      setErrors(prev => ({ ...prev, nin: 'You must confirm consent to proceed' }))
      return
    }
    
    const cleanNIN = "".replace(/\D/g, '')
    const cleanPhone = phone.replace(/\D/g, '')
    onSubmit(cleanNIN, cleanPhone)
  }

  const handleReset = () => {
    setNin('')
    setPhone('')
    setConsent(false)
    setErrors({ nin: '', phone: '' })
    setIsValid({ nin: false, phone: false })
    onReset()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
        <div className="flex gap-1">
          {/* <Fingerprint className="w-5 h-5 text-teal-600" /> */}
          <Phone className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Enter Verification Details</h2>
      </div>

      {/* NIN Input */}
      {/* <div>
        <Label htmlFor="nin" className="text-gray-700 font-medium">
          National Identity Number (NIN)
        </Label>
        <div className="relative mt-2">
          <Input
            id="nin"
            type="text"
            placeholder="1234-5678-901"
            value={nin}
            onChange={handleNinChange}
            disabled={isLoading}
            className={`
              pl-10 font-mono text-lg tracking-wider
              ${errors.nin ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-teal-500 focus:ring-teal-500'}
            `}
            maxLength={14}
          />
          <Fingerprint className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          {isValid.nin && !errors.nin && (
            <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
          )}
        </div>
        <div className="flex justify-between mt-1">
          <p className="text-xs text-gray-500">
            {nin.replace(/\D/g, '').length}/11 digits
          </p>
          {errors.nin && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.nin}
            </p>
          )}
        </div>
      </div> */}

      {/* Phone Input */}
      <div>
        <Label htmlFor="phone" className="text-gray-700 font-medium">
          Phone Number
        </Label>
        <div className="relative mt-2">
          <Input
            id="phone"
            type="tel"
            placeholder="080-123-4567-8"
            value={phone}
            onChange={handlePhoneChange}
            disabled={isLoading}
            className={`
              pl-10 font-mono text-lg
              ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-teal-500 focus:ring-teal-500'}
            `}
            maxLength={15}
          />
          <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          {isValid.phone && !errors.phone && (
            <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
          )}
        </div>
        <div className="flex justify-between mt-1">
          <p className="text-xs text-gray-500">
            Nigerian mobile number (e.g., 08012345678)
          </p>
          {errors.phone && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="p-4 bg-linear-to-r from-teal-50 to-blue-50 rounded-lg">
        <div className="flex items-start gap-3">
          <Lock className="w-4 h-4 text-teal-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-gray-700 font-medium">Enhanced Verification</p>
            <p className="text-xs text-gray-500 mt-1">
              We'll verify that the phone number matches the NIN record. All data is encrypted and securely processed.
              This helps prevent identity fraud.
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
          I confirm that I have obtained proper consent from the NIN owner to verify their identity
          and confirm their phone number. This is required for NDPR compliance.
        </Label>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading || !phone || !consent}
          className="flex-1 bg-linear-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Verifying...</span>
            </div>
          ) : (
            <>
              Verify NIN with Phone
              <ArrowRight className="ml-2 w-4 h-4" />
            </>
          )}
        </Button>
        
        {(nin || phone) && (
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
          Phone-NIN Match
        </span>
        <span>•</span>
        <span>Fraud Prevention</span>
        <span>•</span>
        <span>NDPR Compliant</span>
      </div>
    </form>
  )
}