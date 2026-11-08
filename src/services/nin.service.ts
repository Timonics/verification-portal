import { internalApi } from "@/lib/internal-api-client";
import type {
  NinByPhoneResponse,
  NinVerificationResponse,
} from "@/types/nin.types";

export const ninService = {
  async verifyNIN(nin: string): Promise<NinVerificationResponse> {
    const res = await internalApi.post<NinVerificationResponse>(
      "/api/verifications/nin",
      { nin },
    );
    return res.data;
  },

  async verifyNINByPhone(phoneNumber: string): Promise<NinByPhoneResponse> {
    const res = await internalApi.get<NinByPhoneResponse>(
      `/api/verifications/nin-by-phone?phone_number=${encodeURIComponent(phoneNumber)}`,
    );
    return res.data;
  },
};
