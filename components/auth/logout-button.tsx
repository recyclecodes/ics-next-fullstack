'use client';

// import { logout } from '@/actions/logout';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';


interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    // logout();
    signOut();
    redirect('/auth/login')
    
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
