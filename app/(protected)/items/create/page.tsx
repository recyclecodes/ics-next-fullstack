import Breadcrumbs from '@/components/ui/breadcrumbs';
import { CreateItemForm } from '@/app/(protected)/items/components/create-item-form';

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Items', href: '/items' },
          {
            label: 'Create Item',
            href: '/items/create',
            active: true,
          },
        ]}
      />
      <CreateItemForm />
    </main>
  );
}
