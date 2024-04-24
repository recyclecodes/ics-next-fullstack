'use client';

import { useCurrentUser } from '@/hooks/use-current-user';
import { UserButton } from '@/components/auth/user-button';
import { UserInfo } from '../_components/user-info';

const SettingsPage = () => {
  const user = useCurrentUser();

  return (
    <div>
      {JSON.stringify(user)}
      <p>{user?.name}</p>
      <UserButton />
      <UserInfo label={user?.email} user={user} />
    </div>
  );
};

export default SettingsPage;
