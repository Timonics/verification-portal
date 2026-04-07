export type ActivityAction =
  | 'LOGIN'
  | 'LOGOUT'
  | 'NIN_VERIFICATION'
  | 'NIN_PHONE_VERIFICATION'
  | 'BVN_VERIFICATION'
  | 'BVN_RETRIEVAL'
  | 'CAC_SEARCH'
  | 'AML_SCREENING'
  | 'PEP_SCREENING';

export type ActivityStatus = 'SUCCESS' | 'FAILED';

export interface ActivityLog {
  id: string;
  timestamp: Date;
  action: ActivityAction;
  status: ActivityStatus;
  details?: Record<string, any>;
  userEmail?: string;
  ipAddress?: string;
}