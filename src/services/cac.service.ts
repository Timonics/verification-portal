import { internalApi } from '@/lib/internal-api-client';
import { CacVerificationRequest } from '@/types/cac.types';

export const cacService = {
  async verifyCompany(data: CacVerificationRequest) {
    const res = await internalApi.get(`/api/admin/cac/verify?rc_number=${data.rc_number}&company_type=${data.company_type}`);
    return res.data;
  }
};