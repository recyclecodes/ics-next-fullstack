import { prisma } from '@/lib/prisma';

export const saveFcmToken = async (userId: string, fcmToken: string) => {
  try {
    // Check if the notification already exists
    const existingNotification = await prisma.notification.findUnique({
      where: {
        userId_fcmToken: {
          userId,
          fcmToken,
        },
      },
    });

    if (existingNotification) {
      // If the notification exists, update it
      await prisma.notification.update({
        where: {
          id: existingNotification.id,
        },
        data: {
          fcmToken,
        },
      });
    } else {
      // If the notification does not exist, create it
      await prisma.notification.create({
        data: {
          userId,
          fcmToken,
          title: 'Default Title', // Provide default or required values
          body: 'Default Body',   // Provide default or required values
          // Include other required fields if any
        },
      });
    }

    console.log('FCM token saved successfully');
  } catch (error) {
    console.error('Error saving FCM token:', error);
  }
};
