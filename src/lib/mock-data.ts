import { VerificationLog, SummaryStats } from "@/types/verification.types";

export const ApiCalls = [
  {
    id: '1',
    appName: 'Insurance Onboarding App',
    userIdentifier: 'user_12345',
    dateTime: new Date('2026-03-27T15:26:00'),
    service: 'NIN Verification',
    status: 'success',
    reference: 'NIN_REF_001',
    details: {
      nin: '12345678901',
      fullName: 'John Doe',
      dateOfBirth: '1990-05-15'
    }
  },
  {
    id: '2',
    appName: 'Insurance Onboarding App',
    userIdentifier: 'user_12346',
    dateTime: new Date('2026-03-27T15:19:00'),
    service: 'BVN Verification',
    status: 'success',
    reference: 'BVN_REF_002',
    details: {
      bvn: '22345678901',
      fullName: 'Jane Smith',
      dateOfBirth: '1988-03-22',
      gender: 'Female'
    }
  },
  {
    id: '3',
    appName: 'Insurance Onboarding App',
    userIdentifier: 'user_12347',
    dateTime: new Date('2026-03-27T15:19:00'),
    service: 'BVN Verification',
    status: 'failed',
    reference: 'BVN_REF_003',
    details: {
      error: 'Invalid BVN number'
    }
  },
  {
    id: '4',
    appName: 'Fintech Ltd',
    userIdentifier: 'user_12348',
    dateTime: new Date('2026-03-27T14:30:00'),
    service: 'NIN with Phone',
    status: 'success',
    reference: 'NIN_PHONE_004',
    details: {
      nin: '34567890123',
      fullName: 'Michael Adebayo',
      phoneNumber: '08012345678',
      matchStatus: 'matched'
    }
  },
  {
    id: '5',
    appName: 'Banking Corp',
    userIdentifier: 'user_12349',
    dateTime: new Date('2026-03-27T13:45:00'),
    service: 'CAC Verification',
    status: 'success',
    reference: 'CAC_005',
    details: {
      rcNumber: 'RC1234567',
      companyName: 'VerifyHub Technologies',
      status: 'active'
    }
  },
  {
    id: '6',
    appName: 'Fintech Ltd',
    userIdentifier: 'user_12350',
    dateTime: new Date('2026-03-27T12:15:00'),
    service: 'BVN Retrieval with Phone',
    status: 'success',
    reference: 'BVN_RET_006',
    details: {
      phoneNumber: '08098765432',
      fullName: 'Funke Adekunle',
      bvn: '45678901234'
    }
  },
  {
    id: '7',
    appName: 'Insurance Onboarding App',
    userIdentifier: 'user_12351',
    dateTime: new Date('2026-03-27T11:00:00'),
    service: 'NIN Verification',
    status: 'failed',
    reference: 'NIN_007',
    details: {
      error: 'NIN not found in database'
    }
  },
  {
    id: '8',
    appName: 'Banking Corp',
    userIdentifier: 'user_12352',
    dateTime: new Date('2026-03-27T10:30:00'),
    service: 'NIN with Phone',
    status: 'success',
    reference: 'NIN_PHONE_008',
    details: {
      nin: '56789012345',
      fullName: 'Chidi Okonkwo',
      phoneNumber: '09012345678',
      matchStatus: 'matched'
    }
  }
]

export const mockStats: SummaryStats = {
  totalVerificationsToday: 47,
  successRate: 94.5,
  failedVerifications: 3,
  totalSpend: 4250,
};

export const mockRecentActivity = ApiCalls.slice(0, 5);
