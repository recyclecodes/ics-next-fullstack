import { Metadata } from 'next';
import { Suspense } from 'react';
import Search from '@/components/auth/search';
import Pagination from '@/app/(protected)/_components/pagination';
import { fetchItemsPages } from '@/data/items/fetch-items-pages';
import { CreateItem } from './components/buttons';
import ItemsTable from './components/items-table';
import { currentUser } from '@/lib/auth';
import SuperadminItemsTable from './components/superadmin-items-table';
import { RoleGate } from '@/components/auth/role-gate';

export const metadata: Metadata = {
  title: 'ICS | Items',
};

export default async function ItemsPage({
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

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-base">Items</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Items..." />
        <CreateItem />
      </div>
      <Suspense key={query + currentPage} fallback={''}>
        <RoleGate allowedRole="USER">
          <ItemsTable query={query} currentPage={currentPage} userId={userId} />
        </RoleGate>
        <RoleGate allowedRole="SUPERADMIN">
          <SuperadminItemsTable query={query} currentPage={currentPage} />
        </RoleGate>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
