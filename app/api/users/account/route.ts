import { NextRequest, NextResponse } from 'next/server';
import { apiDeleteAccount } from '@/lib/authService';

export async function DELETE(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    if (!authHeader) {
      return NextResponse.json({ message: 'Authorization header required' }, { status: 401 });
    }
    await apiDeleteAccount(authHeader);
    return NextResponse.json({ message: 'Account deleted successfully' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to delete account';
    return NextResponse.json({ message }, { status: 400 });
  }
}
