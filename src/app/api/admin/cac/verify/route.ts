import { NextRequest, NextResponse } from 'next/server';
import { callBackend } from '@/lib/server-api';

export async function GET(req: NextRequest) {
  try {
    const rc_number = req.nextUrl.searchParams.get('rc_number');
    const company_type = req.nextUrl.searchParams.get('company_type');

    if (!rc_number || !company_type) {
      return NextResponse.json(
        { success: false, message: 'rc_number and company_type are required' },
        { status: 400 }
      );
    }

    // callBackend automatically reads the auth_token cookie and adds Authorization header
    const result = await callBackend({
      method: 'GET',
      path: '/admin/cac/verify',
      params: { rc_number, company_type },
      authType: 'admin', // tells callBackend to require a token
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('[CAC Route] Error:', error);
    const status = error.status || error.response?.status || 503;
    const message = error.message || 'CAC service unavailable';
    return NextResponse.json(
      { success: false, message, errors: error.errors },
      { status }
    );
  }
}