import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const applySchema = z.object({
  name: z
    .string()
    .min(1, 'Name must be at least 1 character')
    .max(100, 'Name must not exceed 100 characters'),
  email: z
    .string()
    .email('Invalid email format'),
  phone: z
    .string()
    .regex(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .optional()
    .or(z.literal(''))
    .transform((val) => (val === '' ? undefined : val)),
  jobId: z
    .string()
    .min(1, 'Job ID is required'),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: 'Validation failed',
          code: 'VALIDATION_ERROR',
          fields: { body: 'Invalid or missing JSON payload' },
        },
      },
      { status: 400 }
    );
  }

  // Validate with Zod
  const validation = applySchema.safeParse(body);
  if (!validation.success) {
    const fields: Record<string, string> = {};
    for (const issue of validation.error.issues) {
      const field = issue.path[0]?.toString() || 'form';
      if (!fields[field]) {
        fields[field] = issue.message;
      }
    }
    return NextResponse.json(
      {
        error: {
          message: 'Validation failed',
          code: 'VALIDATION_ERROR',
          fields,
        },
      },
      { status: 400 }
    );
  }

  const { name, email, phone, jobId } = validation.data;

  try {
    // Check if referenced job exists
    const job = await prisma.greenJob.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return NextResponse.json(
        {
          error: {
            message: 'Job not found',
            code: 'NOT_FOUND',
          },
        },
        { status: 404 }
      );
    }

    // Insert into JobApplication table
    const application = await prisma.jobApplication.create({
      data: {
        jobId,
        applicantName: name,
        applicantEmail: email,
        applicantPhone: phone ?? null,
      },
    });

    return NextResponse.json(
      {
        data: {
          id: application.id,
          appliedAt: application.appliedAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating job application:', error);
    return NextResponse.json(
      {
        error: {
          message: 'Internal server error',
          code: 'DB_ERROR',
        },
      },
      { status: 500 }
    );
  }
}
