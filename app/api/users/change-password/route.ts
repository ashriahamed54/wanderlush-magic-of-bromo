import { NextRequest, NextResponse } from 'next/server';
import { apiChangePassword } from '@/lib/authService';

export async function PUT(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    if (!authHeader) {
      return NextResponse.json({ message: 'Authorization header required' }, { status: 401 });
    }
    const body = await req.json();
    await apiChangePassword(authHeader, body);
    return NextResponse.json({ message: 'Password changed successfully' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to change password';
    return NextResponse.json({ message }, { status: 400 });
  }
}
