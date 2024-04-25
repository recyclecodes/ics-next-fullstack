'use client';

import { useCurrentUser } from '@/hooks/use-current-user';
import { UserInfo } from '../_components/user-info';

const ProfilePage = () => {
  const user = useCurrentUser();

  return (
    <div className='pt-20'>
      <UserInfo user={user} />
    </div>
  );
};

export default ProfilePage;
