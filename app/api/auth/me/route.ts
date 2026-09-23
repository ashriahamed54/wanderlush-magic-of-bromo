import { NextRequest, NextResponse } from 'next/server';
import { apiGetProfile } from '@/lib/authService';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    if (!authHeader) {
      return NextResponse.json({ message: 'Authorization header required' }, { status: 401 });
    }
    const profile = await apiGetProfile(authHeader);
    return NextResponse.json(profile);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unauthorized';
    return NextResponse.json({ message }, { status: 401 });
  }
}
