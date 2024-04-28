'use server'

import { UserSchema } from '@/schemas';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const updateUser = async (id: string, values: Omit<z.infer<typeof UserSchema>,'password'>) => {
    
  const validatedFields = UserSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 
        'Invalid fields!'
     }; 
  }

  const { companyId, email, name, image, role } = validatedFields.data;

  const existingCompany = await prisma.company.findUnique({
    where: {
      id: companyId,
    },
  });

  if (!existingCompany) {
    return { error: 'Company not found' };
  }


  const existingUser = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!existingUser) {
    return { error: 'User not found' };
  }


  await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      companyId,
      email,
      name,
      image,
      role,
    },
  });

  return { success: 'User updated successfully' };
};
