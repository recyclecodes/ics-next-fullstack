'use client';

// import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { FaPlus, FaPencil } from 'react-icons/fa6';
// import { useToast } from '@/components/ui/use-toast';
// import { deleteUser, restoreUser } from '@/lib/users/actions';
import Link from 'next/link';
import { deleteUser } from '@/actions/users/delete-user';
import { useToast } from '@/components/ui/use-toast';
import { FaRegTrashAlt } from 'react-icons/fa';

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

export function UpdateUser({ id }: { id: string }) {
  return (
    <Link href={`/users/${id}/edit`}>
      <Button>
        <span className="sr-only">Update</span>
        <FaPencil className="w-5" />
      </Button>
    </Link>
  );
}

export function DeleteUser({ id }: { id: string }) {
  const { toast } = useToast();

  const removeUser = async () => {
    try {
      await deleteUser(id);
      toast({
        variant: 'default',
        description: `Successfully deleted user with ID ${id}`,
      });
    } catch (error) {
      console.error('An error occurred while deleting the user:', error);
      toast({
        variant: 'destructive',
        description: `Error deleting the user with ID ${id}`,
      });
    }
  };
  return (
    <form action={removeUser}>
      <Button>
        <span className="sr-only">Delete</span>
        <FaRegTrashAlt className="w-5" />
      </Button>
    </form>
  );
}