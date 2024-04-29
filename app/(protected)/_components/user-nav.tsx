'use client';

import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { PiSlackLogoBold } from 'react-icons/pi';
import { MdDashboard } from 'react-icons/md';
import { PiBuildingsFill } from 'react-icons/pi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export function UserNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const routes = [
    {
      href: `/`,
      label: 'User Overview',
      icon: <MdDashboard className="h-5 w-5 mr-5 text-primary" />,
      active: pathname === `/`,
    },
    {
      href: `/companies`,
      label: 'User Companies',
      icon: <PiBuildingsFill className="h-5 w-5 mr-5 text-primary" />,
      active: pathname === `/companies`,
    },
    {
      href: `/users`,
      label: 'User Users',
      icon: <PiBuildingsFill className="h-5 w-5 mr-5 text-primary" />,
      active: pathname === `/users`,
    },
  ];

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <AiOutlineMenuUnfold className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className="flex items-start">
            <SheetTitle className="flex items-center space-x-4">
              <PiSlackLogoBold className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              Item Tracker
            </SheetTitle>
            <SheetDescription className="text-xs md:text-sm">
              Empowering seamless item transfers.
            </SheetDescription>
          </SheetHeader>

          <SheetClose asChild>
            <nav
              className={cn('ml-4 mt-10 flex flex-col space-y-4', className)}
              {...props}
            >
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    'flex items-center text-lg font-medium transition-colors hover:text-primary',
                    route.active
                      ? 'text-black dark:text-white'
                      : 'text-muted-foreground'
                  )}
                >
                  {route.icon}
                  {route.label}
                </Link>
              ))}
            </nav>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </>
  );
}
