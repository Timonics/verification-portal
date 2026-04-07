import { NextResponse } from 'next/server';
import { getAuthToken } from '@/lib/cookies';
import { apiClient } from '@/lib/api-client';

export async function GET() {
  const token = await getAuthToken();
  if (!token) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const response = await apiClient('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Unauthorized' },
      { status: 401 }
    );
  }
}