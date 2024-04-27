import { $Enums } from "@prisma/client";



export type State = {
    errors?: {
      name?: string[] | undefined;
      image?: string[] | undefined;
    };
    message?: string | null;
  };

export type User ={
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    role: $Enums.UserRole;
}

export type Company = {
    id: string;
    name: string;
    image: string;
    createdAt: Date;
}