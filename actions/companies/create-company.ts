'use server';

import { CompanySchema } from '@/schemas';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { getCompanyByName } from '@/data/company';

export const createCompany = async (values: z.infer<typeof CompanySchema>) => {
  const validatedFields = CompanySchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }
  const { name, image } = validatedFields.data;

  const existingCompany = await getCompanyByName(name);

  if (existingCompany) {
    return { error: 'Company name already exist' };
  }

  await prisma.company.create({
    data: {
      name,
      image,
    },
  });

  return { success: 'Created company successfully' };
  
};
