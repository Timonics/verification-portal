// src/components/verifications/cac-search-form.tsx
'use client';

import { useState } from 'react';
import { Building2, Search, Shield, Lock, AlertCircle, ArrowRight, CheckCircle2, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CacSearchFormProps {
  onSubmit: (rcNumber: string, companyType: string) => void;
  isLoading: boolean;
  onReset: () => void;
  error?: string;
}

export function CacSearchForm({ onSubmit, isLoading, onReset, error: externalError }: CacSearchFormProps) {
  const [rcNumber, setRcNumber] = useState('');
  const [companyType, setCompanyType] = useState('COMPANY');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validateRC = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length === 0) {
      setError('');
      setIsValid(false);
      return cleaned;
    }
    if (cleaned.length < 6 || cleaned.length > 10) {
      setError('RC number must be 6–10 digits (e.g., 1261103)');
      setIsValid(false);
    } else {
      setError('');
      setIsValid(true);
    }
    return cleaned;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = validateRC(e.target.value);
    setRcNumber(cleaned);
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) {
      setError('Please enter a valid RC number (6–10 digits)');
      return;
    }
    if (!consent) {
      setError('You must confirm consent to proceed');
      return;
    }
    onSubmit(rcNumber, companyType);
  };

  const handleReset = () => {
    setRcNumber('');
    setCompanyType('COMPANY');
    setConsent(false);
    setError('');
    setIsValid(false);
    onReset();
  };

  const displayError = externalError || error;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
        <Search className="w-5 h-5 text-purple-600" />
        <h2 className="text-lg font-semibold text-gray-900">Search Business</h2>
      </div>

      {/* RC Number */}
      <div>
        <Label htmlFor="rc" className="text-gray-700 font-medium">RC Number</Label>
        <div className="relative mt-2">
          <Input
            id="rc"
            type="text"
            inputMode="numeric"
            placeholder="e.g., 1261103"
            value={rcNumber}
            onChange={handleChange}
            disabled={isLoading}
            className={`pl-10 font-mono ${displayError ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-purple-500 focus:ring-purple-500'}`}
            maxLength={10}
          />
          <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          {isValid && !displayError && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />}
        </div>
        {displayError && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" />{displayError}</p>}
      </div>

      {/* Company Type */}
      <div>
        <Label className="text-gray-700 font-medium mb-2 block">Company Type</Label>
        <Select value={companyType} onValueChange={setCompanyType} disabled={isLoading}>
          <SelectTrigger>
            <SelectValue placeholder="Select company type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="COMPANY">Company</SelectItem>
            <SelectItem value="BUSINESS_NAME">Business Name</SelectItem>
            <SelectItem value="INCORPORATED_TRUSTEES">Incorporated Trustees</SelectItem>
            <SelectItem value="LIMITED_PARTNERSHIP">Limited Partnership</SelectItem>
            <SelectItem value="LIMITED_LIABILITY_PARTNERSHIP">Limited Liability Partnership</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Info Box */}
      <div className="p-4 bg-linear-to-r from-purple-50 to-purple-100 rounded-lg">
        <div className="flex items-start gap-3">
          <Building2 className="w-4 h-4 text-purple-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-gray-700 font-medium">What you'll get</p>
            <p className="text-xs text-gray-500 mt-1">
              • Company name & registration number<br />
              • Registration status (Active/Inactive)<br />
              • Registered address & contact email<br />
              • Business type (Company/Business Name/etc.)
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
            <p className="text-xs text-gray-500 mt-1">Search results are sourced directly from the CAC database.</p>
          </div>
        </div>
      </div>

      {/* Consent */}
      <div className="flex items-start space-x-3">
        <Checkbox id="consent" checked={consent} onCheckedChange={(checked) => setConsent(checked as boolean)} disabled={isLoading} className="mt-0.5" />
        <Label htmlFor="consent" className="text-sm text-gray-600 cursor-pointer leading-relaxed">
          I confirm that I am authorized to search for this business information.
        </Label>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isLoading || !rcNumber || !consent} className="flex-1 bg-linear-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white">
          {isLoading ? <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Searching...</span></div> : <>Search Business<Search className="ml-2 w-4 h-4" /></>}
        </Button>
        {rcNumber && <Button type="button" variant="outline" onClick={handleReset} disabled={isLoading}>Clear</Button>}
      </div>

      <div className="flex items-center justify-center gap-4 pt-2 text-xs text-gray-400">
        <span className="flex items-center gap-1"><Shield className="w-3 h-3" />Official CAC Data</span>
        <span>•</span><span>Real‑time Search</span><span>•</span><span>Company Verified</span>
      </div>
    </form>
  );
}