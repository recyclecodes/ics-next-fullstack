'use server';

import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: any) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUsersByCompanyId = async (companyId: string) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        companyId: companyId,
      },
    });

    return users;
  } catch (error) {
    console.error('Error fetching users by company ID:', error);
    return [];
  }
};

export const getCurrentUserCompany = async (userId: string) => {
  try {
    const userWithCompany = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        company: true,
      },
    });

    const company = userWithCompany?.company;

    return company;
  } catch (error) {
    console.error('Error fetching company of current user:', error);
    return null;
  }
};

export const getAdminUserByCompanyId = async (companyId: string) => {
  try {
    const adminUser = await prisma.user.findFirst({
      where: {
        companyId: companyId,
        role: UserRole.ADMIN,
      },
    });

    return adminUser;
  } catch (error) {
    console.error('Error fetching admin user:', error);
    return null;
  }
};

export const getUserItems = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        items: true,
      },
    });
    return user;
  } catch (error) {
    console.error('Error fetching user items:', error);
    return null;
  }
};


interface UserWithSender {
  id: string;
  senderTransfer: any[]; 
}


export const getUserWithSender = async (userId: string): Promise<UserWithSender | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        senderTransfer: true,
      },
    });
    console.log(user);
    return user as UserWithSender; 
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

interface UserWithRecipient {
  id: string;
  recipientTransfer: any[]; 
}


export const getUserWithRecipient = async (userId: string): Promise<UserWithRecipient | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        recipientTransfer: true,
      },
    });
    return user as UserWithRecipient;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

