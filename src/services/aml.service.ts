import { internalApi } from '@/lib/internal-api-client';
import type { AmlRequest, AmlResponse } from '@/types/aml.types';

export const amlService = {
  async screen(request: AmlRequest): Promise<AmlResponse> {
    const response = await internalApi.post<AmlResponse>('/api/admin/aml/screen', request);
    return response.data;
  },
};