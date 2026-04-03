import { useMutation, useQuery } from '@tanstack/react-query';
import axiosClient from '@/lib/axios-client';

// Types
interface NinVerificationParams {
  nin?: string;
  phone?: string;
}

interface BvnVerificationParams {
  bvn?: string;
  phone?: string;
}

// NIN Verification
export function useNinVerification() {
  return useMutation({
    mutationFn: async ({ nin, phone }: NinVerificationParams) => {
      const endpoint = phone ? '/verifications/nin-with-phone' : '/verifications/nin';
      const { data } = await axiosClient.post(endpoint, { nin, phone });
      return data;
    },
  });
}

// BVN Verification
export function useBvnVerification() {
  return useMutation({
    mutationFn: async ({ bvn, phone }: BvnVerificationParams) => {
      const endpoint = phone ? '/verifications/bvn-with-phone' : '/verifications/bvn';
      const { data } = await axiosClient.post(endpoint, { bvn, phone });
      return data;
    },
  });
}

// Fetch Logs (with filters)
export function useVerificationLogs(filters: { startDate?: string; endDate?: string; service?: string }) {
  return useQuery({
    queryKey: ['logs', filters],
    queryFn: async () => {
      const { data } = await axiosClient.get('/logs', { params: filters });
      return data;
    },
  });
}

// Single log detail
export function useLogDetail(logId: string) {
  return useQuery({
    queryKey: ['log', logId],
    queryFn: async () => {
      const { data } = await axiosClient.get(`/logs/${logId}`);
      return data;
    },
    enabled: !!logId,
  });
}