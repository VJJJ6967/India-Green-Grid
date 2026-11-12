import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [fuelCapacity, metricSummary, historical, regional, gapInsights] = await Promise.all([
      prisma.fuelCapacity.findMany({
        orderBy: { sortOrder: 'asc' },
      }),
      prisma.metricSummary.findMany({
        orderBy: { sortOrder: 'asc' },
      }),
      prisma.historicalDataPoint.findMany({
        orderBy: { year: 'asc' },
      }),
      prisma.regionalRenewable.findMany({
        orderBy: { sortOrder: 'asc' },
      }),
      prisma.gapInsight.findMany({
        orderBy: { sortOrder: 'asc' },
      }),
    ]);

    return NextResponse.json({
      data: {
        fuelCapacity,
        metricSummary,
        historical,
        regional,
        gapInsights,
      },
    });
  } catch (error) {
    console.error('Error fetching energy data:', error);
    return NextResponse.json(
      { error: { message: 'Internal server error', code: 'DB_ERROR' } },
      { status: 500 }
    );
  }
}
