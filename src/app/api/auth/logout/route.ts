import { NextResponse } from 'next/server';
import { removeAuthToken, getAuthToken } from '@/lib/cookies';
import { authService } from '@/services/auth.service';

export async function POST() {
  try {
    const token = await getAuthToken();
    if (token) {
      await authService.logout(token);
    }
  } catch {
    // ignore
  }

  await removeAuthToken();
  return NextResponse.json({ success: true, message: 'Logged out' });
}