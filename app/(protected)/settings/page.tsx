'use client';

import { useCurrentUser } from '@/hooks/use-current-user';
import { signOut } from 'next-auth/react';

const SettingsPage = () => {
  const user = useCurrentUser();

  const onClick = () => {
    signOut();
  };

  return (
    <div>
      {JSON.stringify(user)}
      <button onClick={onClick} type="submit">
        Sign out
      </button>
    </div>
  );
};

export default SettingsPage;
