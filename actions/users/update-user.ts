'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { UserSchema } from '@/schemas';
import { prisma } from '@/lib/prisma';
import { State } from '@/lib/definitions';



export async function updateUser(
  id: string | undefined,
  formData: FormData
): Promise<State> {
  const validatedFields = UserSchema.safeParse({
    companyId: formData.get('companyId'),
    email: formData.get('email'),
    name: formData.get('name'),
    image: formData.get('image'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create User.',
    };
  }

  const { companyId, email, name, image } = validatedFields.data;

  try {
    console.log('Updating company with name:', name, 'and image:', image);
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        companyId,
        email,
        name,
        image,
      },
    });

    console.log('User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
    return {
      message: 'Database Error: Failed to Update User.',
    };
  }

  revalidatePath('/users');

  redirect('/users');
}