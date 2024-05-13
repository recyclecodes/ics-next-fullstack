import { Metadata } from 'next';
import { Suspense } from 'react';
import Search from '@/components/auth/search';
import Pagination from '@/app/(protected)/_components/pagination';
import { fetchItemsPages } from '@/data/items/fetch-items-pages';
// import { CreateItem } from './components/buttons';
// import ItemsTable from './components/items-table';
import { currentUser } from '@/lib/auth';
import TransactionsTable from './components/transactions-table';
import SenderTransactionsTable from './components/sender-transactions-table';
import RecipientTransactionsTable from './components/recipient-transactions-table';
import { RoleGate } from '@/components/auth/role-gate';
import { getUserWithRecipient, getUserWithSender } from '@/data/user';
import { CreateTransaction } from './components/buttons';

export const metadata: Metadata = {
  title: 'ICS | Transactions',
};

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchItemsPages(query);
  const user = await currentUser();
  const userId = user?.id ?? '';

  const userWithSender = await getUserWithSender(userId);
  const userWithRecipient = await getUserWithRecipient(userId);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-base">Transactions</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Transactions..." />
        <CreateTransaction/>
      </div>
      <Suspense key={query + currentPage} fallback={''}>
        <RoleGate allowedRole="ADMIN">
          <TransactionsTable
            query={query}
            currentPage={currentPage}
            userId={userId}
          />
        </RoleGate>
        <RoleGate allowedRole="USER">
          {userWithRecipient?.recipientTransfer && (
            <SenderTransactionsTable
              query={query}
              currentPage={currentPage}
              userId={userId}
            />
          )}
          {userWithSender?.senderTransfer && (
            <RecipientTransactionsTable
              query={query}
              currentPage={currentPage}
              userId={userId}
            />
          )}
          
        </RoleGate>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
