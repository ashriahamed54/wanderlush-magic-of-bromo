import { NextRequest, NextResponse } from 'next/server';
import { apiRegister } from '@/lib/authService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await apiRegister(body);
    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Registration failed';
    return NextResponse.json({ message }, { status: 400 });
  }
}
