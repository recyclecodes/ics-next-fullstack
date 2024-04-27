'use server';

import { CompanySchema } from '@/schemas';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
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

// export async function createCompany(formData: FormData): Promise<State> {
//   console.log('Received form data:', formData);

//   const validatedFields = CompanySchema.safeParse({
//     name: formData.get('name'),
//     image: formData.get('image'),
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to Create Company.',
//     };
//   }

//   const { name, image } = validatedFields.data;

//   try {
//     console.log('Creating company with name:', name, 'and image:', image);
//     await prisma.company.create({
//       data: {
//         name,
//         image,
//       },
//     });
//     console.log('Company created successfully');
//   } catch (error) {
//     console.error('Error creating company:', error);
//     return {
//       message: 'Database Error: Failed to Create Company.',
//     };
//   }

//   revalidatePath('/companies');

//   redirect('/companies');
// }
