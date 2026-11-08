import { NextRequest, NextResponse } from "next/server";
import { callBackend } from "@/lib/server-api";

export async function GET(req: NextRequest) {
  try {
    const phone_number = req.nextUrl.searchParams.get("phone_number");

    if (!phone_number) {
      return NextResponse.json(
        { success: false, message: "Phone number is required" },
        { status: 400 },
      );
    }

    const result = await callBackend({
      method: "GET",
      path: "/verifications/bvn-with-phone",
      params: { phone_number },
      authType: "admin",
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("[BVN By Phone Route] Error:", error);
    const status = error.status || error.response?.status || 503;
    const message = error.message || "BVN lookup service unavailable";
    return NextResponse.json(
      { success: false, message, errors: error.errors },
      { status },
    );
  }
}
