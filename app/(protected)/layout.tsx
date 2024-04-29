import { UserButton } from '@/components/auth/user-button';
import { ThemeToggle } from '@/components/theme-toggle';
import { SuperAdminNav } from './_components/superadmin-nav';
import { RoleGate } from '@/components/auth/role-gate';
import { AdminNav } from './_components/admin-nav';
import { UserNav } from './_components/user-nav';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          
          <RoleGate allowedRole="SUPERADMIN">
            <SuperAdminNav />
          </RoleGate>
          <RoleGate allowedRole="ADMIN">
            <AdminNav />
          </RoleGate>
          <RoleGate allowedRole="USER">
            <UserNav />
          </RoleGate>

          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
            <UserButton />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-2">{children}</div>
    </div>
  );
};

export default AuthLayout;
