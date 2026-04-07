import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/services/auth.service';
import { getSessionToken } from '@/lib/cookies';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const sessionToken = await getSessionToken();

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    if (!sessionToken) {
      return NextResponse.json(
        { success: false, message: 'No active session. Please log in again.' },
        { status: 401 }
      );
    }

    const response = await authService.resend2FA(email, sessionToken);
    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Resend 2FA error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to resend code' },
      { status: 500 }
    );
  }
}