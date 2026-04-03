import { NextRequest, NextResponse } from 'next/server';
import { serverAxios } from '@/lib/api-client';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(req, await params, 'GET');
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(req, await params, 'POST');
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(req, await params, 'PUT');
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(req, await params, 'DELETE');
}

async function proxyRequest(
  req: NextRequest,
  params: { path: string[] },
  method: string
) {
  try {
    const { path: pathSegments } = params;
    const url = pathSegments.join('/');
    const body = method !== 'GET' ? await req.json().catch(() => ({})) : undefined;
    
    const authHeader = req.headers.get('authorization');
    
    const response = await serverAxios.request({
      method,
      url,
      data: body,
      headers: {
        Authorization: authHeader || '',
      },
      params: Object.fromEntries(req.nextUrl.searchParams),
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error('Proxy error:', error.message);
    return NextResponse.json(
      { error: error.response?.data?.message || 'Internal Server Error' },
      { status: error.response?.status || 500 }
    );
  }
}