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
import AdminItemsTable from './components/admin-items-table';
import { getCurrentUserCompanyId } from '@/data/user';
import { Heading } from '@/components/ui/heading';

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
  const currentUserCompany = await getCurrentUserCompanyId(userId);
  const currentUserCompanyId = currentUserCompany?.companyId || '';

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <Heading title="Items" description="List of items" />
      </div>
      <div className=" flex items-center justify-between gap-2 md:mt-4">
        <Search placeholder="Search Items..." />
        <CreateItem />
      </div>
      <Suspense key={query + currentPage} fallback={''}>
        <RoleGate allowedRole="ADMIN">
          <AdminItemsTable
            query={query}
            currentPage={currentPage}
            currentUserCompanyId={currentUserCompanyId}
          />
        </RoleGate>
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
