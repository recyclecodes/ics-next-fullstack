import { unstable_noStore as noStore } from 'next/cache';
import { prisma } from '@/lib/prisma';

const ITEMS_PER_PAGE = 10;

export async function fetchFilteredItems(query: string, currentPage: number, userId: string) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const items = await prisma.item.findMany({
      where: { 
        userId, 
        deletedAt: null, 
        OR: [{ name: { contains: query } }] 
      },
      orderBy: { createdAt: 'desc' },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    return items;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('[FETCH_FILTERED_ITEMS]>Failed to fetch items.');
  }
}
