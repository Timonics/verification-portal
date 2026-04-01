import { VerificationLog, SummaryStats } from "";

export const mockLogs: VerificationLog[] = [
  {
    id: "1",
    appName: "Insurance Onboarding App",
    userIdentifier: "user_12345",
    dateTime: new Date("2026-03-27T15:26:00"),
    service: "NIN Verification",
    cost: 80,
    status: "success",
    reference: "NIN_REF_001",
    details: {
      nin: "12345678901",
      fullName: "John Doe",
    },
  },
  {
    id: "2",
    appName: "Insurance Onboarding App",
    userIdentifier: "user_12346",
    dateTime: new Date("2026-03-27T15:19:00"),
    service: "BVN Verification",
    cost: 50,
    status: "success",
    reference: "BVN_REF_002",
    details: {
      bvn: "22345678901",
      fullName: "Jane Smith",
    },
  },
  {
    id: "3",
    appName: "Insurance Onboarding App",
    userIdentifier: "user_12347",
    dateTime: new Date("2026-03-27T15:19:00"),
    service: "BVN Verification",
    cost: 30,
    status: "failed",
    reference: "BVN_REF_003",
    details: {
      error: "Invalid BVN number",
    },
  },
];

export const mockStats: SummaryStats = {
  totalVerificationsToday: 47,
  successRate: 94.5,
  failedVerifications: 3,
  totalSpend: 4250,
};

export const mockRecentActivity = mockLogs.slice(0, 5);
