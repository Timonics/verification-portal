export interface BulkNinRecord {
  row: number;
  nin: string;
  status: 'pending' | 'processing' | 'success' | 'failed';
  data?: {
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    date_of_birth?: string;
    phone_number?: string;
    gender?: string;
  };
  error?: string;
}

export interface BulkNinProgress {
  total: number;
  processed: number;
  succeeded: number;
  failed: number;
  currentBatch: number;
}