// import { UserRole } from '@prisma/client';
// import { useCurrentRole } from '@/hooks/use-current-role';
// import { FormError } from '../form-error';
// import { userHasCompany } from '@/data/users/fetch-user-has-company';
// import { useState, useEffect } from 'react';

// interface RoleGateProps {
//   children: React.ReactNode;
//   allowedRole: UserRole;
//   userId: string; 
// }

// export const RoleGate = ({ children, allowedRole, userId }: RoleGateProps) => {
//   const role = useCurrentRole();
//   const [hasCompany, setHasCompany] = useState<boolean>(false);

//   useEffect(() => {
//     const checkCompany = async () => {
//       try {
//         const result = await userHasCompany(userId);
//         setHasCompany(result);
//       } catch (error) {
//         console.error('Error checking if user has company:', error);
//       }
//     };

//     if ((allowedRole === UserRole.ADMIN || allowedRole === UserRole.SUPERADMIN) && role === allowedRole)  {
//       checkCompany();
//     }
//   },  [role, userId, allowedRole]);

//   if (role !== allowedRole || (allowedRole === UserRole.ADMIN && !hasCompany)) {
//     return (
//       <FormError message='You are not allowed to view this page'/>
//     );
//   }

//   return <>{children}</>;
// };
