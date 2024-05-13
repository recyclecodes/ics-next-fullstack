import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center mt-8">
      <h1 className={cn('text-xl text-center font-semibold', font.className)}>ICS | Inventory Control System</h1>
      <p className="text-muted-foreground text-center text-sm">{label}</p>
    </div>
  );
};
