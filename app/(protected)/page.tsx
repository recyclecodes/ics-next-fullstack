'use client';

import { RoleGate } from '@/components/auth/role-gate';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';

const DashboardPage = () => {
  return (
    <>
      <div className="grid gap-4 grid-cols-4 md:grid-cols-3 lg:grid-cols-3">
        <RoleGate allowedRole="SUPERADMIN">
          <Card className="col-span-4 md:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium ">
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
    </>
  );
};

export default DashboardPage;
