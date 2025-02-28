'use client';

import { UserRole } from '@prisma/client';
import { useCurrentRole } from '@/hooks/use-current-role';
import { FormError } from '../form-error';

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const PageGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <FormError message='You are not allowed to view this page'/>
    )
  }

  return <>{children}</>;
};