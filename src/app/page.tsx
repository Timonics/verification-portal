"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import {
  Shield,
  Zap,
  Lock,
  ArrowRight,
  CheckCircle,
  Building2,
  Users,
  BarChart3,
  CreditCard,
  Globe,
  Headphones,
  Sparkles,
  Star,
  Rocket,
  Database,
  Cloud,
  Fingerprint,
  Award,
  TrendingUp,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { features, services } from "@/lib/data";

export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-br from-teal-50 via-white to-blue-50"></div>
        <div className="absolute top-0 -left-4 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="relative">
                <Shield className="w-8 h-8 text-teal-600" />
                <Sparkles className="w-3 h-3 text-yellow-500 absolute -top-1 -right-1" />
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
                VerifyHub
              </span>
            </motion.div>
            <div className="hidden md:flex items-center space-x-8">
              {["Get Started"].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-gray-600 hover:text-teal-600 transition font-medium relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full"></span>
                </motion.a>
              ))}
              {/* <Link href="/login">
                <Button
                  variant="outline"
                  className="border-teal-600 text-teal-600 hover:bg-teal-50 rounded-full"
                >
                  Sign In
                </Button>
              </Link> */}
              <Link href="/login">
                <Button className="bg-linear-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all">
                  Sign in
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-teal-50 text-teal-700 text-sm font-medium mb-6"
              >
                <Zap className="w-4 h-4 mr-2" />
                Trusted by Nigerian Businesses
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                Fast, Secure{" "}
                <span className="bg-linear-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
                  Identity
                </span>
                <br />
                Verification
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                Verify NIN, BVN, and CAC instantly. Stay compliant with PEP and
                AML screening. Built for Nigerian businesses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="bg-linear-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white px-8 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all"
                  >
                    Get Started
                    <Rocket className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                {/* <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-300 rounded-full text-lg hover:border-teal-600 hover:text-teal-600 transition-all"
                >
                  Watch Demo
                </Button> */}
              </div>
              <div className="flex flex-wrap items-center gap-6 mt-8">
                {[
                  // { icon: CheckCircle, text: "No credit card required" },
                  { icon: Lock, text: "NDPR compliant" },
                  { icon: Shield, text: "256-bit encryption" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <item.icon className="w-5 h-5 text-teal-600" />
                    <span className="text-sm text-gray-600">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative rounded-3xl bg-linear-to-br from-gray-900 to-gray-800 p-2 shadow-2xl">
                <div className="rounded-2xl p-6 overflow-hidden">
                  <div className="space-y-4">
                    {[
                      {
                        icon: Shield,
                        title: "NIN Verification",
                        price: "",
                        color: "teal",
                        delay: 0,
                      },
                      {
                        icon: Building2,
                        title: "CAC Business Search",
                        price: "",
                        color: "blue",
                        delay: 0.1,
                      },
                      {
                        icon: Zap,
                        title: "PEP & AML Screening",
                        price: "",
                        color: "purple",
                        delay: 0.2,
                      },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + item.delay }}
                        className={`flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-105 cursor-pointer ${
                          i === 2
                            ? "bg-linear-to-r from-purple-100 to-purple-200 border border-purple-300"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            i === 2 ? "bg-purple-600" : `bg-${item.color}-100`
                          }`}
                        >
                          <item.icon
                            className={`w-6 h-6 ${i === 2 ? "text-white" : `text-${item.color}-600`}`}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">
                            {item.title}
                          </p>
                          <p
                            className={`text-sm ${i === 2 ? "text-purple-600" : "text-gray-500"}`}
                          >
                            {item.price}
                          </p>
                        </div>
                        {i !== 2 && (
                          <ArrowRight className="w-5 h-5 text-gray-400" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 bg-white rounded-full px-4 py-2 shadow-xl flex items-center gap-2"
              >
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-bold">99.9% Uptime</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      {/* <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="py-12 border-t border-b border-gray-100"
      >
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-500 text-sm mb-8">
            Trusted by leading Nigerian companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {[
              "Insurance Co.",
              "Banking Corp",
              "Fintech Ltd",
              "Microfinance Bank",
              "Payment Gateway",
            ].map((company, i) => (
              <motion.h2
                key={company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-gray-400 font-semibold text-lg hover:text-teal-600 transition cursor-pointer"
              >
                {company}
              </motion.h2>
            ))}
          </div>
        </div>
      </motion.section> */}

      {/* Stats Section */}
      {/* <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                value: "1.2M+",
                label: "Verifications Processed",
                trend: "+45%",
              },
              {
                icon: Shield,
                value: "99.9%",
                label: "Success Rate",
                trend: "+2.3%",
              },
              {
                icon: Zap,
                value: "1.2s",
                label: "Avg Response Time",
                trend: "-0.3s",
              },
              {
                icon: Award,
                value: "500+",
                label: "Happy Clients",
                trend: "+120",
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-linear-to-br from-teal-100 to-teal-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-teal-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
                <div className="text-xs text-teal-600 font-medium">
                  {stat.trend}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Services Section */}
      <section
        id="services"
        className="py-20 bg-linear-to-b from-gray-50 to-white"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-50 text-teal-600 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Our Services
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Complete Verification Suite
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for identity and compliance verification in
              one platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-teal-600 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-linear-to-br from-teal-100 to-teal-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      {/* <span className="text-lg font-bold text-teal-600">
                        {service.price}
                      </span> */}
                      <Link
                        href="/login"
                        className="text-sm text-gray-400 group-hover:text-teal-600 transition flex items-center gap-1"
                      >
                        Learn more
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-50 text-teal-600 text-sm font-medium mb-4">
                  <Star className="w-4 h-4 mr-2" />
                  Why Choose Us
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Built for Scale, Security, and Speed
                </h2>
                <p className="text-xl text-gray-600">
                  Enterprise-grade features that protect your business and
                  delight your customers
                </p>
              </div>

              <div className="space-y-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 group cursor-pointer"
                    >
                      <div className="shrink-0 w-12 h-12 bg-linear-to-br from-teal-100 to-teal-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">
                      Real-time Analytics
                    </span>
                    <BarChart3 className="w-5 h-5 text-teal-400" />
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "Success Rate", value: 98.5, color: "teal" },
                      { label: "Response Time", value: 95, color: "blue" },
                      {
                        label: "Customer Satisfaction",
                        value: 97,
                        color: "purple",
                      },
                    ].map((metric) => (
                      <div key={metric.label}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-300">{metric.label}</span>
                          <span className="text-white font-semibold">
                            {metric.value}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${metric.value}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={`h-full bg-${metric.color}-500 rounded-full`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* <div className="pt-4 border-t border-gray-700">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Total Verifications</span>
                      <span className="text-white font-bold text-2xl">
                        1.2M+
                      </span>
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-teal-500 rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-teal-600 to-teal-700"></div>
        <div className="absolute inset-0 pattern-bg"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to streamline your verifications?
            </h2>
            <p className="text-teal-100 text-xl mb-8 max-w-2xl mx-auto">
              Join hundreds of Nigerian businesses already using VerifyHub for
              identity and compliance verification
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-white text-teal-600 hover:bg-gray-100 px-8 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-black bg-teal-400 hover:bg-teal-500 rounded-full text-lg"
                >
                  Contact
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-6 h-6 text-teal-500" />
                <span className="text-white font-bold text-xl">VerifyHub</span>
              </div>
              <p className="text-sm leading-relaxed">
                Fast, secure identity verification for Nigerian businesses.
              </p>
              {/* <div className="flex gap-4 mt-6">
                {[Mail, Phone, Globe].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition cursor-pointer"
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                ))}
              </div> */}
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white transition">
                    NIN Verification
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    BVN Verification
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    CAC Search
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    PEP Screening
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="contact" className="hover:text-white transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Security</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  256-bit Encryption
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  NDPR Compliant
                </li>
                <li className="flex items-center gap-2">
                  <Headphones className="w-4 h-4" />
                  24/7 Support
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 VerifyHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
