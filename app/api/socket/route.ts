import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Socket server is running' });
} 

/// to be removed or replaced with a better solution