import { internalApi } from '@/lib/internal-api-client';
import type { BvnVerificationResponse } from '@/types/bvn.types';

export const bvnService = {
  async verifyBVN(bvn: string): Promise<BvnVerificationResponse> {
    const res = await internalApi.post<BvnVerificationResponse>(
      '/api/verifications/bvn',
      { bvn },
    );
    return res.data;
  },
};
