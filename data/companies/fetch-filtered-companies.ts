import { unstable_noStore as noStore } from 'next/cache';
import { prisma } from '@/lib/prisma';

const ITEMS_PER_PAGE = 10;
export async function fetchFilteredCompanies(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const companies = await prisma.company.findMany({
      where: { deletedAt: null, OR: [{ name: { contains: query, mode: 'insensitive' } }] },
      orderBy: { createdAt: 'desc' },
      include: {
        users: {
          include: {
            items: true,
          }
        }
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    return companies;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('[FETCH_FILTERED_COMPANIES]>Failed to fetch companies.');
  }
}
