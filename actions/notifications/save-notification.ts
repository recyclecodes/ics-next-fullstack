import { prisma } from '@/lib/prisma';

export const saveNotification = async (userId: string, title: string, body: string) => {
  try {
    await prisma.notification.create({
      data: {
        userId,
        title,
        body,
      },
    });
  } catch (error) {
    console.error('Error saving notification:', error);
  }
};
