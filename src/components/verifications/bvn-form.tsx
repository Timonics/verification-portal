"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Shield,
  Lock,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface BvnFormProps {
  onSubmit: (bvn: string) => void;
  isLoading: boolean;
  onReset: () => void;
  error?: string; // external error from hook
}

export function BvnForm({ onSubmit, isLoading, onReset, error: externalError }: BvnFormProps) {
  const [bvn, setBvn] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw.length <= 11) {
      setBvn(raw);
      if (raw.length === 11) {
        setError("");
        setIsValid(true);
      } else {
        setError(raw.length > 0 ? `BVN must be 11 digits (${raw.length}/11)` : "");
        setIsValid(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bvn.length !== 11) {
      setError("Please enter a valid 11-digit BVN");
      return;
    }
    if (!consent) {
      setError("You must confirm consent to proceed");
      return;
    }
    onSubmit(bvn);
  };

  const handleReset = () => {
    setBvn("");
    setConsent(false);
    setError("");
    setIsValid(false);
    onReset();
  };

  const displayError = externalError || error;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
        <CreditCard className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Enter BVN Details</h2>
      </div>

      <div>
        <Label htmlFor="bvn" className="text-gray-700 font-medium">
          Bank Verification Number (11 digits)
        </Label>
        <div className="relative mt-2">
          <Input
            id="bvn"
            type="text"
            inputMode="numeric"
            placeholder="12345678901"
            value={bvn}
            onChange={handleChange}
            disabled={isLoading}
            className={`pl-10 font-mono text-lg tracking-wider ${
              displayError ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            }`}
            maxLength={11}
          />
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          {isValid && !displayError && (
            <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
          )}
        </div>
        <div className="flex justify-between mt-1">
          <p className="text-xs text-gray-500">{bvn.length}/11 digits</p>
          {displayError && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {displayError}
            </p>
          )}
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-start gap-3">
          <Lock className="w-4 h-4 text-blue-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-gray-700 font-medium">Privacy Notice</p>
            <p className="text-xs text-gray-500 mt-1">
              Your BVN is encrypted and securely processed. We never store sensitive data.
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
        <Label htmlFor="consent" className="text-sm text-gray-600 cursor-pointer leading-relaxed">
          I confirm that I have obtained proper consent from the BVN owner. Required for NDPR and banking compliance.
        </Label>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading || bvn.length !== 11 || !consent}
          className="flex-1 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Verifying...</span>
            </div>
          ) : (
            <>
              Verify BVN Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </>
          )}
        </Button>
        {bvn && (
          <Button type="button" variant="outline" onClick={handleReset} disabled={isLoading}>
            Clear
          </Button>
        )}
      </div>

      <div className="flex items-center justify-center gap-4 pt-2 text-xs text-gray-400">
        <span className="flex items-center gap-1"><Shield className="w-3 h-3" />256-bit Encrypted</span>
        <span>•</span><span>NDPR Compliant</span>
        <span>•</span><span>Bank-Grade Security</span>
      </div>
    </form>
  );
}