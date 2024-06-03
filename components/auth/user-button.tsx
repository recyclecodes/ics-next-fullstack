'use client';
import { FaUser } from 'react-icons/fa';
import { BiExit } from 'react-icons/bi';
import { TbSettings2 } from 'react-icons/tb';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useCurrentUser } from '@/hooks/use-current-user';
import { LogoutButton } from '@/components/auth/logout-button';
import Link from 'next/link';
import { Badge } from '../ui/badge';

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user?.image || ''} />
          <AvatarFallback className="bg-primary ">
            <FaUser className="text-primary-foreground w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-[8px] leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex justify-between">
            <Link href="/profile">Profile</Link>
            <Badge className="text-[9px] w-auto">{user?.role}</Badge>
          </DropdownMenuItem>
          {user?.isOAuth === false && (
            <>
              <DropdownMenuItem className="flex justify-between">
                <Link href="/settings">Settings</Link>
                <TbSettings2 className="h-4 w-4 mr-2 text-primary" />
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <LogoutButton>
          <DropdownMenuItem className="flex justify-between">
            Logout
            <BiExit className="h-4 w-4 mr-2 text-primary" />
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
