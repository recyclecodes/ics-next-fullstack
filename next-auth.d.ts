import { Company, UserRole } from '@prisma/client';
import NextAuth, { type DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  company?: {
    id: string;
    name: string;
    image: string;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
  };
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
