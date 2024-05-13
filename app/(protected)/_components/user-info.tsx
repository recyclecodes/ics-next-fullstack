import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ExtendedUser } from '@/next-auth';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaUser } from 'react-icons/fa';
import { useSession } from 'next-auth/react';

interface UserInfoProps {
  user?: ExtendedUser;
}

export const UserInfo = ({ user }: UserInfoProps) => {
  const { data: session } = useSession();
  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <div className="flex justify-center -mt-20">
          <Avatar className="h-28 w-28">
            <AvatarImage src={user?.image || ''} />
            <AvatarFallback className="bg-primary ">
              <FaUser className="text-primary-foreground w-4 h-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <p className="truncate text-xs max-w-[180px] font-mono bg-secondary rounded-md">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Name</p>
          <p className="truncate text-xs max-w-[180px] font-mono bg-secondary rounded-md">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>
          <p className="truncate text-xs max-w-[180px] font-mono bg-secondary rounded-md">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Role</p>
          <p className="truncate text-xs max-w-[180px] font-mono bg-secondary rounded-md">
            {user?.role}
          </p>
        </div>
        {user?.isOAuth === false && (
          <>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <p className="text-sm font-medium">Two Factor Authentication</p>
              <Badge
                variant={user?.isTwoFactorEnabled ? 'success' : 'destructive'}
              >
                {user?.isTwoFactorEnabled ? 'ON' : 'OFF'}
              </Badge>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
