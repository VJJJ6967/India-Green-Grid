import { PrismaClient } from '@prisma/client';

// ---------------------------------------------------------------------------
// Prisma client singleton — prevents connection pool exhaustion in Next.js
// dev mode (which re-runs modules on every hot-reload).
//
// Runtime uses DATABASE_URL (Neon pooled URL) via the datasource block.
// ---------------------------------------------------------------------------

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
