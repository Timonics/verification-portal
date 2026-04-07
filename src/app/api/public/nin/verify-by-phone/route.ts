import { api } from "@/lib/axios-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const phone_number = req.nextUrl.searchParams.get("phone_number");
    if (!phone_number) {
      return NextResponse.json(
        { success: false, message: "Phone number is required" },
        { status: 400 },
      );
    }
    const response = await api.get("/public/nin/verify-by-phone", {
      params: { phone_number },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    const status = error.response?.status || 503;
    const data = error.response?.data || {
      success: false,
      message: "Service unavailable",
    };
    return NextResponse.json(data, { status });
  }
}
