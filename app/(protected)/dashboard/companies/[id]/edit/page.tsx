import { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import EditCompanyForm from '../../components/edit-company-form';
import { fetchCompanyById } from '@/data/companies/fetch-company-id';

export const metadata: Metadata = {
  title: 'Edit Company',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const company = await fetchCompanyById(id);



  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Companies', href: '/dashboard/companies' },
          {
            label: 'Edit Company',
            href: `/dashboard/companies/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditCompanyForm company={company} />
    </main>
  );
}
