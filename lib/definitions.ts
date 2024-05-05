import { $Enums } from '@prisma/client';

export type State = {
  errors?: {
    name?: string[] | undefined;
    image?: string[] | undefined;
  };
  message?: string | null;
};

export type User = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  role: $Enums.UserRole;
  companyId: string;
};

export type Company = {
  id: string;
  name: string;
  image: string;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Item = {
  id: string;
  name: string;
  image: string;
};
