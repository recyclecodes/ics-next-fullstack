'use client';

import { countNotifications } from '@/data/transactions/count-notifications';
import { useCurrentUser } from '@/hooks/use-current-user';
import  { useEffect, useState } from 'react';

const useNotificationCount = () => {
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const user = useCurrentUser();

  useEffect(() => {
    if (user) {
      fetchNotificationCount(user?.id || '');
    }
  }, [user]);


  const fetchNotificationCount = async (userId: string) => {
    try {
      const count = await countNotifications(userId);
      setNotificationCount(count);
    } catch (error) {
      console.error('Error fetching notification count:', error);
    }
  };

  return notificationCount;
};

const NotificationBadge = () => {
  const notificationCount = useNotificationCount();

  return <div>{notificationCount}</div>;
};

export default NotificationBadge;
