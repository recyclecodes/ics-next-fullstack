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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { acceptTransfer } from '@/actions/transfers/accept-transfer';

export function CreateTransaction() {
  return (
    <Link href="/transactions/create">
      <Button className="flex">
        <div className="hidden md:block">Initiate Transfer</div>
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
      <Button variant="default" className="gap-2 w-full">
        <span className="sr-only">Approve</span>
        <FaCheck className="w-5" />
        Approve
      </Button>
    </form>
  );
}

export function RejectTransaction({ id }: { id: string }) {
  const { toast } = useToast();
  const [remarks, setRemarks] = useState('');

  const rejectTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await rejectTransfer(id, remarks);
      toast({
        variant: 'default',
        description: result.message,
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
    <Sheet>
      <SheetTrigger>
        <Button variant="secondary" className="gap-2 w-full">
          <span className="sr-only">Decline</span>
          <ImCross className="w-5" />
          Decline
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Decline Transfer</SheetTitle>
        </SheetHeader>
        <form onSubmit={rejectTransaction} className="flex flex-col gap-4 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <Label htmlFor="remarks" className="hidden sm:block text-right sm:w-1/4">
              Remarks
            </Label>
            <Input
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="flex-1"
              placeholder="Enter remarks"
            />
          </div>
          <SheetFooter className="flex justify-end gap-4">
            <SheetClose asChild>
              <Button type="submit">Submit</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
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
      <Button onClick={handleApprove} disabled={isPending}>
        {isPending ? 'Processing...' : 'Accept'}
      </Button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
