import { NextRequest, NextResponse } from "next/server";
import { callBackend } from "@/lib/server-api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await callBackend({
      method: "POST",
      path: "/admin/aml/screen",
      data: body,
      authType: "admin",
    });
    return NextResponse.json(result);
  } catch (error: any) {
    const status = error.status || error.response?.status || 503;
    const message = error.message || "AML service unavailable";
    return NextResponse.json(
      { success: false, message, service_down: true },
      { status },
    );
  }
}
