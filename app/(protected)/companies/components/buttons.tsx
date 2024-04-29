'use client';

// import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { FaPlus, FaPencil } from 'react-icons/fa6';
// import { useToast } from '@/components/ui/use-toast';
// import { deleteCompany, restoreCompany } from '@/lib/companies/actions';
import Link from 'next/link';

export function CreateCompany() {
  return (
    <Link href="/companies/create">
      <Button className="flex">
        <div className="hidden md:block">Create Company</div>
        <FaPlus className="h-5 md:ml-4" />
      </Button>
    </Link>
  );
}

export function UpdateCompany({ id }: { id: string }) {
  return (
    <Link href={`/companies/${id}/edit`}>
      <Button>
        <span className="sr-only">Update</span>
        <FaPencil className="w-5" />
      </Button>
    </Link>
  );
}

// export function ViewCompany({ id }: { id: string }) {
//   return (
//     <Link href={`/companies/${id}/view`}>
//       <Button>
//         <span className="sr-only">${id}</span>
//         <Icons.eye className="w-5" />
//       </Button>
//     </Link>
//   );
// }

// export function DeleteCompany({ id }: { id: string }) {
//   const { toast } = useToast();

//   const removeCompany = async () => {
//     try {
//       await deleteCompany(id);
//       toast({
//         variant: 'default',
//         description: `Successfully deleted company with ID ${id}`,
//       });
//     } catch (error) {
//       console.error('An error occurred while deleting the company:', error);
//       toast({
//         variant: 'destructive',
//         description: `Error deleting the company with ID ${id}`,
//       });
//     }
//   };
//   return (
//     <form action={removeCompany}>
//       <Button>
//         <span className="sr-only">Delete</span>
//         <Icons.trash className="w-5" />
//       </Button>
//     </form>
//   );
// }

// export function RestoreCompany({ id }: { id: string }) {
//   const { toast } = useToast();

//   const returnCompany = async () => {
//     try {
//       await restoreCompany(id);
//       toast({
//         variant: 'default',
//         description: `Successfully restored company with ID ${id}`,
//       });
//     } catch (error) {
//       console.error('An error occurred while retoring the company:', error);
//       toast({
//         variant: 'destructive',
//         description: `Error restoring the company with ID ${id}`,
//       });
//     }
//   };
//   return (
//     <form action={returnCompany}>
//       <Button>
//         <span className="sr-only">Restore</span>
//         <Icons.restore className="w-5" />
//       </Button>
//     </form>
//   );
// }
