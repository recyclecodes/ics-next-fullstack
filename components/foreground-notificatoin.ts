'use client';

import { getMessaging, onMessage, MessagePayload } from 'firebase/messaging';

import { useEffect } from 'react';
import useFcmToken from '@/hooks/use-fcm-token';
import firebaseApp from '@/firebase';

export default function FcmTokenComp(): null {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      if (notificationPermissionStatus === 'granted') {
        const messaging = getMessaging(firebaseApp);
        const unsubscribe = onMessage(messaging, (payload: MessagePayload) => {
          console.log('Foreground push notification received:', payload);
        });
        return () => {
          unsubscribe(); // Unsubscribe from the onMessage event on cleanup
        };
      }
    }
  }, [notificationPermissionStatus]);

  return null; // This component is primarily for handling foreground notifications
}
