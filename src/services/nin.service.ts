import { apiClient } from "@/lib/api-client";
import type {
  NinByPhoneResponse,
  NinVerificationResponse,
  PublicKeyResponse,
} from "@/types/nin.types";

export const ninService = {
  async getPublicKey(): Promise<PublicKeyResponse> {
    return apiClient<PublicKeyResponse>("/public/nin/public-key", {
      method: "GET",
    });
  },

  async verifyNIN(encryptedNin: string): Promise<NinVerificationResponse> {
    return apiClient<NinVerificationResponse>("/public/nin/verify", {
      method: "POST",
      data: { encrypted_nin: encryptedNin },
    });
  },

  async verifyNINByPhone(phoneNumber: string): Promise<NinByPhoneResponse> {
    return apiClient<NinByPhoneResponse>(
      `/public/nin/verify-by-phone?phone_number=${encodeURIComponent(phoneNumber)}`,
      {
        method: "GET",
      },
    );
  },
};
