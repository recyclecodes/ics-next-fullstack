import { unstable_noStore as noStore } from 'next/cache';
import { prisma } from '@/lib/prisma';

const ITEMS_PER_PAGE = 5;
export async function fetchItemsPages(query: string): Promise<number> {
  noStore();
  try {
    const count = await prisma.item.count({
      where: { deletedAt: null, OR: [{ name: { contains: query } }] },
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.log('Database Error', error);
    throw new Error(
      '[FETCH_ITEMS_PAGES]>Failed to fetch total number of items.'
    );
  }
}
