import { fetchUsersPages } from '@/data/users/fetch-users-pages';
import { Metadata } from 'next';
import { Suspense } from 'react';
import Search from '@/components/auth/search';
import Pagination from '@/app/(protected)/_components/pagination';
import UsersTable from '@/app/(protected)/users/components/superadmin-users-table';
import { CreateUser } from '@/app/(protected)/users/components/buttons';
import { Heading } from '@/components/ui/heading';

export const metadata: Metadata = {
  title: 'ICS | Users',
};

export default async function UsersPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchUsersPages(query);

  return (
    
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
      <Heading
        title="Users"
        description="List of users"
      />
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Users..." />
        <CreateUser />
      </div>
      <Suspense key={query + currentPage} fallback={''}>
        <UsersTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
