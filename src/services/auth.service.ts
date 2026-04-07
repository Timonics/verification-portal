import { apiClient } from "@/lib/api-client";
import type {
  LoginRequest,
  LoginResponse,
  Verify2FARequest,
  Verify2FAResponse,
  Resend2FARequest,
} from "@/types/auth.types";

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    return apiClient<LoginResponse>("/auth/login", {
      method: "POST",
      data: { email, password } as LoginRequest,
    });
  },

  async verify2FA(
    email: string,
    code: string,
    sessionToken: string,
  ): Promise<Verify2FAResponse> {
    return apiClient<Verify2FAResponse>("/auth/verify-2fa", {
      method: "POST",
      data: { email, code, session_token: sessionToken } as Verify2FARequest,
    });
  },

  async resend2FA(
    email: string,
    sessionToken: string,
  ): Promise<{ success: boolean; message: string }> {
    return apiClient<{ success: boolean; message: string }>(
      "/auth/resend-2fa-code",
      {
        method: "POST",
        data: { email, session_token: sessionToken } as Resend2FARequest,
      },
    );
  },

  async logout(token: string): Promise<void> {
    try {
      await apiClient("/auth/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      // Ignore backend errors
    }
  },
};
