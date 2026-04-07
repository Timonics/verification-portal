import { apiClient } from '@/lib/api-client';
import type { BvnVerificationRequest, BvnVerificationResponse } from '@/types/bvn.types';

export const bvnService = {
  async verifyBVN(data: BvnVerificationRequest): Promise<BvnVerificationResponse> {
   return await apiClient<BvnVerificationResponse>('/public/bvn/verify', {
    method: 'POST',
    data,
   });
  },
};