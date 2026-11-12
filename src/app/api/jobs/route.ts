import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { JobSector, ExperienceLevel, Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sectorParam = searchParams.get('sector');
    const experienceParam = searchParams.get('experience');
    const searchParam = searchParams.get('search');

    const where: Prisma.GreenJobWhereInput = {};

    // Filter by sector (?sector=SOLAR_PV or "Solar PV")
    if (sectorParam && sectorParam !== 'All') {
      const normalizedSector = sectorParam.toUpperCase().replace(/[\s&-]+/g, '_').replace(/_+/g, '_');
      if (Object.values(JobSector).includes(sectorParam as JobSector)) {
        where.sector = sectorParam as JobSector;
      } else if (Object.values(JobSector).includes(normalizedSector as JobSector)) {
        where.sector = normalizedSector as JobSector;
      }
    }

    // Filter by experience (?experience=ENTRY or "Entry")
    if (experienceParam && experienceParam !== 'All') {
      const normalizedExp = experienceParam.toUpperCase().split(/[\s(]/)[0];
      if (Object.values(ExperienceLevel).includes(experienceParam as ExperienceLevel)) {
        where.experience = experienceParam as ExperienceLevel;
      } else if (Object.values(ExperienceLevel).includes(normalizedExp as ExperienceLevel)) {
        where.experience = normalizedExp as ExperienceLevel;
      }
    }

    // Case-insensitive search on title or company
    if (searchParam && searchParam.trim()) {
      const query = searchParam.trim();
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { company: { contains: query, mode: 'insensitive' } },
      ];
    }

    const jobs = await prisma.greenJob.findMany({
      where,
      orderBy: [
        { featured: 'desc' },
        { postedDate: 'desc' },
      ],
    });

    return NextResponse.json({ data: jobs });
  } catch (error) {
    console.error('Error fetching green jobs:', error);
    return NextResponse.json(
      { error: { message: 'Failed to fetch jobs', code: 'DB_ERROR' } },
      { status: 500 }
    );
  }
}
