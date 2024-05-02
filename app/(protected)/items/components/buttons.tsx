'use client';

// import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { FaPlus, FaPencil } from 'react-icons/fa6';
// import { useToast } from '@/components/ui/use-toast';
// import { deleteCompany, restoreCompany } from '@/lib/companies/actions';
import Link from 'next/link';

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
