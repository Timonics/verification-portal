import { NextRequest, NextResponse } from "next/server";
import { callBackend } from "@/lib/server-api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body?.nin) {
      return NextResponse.json(
        { success: false, message: "NIN is required" },
        { status: 400 },
      );
    }

    const result = await callBackend({
      method: "POST",
      path: "/verifications/nin",
      data: { nin: body.nin },
      authType: "admin",
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("[NIN Route] Error:", error);
    const status = error.status || error.response?.status || 503;
    const message = error.message || "NIN verification service unavailable";
    return NextResponse.json(
      { success: false, message, errors: error.errors },
      { status },
    );
  }
}
