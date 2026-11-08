export interface NinVerificationRequest {
  nin: string;
}

export interface NinVerificationResponse {
  success: boolean;
  message?: string;
  service_down?: boolean;
  data?: {
    first_name: string;
    middle_name?: string;
    last_name: string;
    phone_number: string;
    gender: string;
    date_of_birth: string;
    birthcountry: string;
    birthstate: string;
    birthlga: string;
    residence_state: string;
    residence_town: string;
    residence_lga: string;
    residence_address: string;
    photo: string; // base64
  };
}

export interface NinByPhoneRequest {
  phone_number: string;
}

export interface NinByPhoneResponse {
  success: boolean;
  message?: string;
  service_down?: boolean;
  data?: {
    nin: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    phone_number: string;
    date_of_birth: string;
    gender: string;
    photo?: string;
  };
}