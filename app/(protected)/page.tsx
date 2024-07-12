"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { RoleGate } from "@/components/auth/role-gate";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { BiLoaderCircle } from "react-icons/bi";
import { hasCompany } from "@/hooks/user-has-company";
import Image from "next/image";
import { UserRole } from "@prisma/client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";


const DashboardPage = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const isSuperAdmin = session?.user?.role === UserRole.SUPERADMIN;

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      if (status === "unauthenticated") {
        window.location.reload();
      }
    }
  }, [status]);

  if (isLoading) {
    return (
      <div className="flex h-[80vh] w-auto items-center justify-center">
        <BiLoaderCircle className="h-12 w-12 animate-spin" />;
      </div>
    );
  }

  if (status === "unauthenticated" || !session) {
    <div className="flex h-[80vh] w-auto items-center justify-center">
      <BiLoaderCircle className="h-12 w-12 animate-spin" />;
    </div>;
  }

  return (
    <>
      {isSuperAdmin || hasCompany(session) ? (
        <div className="grid grid-cols-1 gap-6 py-6 md:grid-cols-2 lg:grid-cols-4">
          <RoleGate allowedRole="SUPERADMIN">
            <Card className="flex flex-col gap-4 overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-950">
              <CardHeader className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="border-4 border-gray-100 dark:border-gray-800">
                    <AvatarImage
                      src={session?.user?.image || "/fallback/fallback.png"}
                      width={28}
                      height={28}
                      alt={`${session?.user?.name}`}
                    />
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl font-bold">
                      Welcome, {session?.user?.name}
                    </CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400">
                      We&apos;re excited to have you on board.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
            <Card className="flex flex-col gap-4 overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-950">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Companies
                </CardTitle>
                <Icons.building className="h-3 w-3 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
              </CardContent>
            </Card>
            <Card className="flex flex-col gap-4 overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-950">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Assets
                </CardTitle>
                <Icons.pesoSign className="h-3 w-3 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₱45,231.89</div>
              </CardContent>
            </Card>
            <Card className="flex flex-col gap-4 overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-950">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Items
                </CardTitle>
                <Icons.items className="h-3 w-3 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">10</div>
              </CardContent>
            </Card>
            <Card className="flex flex-col gap-4 overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-950">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <Icons.users className="h-3 w-3 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
              </CardContent>
            </Card>
          </RoleGate>
          <RoleGate allowedRole="ADMIN">
            <Card className="flex flex-col gap-4 overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-950">
              <CardHeader className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="border-4 border-gray-100 dark:border-gray-800">
                    <AvatarImage
                      src={session?.user.image || "/fallback/fallback.png"}
                      width={28}
                      height={28}
                      alt={`${session?.user.name}`}
                    />
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl font-bold">
                      Welcome, {session?.user.name}
                    </CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400">
                      We&apos;re excited to have you on board.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
            <Card className="flex flex-col gap-4 overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-950">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Assets
                </CardTitle>
                <Icons.pesoSign className="h-3 w-3 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₱45,231.89</div>
              </CardContent>
            </Card>
            <Card className="flex flex-col gap-4 overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-950">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Items
                </CardTitle>
                <Icons.items className="h-3 w-3 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">10</div>
              </CardContent>
            </Card>
            <Card className="flex flex-col gap-4 overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-950">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <Icons.users className="h-3 w-3 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
              </CardContent>
            </Card>
          </RoleGate>
          <RoleGate allowedRole="USER">
            <Card className="flex flex-col gap-4 overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-950">
              <CardHeader className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="border-4 border-gray-100 dark:border-gray-800">
                    <AvatarImage
                      src={session?.user.image || "/fallback/fallback.png"}
                      width={28}
                      height={28}
                      alt={`${session?.user.name}`}
                    />
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl font-bold">
                      Welcome, {session?.user.name}
                    </CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400">
                      We&apos;re excited to have you on board.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
            <Card className="flex flex-col gap-4 overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-950">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Assets
                </CardTitle>
                <Icons.pesoSign className="h-3 w-3 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₱45,231.89</div>
              </CardContent>
            </Card>
            <Card className="flex flex-col gap-4 overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-950">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Items
                </CardTitle>
                <Icons.items className="h-3 w-3 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
              </CardContent>
            </Card>
          </RoleGate>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/assets/company-animate.svg"
            width={500}
            height={500}
            alt="Picture of the author"
          />
          <h2 className="mt-4 text-center text-lg">
            Your account is almost ready. We&apos;re assigning you to a company,
            which might take a little time.
          </h2>
        </div>
      )}
    </>
  );
};

export default DashboardPage;
