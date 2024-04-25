import { SidebarNavItem } from '@/types/nav';

interface DocsConfig {
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  sidebarNav: [
    {
      icon: 'dashboard',
      title: 'Dashboard',
      href: '/dashboard',
      items: [],
    },
    {
      title: 'Companies',
      href: '/companies',
      items: [],
    },
    {
      title: 'Users',
      href: '/users',
      items: [],
    },
    {
      title: 'Items',
      href: '/items',
      items: [],
    },
  ],
};
