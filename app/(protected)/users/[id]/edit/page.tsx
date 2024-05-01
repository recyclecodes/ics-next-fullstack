import { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { fetchCompanies } from '@/data/companies/fetch-companies';
import { fetchUserById } from '@/data/users/fetch-user-by-id';
import EditUserForm from '@/app/(protected)/users/components/edit-user-form';

export const metadata: Metadata = {
  title: 'Edit User',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  
  const [companies, user] = await Promise.all([
    fetchCompanies(),
    fetchUserById(id)
  ]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Users', href: '/users' },
          {
            label: 'Edit Company',
            href: `/users/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditUserForm companies={companies} user={user} />
    </main>
  );
}
