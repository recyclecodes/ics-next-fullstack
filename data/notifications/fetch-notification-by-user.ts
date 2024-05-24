import { prisma } from '@/lib/prisma';

export const getNotificationsForUser = async (userId: string) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return notifications;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};
