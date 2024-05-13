import { unstable_noStore as noStore } from 'next/cache';
import { prisma } from '@/lib/prisma';

const ITEMS_PER_PAGE = 10;
export async function fetchFilteredUsers(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const users = await prisma.user.findMany({
      where: {
        deletedAt: null,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { company: { name: { contains: query, mode: 'insensitive' } } },
          
        ],
      },
      orderBy: { createdAt: 'desc' },
      include: {
        company: true,
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    return users;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('[FETCH_FILTERED_USERS]>Failed to fetch users.');
  }
}


export async function fetchFilteredAdminUsers(query: string, currentPage: number, currentUserCompanyId: string) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const users = await prisma.user.findMany({
      where: {
        deletedAt: null,
        companyId: currentUserCompanyId, // Filter by companyId of the currently logged-in user
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { company: { name: { contains: query, mode: 'insensitive' } } },
        ],
      },
      orderBy: { createdAt: 'desc' },
      include: {
        company: true,
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    return users;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('[FETCH_FILTERED_USERS]>Failed to fetch users.');
  }
}

