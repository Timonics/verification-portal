export interface CacVerificationRequest {
  rc_number: string;
  company_type: string;
}

export interface CacVerificationResponse {
  success: boolean;
  message?: string;
  data?: {
    company_name: string;
    type_of_company: string;
    rc_number: string;
    business_number?: string | null;
    status: string;
    email: string;
    address: string;
    state: string;
    city: string;
    lga: string;
  };
  service_down?: boolean;
}