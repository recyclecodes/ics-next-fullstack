'use client';

// import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { FaPlus, FaPencil } from 'react-icons/fa6';
// import { useToast } from '@/components/ui/use-toast';
// import { deleteUser, restoreUser } from '@/lib/users/actions';
import Link from 'next/link';

export function CreateUser() {
  return (
    <Link href="/users/create">
      <Button className="flex">
        <div className="hidden md:block">Create User</div>
        <FaPlus className="h-5 md:ml-4" />
      </Button>
    </Link>
  );
}

// export function UpdateUser({ id }: { id: string }) {
//   return (
//     <Link href={`/dashboard/users/${id}/edit`}>
//       <Button>
//         <span className="sr-only">Update</span>
//         <FaPencil className="w-5" />
//       </Button>
//     </Link>
//   );
// }
