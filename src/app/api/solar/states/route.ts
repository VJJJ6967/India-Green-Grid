import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const states = await prisma.stateSolarData.findMany();

    return NextResponse.json({
      data: {
        states,
      },
    });
  } catch (error) {
    console.error('Error fetching solar states data:', error);
    return NextResponse.json(
      { error: { message: 'Internal server error', code: 'DB_ERROR' } },
      { status: 500 }
    );
  }
}
