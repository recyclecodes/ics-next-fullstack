import { prisma } from '@/lib/prisma';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 5;
export async function fetchNotifications() {
  noStore();
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: ITEMS_PER_PAGE,
    });

    return notifications;
  } catch (error) {
    console.log(error);
  }
}
