'use client';

// import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { FaPlus, FaPencil } from 'react-icons/fa6';
// import { useToast } from '@/components/ui/use-toast';
// import { deleteUser, restoreUser } from '@/lib/users/actions';
import { FaCheck, FaCross } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';
import { approveTransfer } from '@/actions/transfers/approve-transfer';
import { rejectTransfer } from '@/actions/transfers/reject-transfer';
import { useState, useTransition } from 'react';
import { acceptTransfer } from '@/actions/transfers/accept-transfer';

export function CreateTransaction() {
  return (
    <Link href="/transactions/create">
      <Button className="flex">
        <div className="hidden md:block">Create Transactions</div>
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
      console.error(
        'An error occurred while approving the transaction:',
        error
      );
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
        <FaCheck className="w-5" />
      </Button>
    </form>
  );
}

export function RejectTransaction({ id }: { id: string }) {
  const { toast } = useToast();

  const rejectTransaction = async () => {
    try {
      await rejectTransfer(id);
      toast({
        variant: 'default',
        description: `Successfully rejected transaction`,
      });
    } catch (error) {
      console.error(
        'An error occurred while rejecting the transaction:',
        error
      );
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
        <ImCross className="w-5" />
      </Button>
    </form>
  );
}

export function AcceptTransaction({ id }: { id: string }) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleApprove = async () => {
    setError(null);

    startTransition(async () => {
      const result = await acceptTransfer(id);

      if (result && 'error' in result && result.error) {
        setError(result.error);
        toast({
          variant: 'destructive',
          description: `Error accepting transfer: ${result.error}`,
        });
      } else if (result && 'success' in result && result.success) {
        toast({
          variant: 'default',
          description: `Successfully accepted transfer`,
        });
      } else {
        toast({
          variant: 'destructive',
          description: `Undefined result returned from acceptTransfer`,
        });
      }
    });
  };

  return (
    <div>
      <button onClick={handleApprove} disabled={isPending}>
        {isPending ? 'Processing...' : 'Accept'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
