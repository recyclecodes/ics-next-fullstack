import Breadcrumbs from '@/components/ui/breadcrumbs';
import { CreateUserForm } from '@/app/(protected)/dashboard/users/components/create-user-form';
import { fetchCompanies } from '@/data/companies/fetch-companies';

export default async function Page() {
  const companies = await fetchCompanies();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Users', href: '/dashboard/users' },
          {
            label: 'Create User',
            href: '/users/create',
            active: true,
          },
        ]}
      />
      <CreateUserForm companies={companies} />
    </main>
  );
}
