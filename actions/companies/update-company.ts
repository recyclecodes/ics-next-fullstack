import { CompanySchema } from '@/schemas';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { getCompanyByName } from '@/data/company';

export const updateCompany = async (id: string, values: z.infer<typeof CompanySchema>) => {
  const validatedFields = CompanySchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { name, image } = validatedFields.data;

  const existingCompany = await prisma.company.findUnique({
    where: {
      id: id,
    },
  });

  if (!existingCompany) {
    return { error: 'Company not found' };
  }

  const companyWithName = await getCompanyByName(name);

  if (companyWithName && companyWithName.id !== id) {
    return { error: 'Company name already exists' };
  }

  await prisma.company.update({
    where: {
      id: id,
    },
    data: {
      name,
      image,
    },
  });

  return { success: 'Updated company successfully' };
};
