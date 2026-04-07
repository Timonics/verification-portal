// src/app/(dashboard)/verifications/cac/page.tsx
'use client';

import { useCacVerification } from '@/hooks/useCacVerification';
import { CacSearchForm } from '@/components/verifications/cac-search-form';
import { CacResultCard } from '@/components/verifications/cac-result-card';
import { SecurityBadges } from '@/components/verifications/security-badges';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Shield } from 'lucide-react';
import { useState } from 'react';

export default function CACVerificationPage() {
  const { mutate, isPending, data, error } = useCacVerification();
  const [submittedRc, setSubmittedRc] = useState('');

  const handleSearch = (rcNumber: string, companyType: string) => {
    setSubmittedRc(rcNumber);
    mutate({ rc_number: rcNumber, company_type: companyType });
  };

  const handleReset = () => {};

  const verificationResult = data?.success && data?.data
    ? {
        success: true,
        data: {
          company_name: data.data.company_name,
          type_of_company: data.data.type_of_company,
          rc_number: data.data.rc_number,
          business_number: data.data.business_number,
          status: data.data.status,
          email: data.data.email,
          address: data.data.address,
          state: data.data.state,
          city: data.data.city,
          lga: data.data.lga,
          reference: `CAC_${Date.now()}`,
          searchedAt: new Date(),
        },
      }
    : null;

  const isLoading = isPending;

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2"><div className="p-2 bg-purple-100 rounded-lg"><Building2 className="w-6 h-6 text-purple-600" /></div><h1 className="text-2xl font-bold text-gray-900">CAC Business Search</h1></div>
        <p className="text-gray-600">Search and verify Nigerian businesses from the Corporate Affairs Commission database.</p>
      </motion.div>

      <SecurityBadges />

      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <CacSearchForm onSubmit={handleSearch} isLoading={isLoading} onReset={handleReset} error={error?.message} />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <AnimatePresence mode="wait">
            {verificationResult ? (
              <CacResultCard result={verificationResult} />
            ) : (
              <div className="bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-100 p-8 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4"><Building2 className="w-10 h-10 text-gray-400" /></div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Search</h3>
                  <p className="text-sm text-gray-500">Enter an RC number to search for a company</p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}