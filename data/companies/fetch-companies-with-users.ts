import { prisma } from '@/lib/prisma';
import { Company } from '@prisma/client';


export async function fetchCompanies(): Promise<Company[]> {
  try {
    const companies = await prisma.company.findMany({
      where: {
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
    return companies;
  } catch (error) {
    throw new Error('[FETCH_COMPANIES]>Failed to fetch companies');
  }
}
