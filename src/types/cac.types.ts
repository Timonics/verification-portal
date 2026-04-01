export interface CacResponse {
  rcNumber: string;
  companyName: string;
  registrationDate: Date;
  status: "active" | "inactive";
  businessType: string;
  address: string;
  directors: Array<{
    name: string;
    position: string;
  }>;
}
