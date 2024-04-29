'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CompanySchema } from '@/schemas';
import { prisma } from '@/lib/prisma';
import { State } from '@/lib/definitions';

export async function updateCompany(
  id: string | undefined,
  formData: FormData
): Promise<State> {
  const validatedFields = CompanySchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    image: formData.get('image'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Company.',
    };
  }

  const { name, image } = validatedFields.data;

  try {
    console.log('Updating company with name:', name, 'and image:', image);
    await prisma.company.update({
      where: { id },
      data: {
        name,
        image,
      },
    });

    console.log('Company updated successfully');
  } catch (error) {
    console.error('Error updating company:', error);
    return {
      message: 'Database Error: Failed to Update Company.',
    };
  }

  revalidatePath('/dashboard/companies');

  redirect('/dashboard/companies');
}
