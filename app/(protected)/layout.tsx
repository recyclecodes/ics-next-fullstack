import { UserButton } from '@/components/auth/user-button';
import { ThemeToggle } from '@/components/theme-toggle';
import { MainNav } from './_components/main-nav';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          
  
          <MainNav/>

          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
            <UserButton />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-2">{children}</div>
    </div>
  );
};

export default DashboardLayout;
