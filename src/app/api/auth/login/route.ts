import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/services/auth.service";
import { setAuthToken, setSessionToken } from "@/lib/cookies";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 },
      );
    }

    const response = await authService.login(email, password);

    if (!response.success) {
      return NextResponse.json(
        { success: false, message: response.message },
        { status: 401 },
      );
    }

    const responseData = response.data;

    if (responseData.requires_2fa && responseData.session_token) {
      await setSessionToken(responseData.session_token);
      // Store email temporarily for OTP page (use cookie or return to client)
      return NextResponse.json({
        success: true,
        requires_2fa: true,
        session_token: responseData.session_token,
        user: responseData.user,
        message: response.message || "Verification code sent to your email.",
      });
    }

    // Backend may return an auth token directly (no 2FA step)
    const token = responseData.token ?? responseData.access_token;
    if (token) {
      await setAuthToken(token);
    }

    return NextResponse.json({
      success: true,
      requires_2fa: false,
      user: responseData.user,
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
