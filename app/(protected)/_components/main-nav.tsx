"use client";

import { AiOutlineMenuUnfold } from "react-icons/ai";
import { PiSlackLogoBold } from "react-icons/pi";
import { RiFileTransferFill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { PiBuildingsFill } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";
import { BsBoxFill } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { RoleGate } from "@/components/auth/role-gate";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { hasCompany } from "@/hooks/user-has-company";
import { UserRole } from "@prisma/client";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const user = useCurrentUser();
  const { data: session } = useSession();
  const isSuperAdmin = session?.user?.role === UserRole.SUPERADMIN;
  const hasCompanyFlag = hasCompany(session);
  const companyName = hasCompanyFlag ? user?.company?.name : "Item Tracker";

  const superadminRoutes = [
    {
      href: `/`,
      label: "Overview",
      icon: <MdDashboard className="mr-5 h-5 w-5 text-primary" />,
      active: pathname === `/`,
    },
    {
      href: `/companies`,
      label: "Companies",
      icon: <PiBuildingsFill className="mr-5 h-5 w-5 text-primary" />,
      active: pathname === `/companies`,
    },
    {
      href: `/users`,
      label: "Users",
      icon: <FaUsers className="mr-5 h-5 w-5 text-primary" />,
      active: pathname === `/users`,
    },
    {
      href: `/items`,
      label: "Items",
      icon: <BsBoxFill className="mr-5 h-5 w-5 text-primary" />,
      active: pathname === `/items`,
    },
    {
      href: `/transactions`,
      label: "Transfers",
      icon: <RiFileTransferFill className="mr-5 h-5 w-5 text-primary" />,
      active: pathname === `/transactions`,
    },
  ];
  const adminRoutes = [
    {
      href: `/`,
      label: "Overview",
      icon: <MdDashboard className="mr-5 h-5 w-5 text-primary" />,
      active: pathname === `/`,
    },
    {
      href: `/users`,
      label: "Users",
      icon: <PiBuildingsFill className="mr-5 h-5 w-5 text-primary" />,
      active: pathname === `/users`,
    },
    {
      href: `/transactions`,
      label: "Transfers",
      icon: <RiFileTransferFill className="mr-5 h-5 w-5 text-primary" />,
      active: pathname === `/transactions`,
    },
    {
      href: `/items`,
      label: "Items",
      icon: <BsBoxFill className="mr-5 h-5 w-5 text-primary" />,
      active: pathname === `/items`,
    },
  ];
  const userRoutes = [
    {
      href: `/`,
      label: "Overview",
      icon: <MdDashboard className="mr-5 h-5 w-5 text-primary" />,
      active: pathname === `/`,
    },
    {
      href: `/items`,
      label: "Items",
      icon: <BsBoxFill className="mr-5 h-5 w-5 text-primary" />,
      active: pathname === `/items`,
    },
    {
      href: `/transactions`,
      label: "Transfers",
      icon: <RiFileTransferFill className="mr-5 h-5 w-5 text-primary" />,
      active: pathname === `/transactions`,
    },
  ];

  return (
    <>
      {isSuperAdmin || hasCompany(session) ? (
        <Sheet>
          <SheetTrigger asChild>
            <AiOutlineMenuUnfold className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader className="flex items-start">
              <SheetTitle className="flex items-center space-x-4">
                {/* <PiSlackLogoBold className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              <Avatar>{user?.company?.image}</Avatar> */}
                <Avatar>
                  <AvatarImage
                    src={user?.company?.image}
                    width={28}
                    height={28}
                    alt={`${user?.company?.name}`}
                  />
                  <AvatarFallback className="bg-primary-foreground">
                    <PiSlackLogoBold className="h-6 w-6 text-primary" />
                  </AvatarFallback>
                </Avatar>
                {/* Item Tracker */}
                <div>{companyName}</div>
              </SheetTitle>
              <SheetDescription className="text-xs md:text-sm">
                Empowering seamless item transfers.
              </SheetDescription>
            </SheetHeader>

            <nav
              className={cn("ml-4 mt-10 flex flex-col space-y-4", className)}
              {...props}
            >
              <RoleGate allowedRole="SUPERADMIN">
                {superadminRoutes.map((route) => (
                  <SheetClose asChild key={route.href}>
                    <Link
                      href={route.href}
                      className={cn(
                        "flex items-center text-lg font-medium transition-colors hover:text-primary",
                        route.active
                          ? "text-black dark:text-white"
                          : "text-muted-foreground",
                      )}
                    >
                      {route.icon}
                      {route.label}
                    </Link>
                  </SheetClose>
                ))}
              </RoleGate>
              <RoleGate allowedRole="ADMIN">
                {adminRoutes.map((route) => (
                  <SheetClose asChild key={route.href}>
                    <Link
                      href={route.href}
                      className={cn(
                        "flex items-center text-lg font-medium transition-colors hover:text-primary",
                        route.active
                          ? "text-black dark:text-white"
                          : "text-muted-foreground",
                      )}
                    >
                      {route.icon}
                      {route.label}
                    </Link>
                  </SheetClose>
                ))}
              </RoleGate>
              <RoleGate allowedRole="USER">
                {userRoutes.map((route) => (
                  <SheetClose asChild key={route.href}>
                    <Link
                      href={route.href}
                      className={cn(
                        "flex items-center text-lg font-medium transition-colors hover:text-primary",
                        route.active
                          ? "text-black dark:text-white"
                          : "text-muted-foreground",
                      )}
                    >
                      {route.icon}
                      {route.label}
                    </Link>
                  </SheetClose>
                ))}
              </RoleGate>
            </nav>
          </SheetContent>
        </Sheet>
      ) : null}
    </>
  );
}
