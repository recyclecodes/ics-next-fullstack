import { unstable_noStore as noStore } from 'next/cache';
import { prisma } from '@/lib/prisma';

const ITEMS_PER_PAGE = 5;

export async function fetchFilteredItems(
  query: string,
  currentPage: number,
  userId: string
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const items = await prisma.item.findMany({
      where: {
        userId,
        deletedAt: null,
        OR: [{ name: { contains: query, mode: 'insensitive' } }],
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

export async function superadminFetchFilteredItems(
  query: string,
  currentPage: number
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const items = await prisma.item.findMany({
      where: {
        deletedAt: null,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { brand: { contains: query, mode: 'insensitive' } },
          {
            user: {
              company: { name: { contains: query, mode: 'insensitive' } },
            },
          },
        ],
      },
      include: {
        user: {
          include: {
            company: true,
          },
        },
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

export async function adminFetchFilteredItems(
  query: string,
  currentPage: number,
  currentUserCompanyId: string
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const items = await prisma.item.findMany({
      where: {
        deletedAt: null,
        user: {
          companyId: currentUserCompanyId, 
        },
        OR: [{ name: { contains: query, mode: 'insensitive' } }],
      },
      include: {
        user: {
          include: {
            company: true,
          },
        },
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
