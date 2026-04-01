export interface BvnResponse {
  bvn: string;
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
  gender: string;
  photo?: string;
  reference: string;
  verifiedAt: Date;
}