import type { AxiosRequestConfig } from 'axios';
import { api } from './axios-client';

export async function apiClient<T>(
  endpoint: string,
  options: AxiosRequestConfig = {}
): Promise<T> {
  const response = await api.request<T>({
    url: endpoint,
    ...options,
  });
  return response.data;
}