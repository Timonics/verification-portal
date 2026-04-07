"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Shield,
  Lock,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface NinPhoneFormProps {
  onSubmit: (phone: string) => void; // only phone now
  isLoading: boolean;
  onReset: () => void;
  error?: string;
}

export function NinPhoneForm({
  onSubmit,
  isLoading,
  onReset,
  error: externalError,
}: NinPhoneFormProps) {
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const validatePhone = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length === 0) {
      setError("");
      setIsValid(false);
      return cleaned;
    }
    const phoneRegex = /^(070|080|081|090|091)\d{8}$/;
    if (!phoneRegex.test(cleaned) || cleaned.length !== 11) {
      setError("Invalid Nigerian phone number");
      setIsValid(false);
    } else {
      setError("");
      setIsValid(true);
    }
    // Auto-format: 08012345678 -> 080-123-4567-8
    //   if (cleaned.length <= 3) return cleaned;
    //   if (cleaned.length <= 6)
    //     return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    //   if (cleaned.length <= 10)
    //     return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    //   return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}-${cleaned.slice(10)}`;
    return cleaned;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = validatePhone(e.target.value);
    setPhone(formatted || e.target.value);
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) {
      setError("Please enter a valid Nigerian phone number");
      return;
    }
    if (!consent) {
      setError("You must confirm consent to proceed");
      return;
    }
    const cleanPhone = phone.replace(/\D/g, "");
    onSubmit(cleanPhone);
  };

  const handleReset = () => {
    setPhone("");
    setConsent(false);
    setError("");
    setIsValid(false);
    onReset();
  };

  const displayError = externalError || error;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
        <Phone className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">
          Enter Phone Number
        </h2>
      </div>

      <div>
        <Label htmlFor="phone" className="text-gray-700 font-medium">
          Phone Number
        </Label>
        <div className="relative mt-2">
          <Input
            id="phone"
            type="tel"
            placeholder="08012345678"
            value={phone}
            onChange={handleChange}
            disabled={isLoading}
            className={`pl-10 font-mono text-lg ${displayError ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-teal-500 focus:ring-teal-500"}`}
            maxLength={11}
          />
          <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          {isValid && !displayError && (
            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
          )}
        </div>
        <div className="flex justify-between mt-1">
          <p className="text-xs text-gray-500">{phone.length}/11 digits</p>
          {displayError && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {displayError}
            </p>
          )}
        </div>
      </div>

      <div className="p-4 bg-linear-to-r from-teal-50 to-blue-50 rounded-lg">
        <div className="flex items-start gap-3">
          <Lock className="w-4 h-4 text-teal-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-gray-700 font-medium">
              Enhanced Verification
            </p>
            <p className="text-xs text-gray-500 mt-1">
              We'll retrieve the NIN linked to this phone number. All data is
              encrypted and securely processed.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-start space-x-3">
        <Checkbox
          id="consent"
          checked={consent}
          onCheckedChange={(checked) => setConsent(checked as boolean)}
          disabled={isLoading}
          className="mt-0.5"
        />
        <Label
          htmlFor="consent"
          className="text-sm text-gray-600 cursor-pointer leading-relaxed"
        >
          I confirm that I have obtained proper consent to retrieve NIN
          information using this phone number.
        </Label>
      </div>

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

      <div className="flex items-center justify-center gap-4 pt-2 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <Shield className="w-3 h-3" />
          Phone‑NIN Match
        </span>
        <span>•</span>
        <span>Fraud Prevention</span>
        <span>•</span>
        <span>NDPR Compliant</span>
      </div>
    </form>
  );
}
