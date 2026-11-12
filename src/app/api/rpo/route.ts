import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [trajectory, discomBenchmarks] = await Promise.all([
      prisma.rPOTrajectoryYear.findMany({
        orderBy: { year: 'asc' },
      }),
      prisma.discomBenchmark.findMany(),
    ]);

    return NextResponse.json({
      data: {
        trajectory,
        discomBenchmarks,
        recFloorPrice: 1000,
        recForbearancePrice: 2500,
      },
    });
  } catch (error) {
    console.error('Error fetching RPO data:', error);
    return NextResponse.json(
      { error: { message: 'Internal server error', code: 'DB_ERROR' } },
      { status: 500 }
    );
  }
}
