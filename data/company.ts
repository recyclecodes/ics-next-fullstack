'use server';

import { prisma } from '@/lib/prisma';

export const getCompanyByName = async (name: string) => {
  try {
    const company = await prisma.company.findUnique({ where: { name } });

    return company;
  } catch {
    return null;
  }
};

export const getCompanyById = async (id: string) => {
  try {
    const company = await prisma.company.findUnique({ where: { id } });

    return company;
  } catch {
    return null;
  }
};

export const getCompanyWithUsersById = async (companyId: string) => {
  try {
    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
      },
      include: {
        users: true,
      },
    });

    return company;
  } catch (error) {
    console.error('Error fetching company with users:', error);
    return null;
  }
};

export const getCompanyOfCurrentUser = async (userId: string) => {
  try {
    const companyWithUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        company: true,
      },
    });
    return companyWithUser;
  } catch (error) {
    console.error('Error fetching company of current user:', error);
    return null;
  }
};
