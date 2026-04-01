export interface VerificationLog {
  id: string;
  appName: string;
  userIdentifier?: string;
  dateTime: Date;
  service:
    | "NIN Verification"
    | "NIN with Phone"
    | "BVN Verification"
    | "BVN Retrieval with Phone"
    | "CAC Verification";
  cost: number;
  status: "success" | "failed";
  reference: string;
  details?: Record<string, any>;
}

export interface SummaryStats {
  totalVerificationsToday: number;
  successRate: number;
  failedVerifications: number;
  totalSpend: number;
}
