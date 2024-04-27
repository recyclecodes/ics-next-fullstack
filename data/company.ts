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
