"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useVerify2FA, useResend2FA } from "@/hooks/auth/useAuth";
import { motion } from "framer-motion";
import { Shield, Smartphone, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import logo from "../../../../public/logo.png";

export default function VerifyOTPPage() {
  const router = useRouter();
  const verify2FAMutation = useVerify2FA();
  const resend2FAMutation = useResend2FA();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("2fa_email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (timeLeft > 0 && !canResend) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
  }, [timeLeft, canResend]);

  // Handle paste on the container of all OTP inputs
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const digits = pastedText.replace(/\D/g, "").slice(0, 6);
    if (digits.length === 0) return;

    const newOtp = [...otp];
    for (let i = 0; i < digits.length; i++) {
      newOtp[i] = digits[i];
    }
    setOtp(newOtp);

    // Focus the next empty field or the last field
    let nextFocusIndex = digits.length;
    if (nextFocusIndex >= 6) nextFocusIndex = 5;
    inputRefs.current[nextFocusIndex]?.focus();
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/g, "");
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) return;
    verify2FAMutation.mutate({ email, code: otpValue });
  };

  const handleResend = () => {
    if (!canResend) return;
    resend2FAMutation.mutate({ email });
    setCanResend(false);
    setTimeLeft(60);
  };

  const isLoading = verify2FAMutation.isPending || resend2FAMutation.isPending;
  const error = verify2FAMutation.error?.message || resend2FAMutation.error?.message;

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-teal-50">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2">
              <Image src={logo} alt="VerifyHub Logo" width={40} height={40} />
              <Shield className="w-10 h-10 text-teal-600" />
              <span className="text-2xl font-bold text-gray-900">VerifyHub</span>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-teal-100 rounded-full">
                <Smartphone className="w-6 h-6 text-teal-600" />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Two-Factor Authentication
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              We've sent a verification code to <strong>{email}</strong>
            </p>
          </div>

          {/* OTP Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="text-center block mb-3 text-gray-700">
                Enter 6-digit code
              </Label>
              <div
                className="flex justify-center gap-2"
                onPaste={handlePaste}
              >
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-mono"
                    autoFocus={index === 0}
                    disabled={isLoading}
                    ref={(el) => { inputRefs.current[index] = el; }}
                  />
                ))}
              </div>
              {error && (
                <p className="text-sm text-red-600 flex items-center justify-center gap-1 mt-3">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white"
            >
              {verify2FAMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying...</span>
                </div>
              ) : (
                <>
                  Verify & Continue
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                Didn't receive a code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={!canResend || resend2FAMutation.isPending}
                  className={`font-medium ${
                    canResend && !resend2FAMutation.isPending
                      ? "text-teal-600 hover:text-teal-700"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {resend2FAMutation.isPending
                    ? "Sending..."
                    : canResend
                    ? "Resend code"
                    : `Resend in ${timeLeft}s`}
                </button>
              </p>
            </div>
          </form>

          {/* Footer */}
          {/* <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              For demo, use code: <span className="font-mono font-semibold">123456</span>
            </p>
          </div> */}
        </motion.div>
      </div>
    </div>
  );
}