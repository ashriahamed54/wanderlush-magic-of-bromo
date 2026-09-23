import { NextRequest, NextResponse } from 'next/server';
import { apiChangePassword } from '@/lib/authService';

export async function PUT(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    if (!authHeader) {
      return NextResponse.json({ message: 'Authorization header required. Please sign in again.' }, { status: 401 });
    }
    const body = await req.json();
    await apiChangePassword(authHeader, body);
    return NextResponse.json({ message: 'Password changed successfully' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to change password';
    const status = message.toLowerCase().includes('session') || message.toLowerCase().includes('unauthorized') || message.toLowerCase().includes('auth') ? 401 : 400;
    return NextResponse.json({ message }, { status });
  }
}
