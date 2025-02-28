import { unstable_noStore as noStore } from 'next/cache';
import { prisma } from '@/lib/prisma';

const ITEMS_PER_PAGE = 10;
export async function fetchUsersPages(query: string): Promise<number> {
  noStore();
  try {
    const count = await prisma.user.count({
      where: { deletedAt: null, OR: [{ name: { contains: query } }] },
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.log('Database Error', error);
    throw new Error(
      '[FETCH_USERS_PAGES]>Failed to fetch total number of users.'
    );
  }
}
