import Breadcrumbs from '@/components/ui/breadcrumbs';
import { CreateUserForm } from '@/app/(protected)/users/components/create-user-form';
import { fetchCompanies } from '@/data/companies/fetch-companies';
import { CreateTransferForm } from '../../transactions/components/create-transaction-form';

export default async function Page() {
  const companies = await fetchCompanies();

  return (
    <main>
      {/* <Breadcrumbs
        breadcrumbs={[
          { label: 'Users', href: '/users' },
          {
            label: 'Create User',
            href: '/users/create',
            active: true,
          },
        ]}
      /> */}
      <CreateTransferForm companies={companies} />
    </main>
  );
}
