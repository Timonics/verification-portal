import { NextResponse } from "next/server";
import { api } from "@/lib/axios-client";

export async function GET() {
  try {
    const response = await api.get("/public/nin/public-key");
    return NextResponse.json(response.data);
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || "Failed to fetch public key";
    return NextResponse.json({ success: false, message }, { status });
  }
}