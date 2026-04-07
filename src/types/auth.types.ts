export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    requires_2fa: boolean;
    session_token?: string;
    user?: {
      id: number;
      email: string;
      name?: string;
    };
  };
}

export interface Verify2FARequest {
  email: string;
  code: string;
  session_token: string;
}

export interface Verify2FAResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      two_factor_enabled: boolean;
    };
    token: string;
  };
}

export interface Resend2FARequest {
  email: string;
  session_token: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  two_factor_enabled: boolean;
}