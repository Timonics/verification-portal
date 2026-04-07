import { cookies } from 'next/headers';
import axios, { AxiosRequestConfig, Method } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://empdata.josbiz.com/api';

export interface BackendCallOptions {
  method: Method;
  path: string;
  data?: any;
  params?: Record<string, any>;
  authType?: 'admin' | 'none';  // 'none' = public endpoint
}

export async function callBackend<T = any>(options: BackendCallOptions): Promise<T> {
  const { method, path, data, params, authType = 'none' } = options;

  // Read auth token from cookies if authentication is required
  let token: string | undefined;
  if (authType !== 'none') {
    const cookieStore = await cookies();
    token = cookieStore.get('auth_token')?.value;
    if (!token) {
      throw new Error(`No auth token found for ${authType} request`);
    }
  }

  const url = `${API_BASE_URL}${path}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config: AxiosRequestConfig = {
    method,
    url,
    headers,
    params,
    data,
    timeout: 30000,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    // Preserve backend error response shape
    if (error.response?.data) {
      throw error.response.data;
    }
    throw {
      success: false,
      message: error.message || 'Network error',
    };
  }
}