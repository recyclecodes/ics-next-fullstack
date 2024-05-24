import { prisma } from '@/lib/prisma';

export const countNotifications = async (userId: string) => {
  try {
    const notificationCount = await prisma.notification.count({
      where: {
        OR: [
          { userId }, 
          { userId: { startsWith: 'admin_' } }, 
          { userId: 'superadmin' }, 
        ],
      },
    });
    return notificationCount;
  } catch (error) {
    console.error('Error counting notifications:', error);
    throw new Error('Failed to count notifications');
  }
};
