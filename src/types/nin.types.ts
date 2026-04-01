export interface NinResponse {
  nin: string;
  fullName: string;
  dateOfBirth: string;
  phoneNumber?: string;
  photo?: string;
  status: 'valid' | 'invalid';
  reference: string;
  verifiedAt: Date;
}
