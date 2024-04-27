import Breadcrumbs from '@/components/ui/breadcrumbs';
import { CreateCompanyForm } from '@/app/(protected)/dashboard/companies/components/create-company-form';

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Companies', href: '/dashboard/companies' },
          {
            label: 'Create Company',
            href: '/companies/create',
            active: true,
          },
        ]}
      />
      <CreateCompanyForm />
    </main>
  );
}
