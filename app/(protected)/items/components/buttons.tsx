'use client';

// import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { FaPlus, FaPencil } from 'react-icons/fa6';
// import { useToast } from '@/components/ui/use-toast';
// import { deleteCompany, restoreCompany } from '@/lib/companies/actions';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';
import { deleteItem } from '@/actions/items/delete-item';
import { FaRegTrashAlt } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export function CreateItem() {
  return (
    <Link href="/items/create">
      <Button className="flex">
        <div className="hidden md:block">Create Item</div>
        <FaPlus className="h-5 md:ml-4" />
      </Button>
    </Link>
  );
}

export function UpdateItem({ id }: { id: string }) {
  return (
    <Link href={`/items/${id}/edit`}>
      <Button>
        <span className="sr-only">Update</span>
        <FaPencil className="w-5" />
      </Button>
    </Link>
  );
}

export function DeleteItem({ id }: { id: string }) {
  const { toast } = useToast();
  const router = useRouter();

  supabase
    .channel('realtime items')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'Item',
      },
      (payload: any) => {
        router.refresh();
      }
    )
    .subscribe();

  const removeItem = async () => {
    try {
      await deleteItem(id);
      toast({
        variant: 'default',
        description: `Successfully deleted item with ID ${id}`,
      });
    } catch (error) {
      console.error('An error occurred while deleting the item:', error);
      toast({
        variant: 'destructive',
        description: `Error deleting the item with ID ${id}`,
      });
    }
  };
  return (
    <form action={removeItem}>
      <Button>
        <span className="sr-only">Delete</span>
        <FaRegTrashAlt className="w-5" />
      </Button>
    </form>
  );
}
