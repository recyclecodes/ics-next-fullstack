import { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/breadcrumbs';
// import EditCompanyForm from '../../components/edit-company-form';
import { fetchCompanyById } from '@/data/companies/fetch-company-id';
import { fetchCompanies } from '@/data/companies/fetch-companies';
import { fetchUserById } from '@/data/users/fetch-user-by-id';

export const metadata: Metadata = {
  title: 'Edit User',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  
  const [companies, user] = await Promise.all([
    fetchCompanies(),
    fetchUserById(id)
  ])



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
      {/* <EditCompanyForm company={company} /> */}
    </main>
  );
}
