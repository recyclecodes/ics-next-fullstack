import { fetchCompaniesPages } from '@/data/companies/fetch-companies-pages';
import { Metadata } from 'next';
import { Suspense } from 'react';
import Search from '@/app/(protected)/_components/search';
import Pagination from '@/app/(protected)/_components/pagination';
import CompaniesTable from '@/app/(protected)/companies/components/companies-table';
import { CreateCompany } from '@/app/(protected)/companies/components/buttons';

export const metadata: Metadata = {
  title: 'ICS | Companies',
};

export default async function CompaniesPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchCompaniesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-base">Companies</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Companies..." />
        <CreateCompany />
      </div>
      <Suspense key={query + currentPage} fallback={''}>
        <CompaniesTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
