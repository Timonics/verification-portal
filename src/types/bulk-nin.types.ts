export interface BulkRetrievalRow {
  id: string;
  rowNumber: number;
  lastName: string;
  firstName: string;
  middleName?: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  nin?: string;          // filled only if match
  matchStatus: 'pending' | 'processing' | 'matched' | 'no_match' | 'not_found';
  matchedDetails?: {     // returned from API (even if no match)
    firstName: string;
    lastName: string;
    middleName?: string;
    dateOfBirth: string;
    gender: string;
    phone: string;
    photo?: string;
    nin: string;
  };
  processedAt?: Date;
}