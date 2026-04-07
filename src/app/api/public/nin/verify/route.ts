import { api } from "@/lib/axios-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await api.post("/public/nin/verify", body);
    return NextResponse.json(response.data);
  } catch (error: any) {
    const status = error.response?.status || 503;
    const data = error.response?.data || { success: false, message: "Verification service unavailable" };
    return NextResponse.json(data, { status });
  }
}