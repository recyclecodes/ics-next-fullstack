"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { RoleGate } from "@/components/auth/role-gate";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { BiLoaderCircle } from "react-icons/bi";
import { hasCompany } from "@/hooks/user-has-company";
import Image from "next/image";
import { UserRole } from "@prisma/client";

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
        <div className="grid grid-cols-4 gap-4 md:grid-cols-3 lg:grid-cols-3">
          <RoleGate allowedRole="SUPERADMIN">
            <Card className="col-span-4 md:col-span-1">
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
          </RoleGate>
          <RoleGate allowedRole="ADMIN">
            <Card className="col-span-2 md:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Users</CardTitle>
                <Icons.users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
              </CardContent>
            </Card>
          </RoleGate>
          <RoleGate allowedRole="USER">
            <Card className="col-span-2 md:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Items</CardTitle>
                <Icons.keyboard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
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
          <h2 className="text-center text-lg mt-4">
            Your account is almost ready. We&apos;re assigning you to a company,
            which might take a little time.
          </h2>
        </div>
      )}
    </>
  );
};

export default DashboardPage;
