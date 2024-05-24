import { getAccessToken } from "./firebase-admin";

interface NotificationPayload {
  title: string;
  body: string;
  data: { [key: string]: string };
}

const FCM_ENDPOINT = 'https://fcm.googleapis.com/v1/projects/ics-next-fullstack/messages:send';

export const sendNotification = async (fcmToken: string, payload: NotificationPayload) => {
  const accessToken = await getAccessToken();

  const message = {
    message: {
      token: fcmToken,
      data: payload.data,
      notification: {
        title: payload.title,
        body: payload.body,
      },
    },
  };

  try {
    const response = await fetch(FCM_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error sending message: ${errorData.error.message}`);
    }

    const responseData = await response.json();
    console.log('Successfully sent message:', responseData);
  } catch (error) {
    console.error('Error sending message:');
  }
};
