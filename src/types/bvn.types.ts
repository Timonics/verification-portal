export interface BvnVerificationRequest {
  encrypted_bvn: string;
}

export interface BvnVerificationResponse {
  success: boolean;
  message?: string;
  service_down?: boolean;
  data?: {
    bvn: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    gender: string;
    date_of_birth: string;
    phone_number1: string;
    phone_number2?: string | null;
    image?: string;
  };
}