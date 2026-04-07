'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertTriangle } from 'lucide-react';
import { useAmlScreening } from '@/hooks/useAmlScreening';
import { AmlForm } from '@/components/screening/aml-form';
import { AmlResultCard } from '@/components/screening/aml-result-card';
import { SecurityBadges } from '@/components/verifications/security-badges';

export default function AMLScreeningPage() {
  const { mutate, isPending, data, error } = useAmlScreening();
  const [searcher] = useState('Admin User'); // TODO: fetch from auth context
  
  const handleScreen = (request: any) => {
    mutate(request);
  };
  
  const handleReset = () => {};
  
  const result = data?.success && data?.data
    ? {
        success: true,
        data: data.data,
        searcher,
      }
    : null;
  
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2"><div className="p-2 bg-purple-100 rounded-lg"><Shield className="w-6 h-6 text-purple-600" /></div><h1 className="text-2xl font-bold text-gray-900">AML / PEP Screening</h1></div>
        <p className="text-gray-600">Screen individuals and organizations against global PEP, sanctions, and adverse media lists.</p>
      </motion.div>
      
      <SecurityBadges />
      
      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <AmlForm onSubmit={handleScreen} isLoading={isPending} onReset={handleReset} error={error?.message} />
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <AnimatePresence mode="wait">
            {result ? <AmlResultCard result={result} /> : (
              <div className="bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-100 p-8 text-center">
                <div className="flex flex-col items-center"><AlertTriangle className="w-16 h-16 text-gray-300 mb-4" /><h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Screen</h3><p className="text-sm text-gray-500">Enter entity details to run AML/PEP screening</p></div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}