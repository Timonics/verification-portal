// src/types/aml.types.ts

export type EntityType = 'individual' | 'organization';

export interface AmlIndividualRequest {
  names: string;               // first + last name
  schema: 'individual';
  date_of_birth?: string;
  nationality?: string;
  gender?: 'male' | 'female';
}

export interface AmlOrganizationRequest {
  name: string;
  schema: 'organization';
  registration_number?: string;
  country?: string;
}

export type AmlRequest = AmlIndividualRequest | AmlOrganizationRequest;

export interface AmlResultItem {
  name: string[];
  entity_type: string;
  source_type: 'PEP' | 'SANCTIONS' | 'ADVERSE_MEDIA';
  match: boolean;
  positions: string[];
  country: string[];
  date_of_birth: string[];
  urls: string[];
}

export interface AmlResponse {
  success: boolean;
  message?: string;
  service_down?: boolean;
  data?: {
    id?: number;
    risk_level: 'Low' | 'Medium' | 'High';
    match_status: 'No Match' | 'Potential Match' | 'Confirmed Match';
    total_results: number;
    total_articles?: number;
    results: AmlResultItem[];
    screened_at: string;
  };
}