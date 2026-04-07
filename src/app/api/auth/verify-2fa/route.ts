import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/services/auth.service';
import { getSessionToken, removeSessionToken, setAuthToken } from '@/lib/cookies';

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json();
    const sessionToken = await getSessionToken();

    if (!email || !code) {
      return NextResponse.json(
        { success: false, message: 'Email and verification code are required' },
        { status: 400 }
      );
    }

    if (!sessionToken) {
      return NextResponse.json(
        { success: false, message: 'No active session. Please log in again.' },
        { status: 401 }
      );
    }

    const response = await authService.verify2FA(email, code, sessionToken);

    if (!response.success) {
      return NextResponse.json(
        { success: false, message: response.message },
        { status: 401 }
      );
    }

    await setAuthToken(response.data.token);
    await removeSessionToken();

    return NextResponse.json({
      success: true,
      user: response.data.user,
    });
  } catch (error: any) {
    console.error('2FA verification error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Verification failed' },
      { status: 500 }
    );
  }
}