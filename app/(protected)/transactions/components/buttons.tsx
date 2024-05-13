'use client';

// import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { FaPlus, FaPencil } from 'react-icons/fa6';
// import { useToast } from '@/components/ui/use-toast';
// import { deleteUser, restoreUser } from '@/lib/users/actions';
import { FaCheck, FaCross } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';
import { approveTransfer } from '@/actions/transfers/approve-transfer';
import { rejectTransfer } from '@/actions/transfers/reject-transfer';

export function CreateTransaction() {
  return (
    <Link href="/transactions/create">
      <Button className="flex">
        <div className="hidden md:block">Create User</div>
        <FaPlus className="h-5 md:ml-4" />
      </Button>
    </Link>
  );
}


export function ApproveTransaction({ id }: { id: string }) {
    const { toast } = useToast();
  
    const approveTransaction = async () => {
      try {
        await approveTransfer(id);
        toast({
          variant: 'default',
          description: `Successfully approved transaction`,
        });
      } catch (error) {
        console.error('An error occurred while approving the transaction:', error);
        toast({
          variant: 'destructive',
          description: `Error approving transaction`,
        });
      }
    };
    return (
      <form action={approveTransaction}>
        <Button>
          <span className="sr-only">Approve</span>
          <FaCheck className='w-5'/>
        </Button>
      </form>
    );
  }

  export function RejectTransaction({ id }: { id: string }) {
    const { toast } = useToast();
  
    const rejectTransaction = async () => {
      try {
        await rejectTransfer (id);
        toast({
          variant: 'default',
          description: `Successfully rejected transaction`,
        });
      } catch (error) {
        console.error('An error occurred while rejecting the transaction:', error);
        toast({
          variant: 'destructive',
          description: `Error rejecting transaction`,
        });
      }
    };
    return (
      <form action={rejectTransaction}>
        <Button>
          <span className="sr-only">Reject</span>
          <ImCross className='w-5'/>
        </Button>
      </form>
    );
  }