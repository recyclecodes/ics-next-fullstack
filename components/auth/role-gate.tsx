'use client';

import { UserRole } from '@prisma/client';
import { useCurrentRole } from '@/hooks/use-current-role';
import { FormError } from '../form-error';

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return null;
    // return (
    //   <FormError message='You are not allowed to view this page'/>
    // )
  }

  return <>{children}</>;
};


/**TODO: RENAME THIS COMPONENT TO GATE KEEPER &
 * APPLY GATE FOR USERS NOT ASSIGNED TO A COMPANY
 * ADD 404 PAGE IF USERS ARE NOT ALLOWED
 */
//   const company = useCurrentCompany();

//   if (!role && !company) {
//     return (
//       <FormError message="Error Message that fits here" />
//     );
//   }

//   if (role !==allowedRole && !company) {
//     return (
//         <FormError message='Another Error Message that fits here'/>
//     )
//   }
