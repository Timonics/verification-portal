"use client";

import { useState } from "react";
import { useLogin } from "@/hooks/auth/useAuth";
import { motion } from "framer-motion";
import {
  Shield,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Mail,
  Lock,
  Fingerprint,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import logo from "../../../../public/logo.png";

export default function LoginPage() {
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  const isLoading = loginMutation.isPending;
  const error = loginMutation.error?.message;

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-gray-50 via-white to-teal-50">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 pattern-bg"></div>
      </div>

      {/* Main Container */}
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="relative">
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-100">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-teal-100 to-teal-50 rounded-full blur-2xl -z-10"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-linear-to-tr from-purple-100 to-purple-50 rounded-full blur-2xl -z-10"></div>

              {/* Logo */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="flex justify-center mb-8"
              >
                <div className="relative">
                  <div className="relative bg-linear-to-r from-teal-500 to-teal-400 rounded-2xl p-4 shadow-lg">
                    <Image
                      src={logo}
                      alt="VerifyHub Logo"
                      width={40}
                      height={40}
                    />
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -top-1 -right-1"
                  >
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Header */}
              <div className="text-center mb-8">
                <motion.h1
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
                >
                  Welcome back
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-500 mt-2"
                >
                  Sign in to your admin account
                </motion.p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email address
                  </Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                      className="pl-10 border-gray-200 focus:border-teal-500 focus:ring-teal-500 rounded-xl"
                    />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Label
                    htmlFor="password"
                    className="text-gray-700 font-medium"
                  >
                    Password
                  </Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className="pl-10 pr-10 border-gray-200 focus:border-teal-500 focus:ring-teal-500 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </motion.div>
                {/* Remember me and forgot password sections have been removed for
                a cleaner UI, but can be added back in if needed. */}
                {/* <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) =>
                        setRememberMe(checked as boolean)
                      }
                      disabled={isLoading}
                      className="border-gray-300 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
                    />
                    <Label
                      htmlFor="remember"
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      Remember me
                    </Label>
                  </div>
                  <a
                    href="#"
                    className="text-sm text-teal-600 hover:text-teal-700 font-medium transition"
                  >
                    Forgot password?
                  </a>
                </motion.div> */}
                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-600 text-center"
                  >
                    {error}
                  </motion.p>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-linear-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white rounded-xl py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      <>
                        Sign in
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>

              {/* Alternative Login */}
              {/* <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Or</span>
                  </div>
                </div>
                <button
                  className="mt-4 w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition group"
                  disabled={isLoading}
                >
                  <Fingerprint className="w-5 h-5 text-gray-500 group-hover:text-teal-600 transition" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-teal-600 transition">
                    Use Biometric Authentication
                  </span>
                </button>
              </motion.div> */}

              {/* Demo credentials */}
              {/* <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 p-4 bg-linear-to-r from-gray-50 to-teal-50 rounded-xl border border-gray-100"
              >
                <p className="text-xs text-gray-600 text-center">
                  🔐 Demo credentials:{" "}
                  <span className="font-mono font-semibold">
                    admin@verifyhub.com
                  </span>{" "}
                  / any password
                </p>
              </motion.div> */}
            </div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center mt-8"
          >
            <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                256-bit encrypted
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                NDPR compliant
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                Secure processing
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
