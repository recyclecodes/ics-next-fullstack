'use server';

import { UserRole } from '@prisma/client';
import { UserSchema } from '@/schemas';
import { prisma } from '@/lib/prisma';
import { State } from '@/lib/definitions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateUser(
  id: string | undefined,
  formData: FormData
): Promise<State> {
  if (!id) {
    return {
      message: 'Missing ID. Failed to Update User.',
    };
  }

  const validatedFields = UserSchema.safeParse({
    role: formData.get('role'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update User.',
    };
  }

  const { role } = validatedFields.data;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return {
        message: 'User not found.',
      };
    }

    const loggedInUserRole = 'SUPERADMIN';

    if (
      loggedInUserRole === UserRole.SUPERADMIN &&
      user.role === UserRole.ADMIN &&
      role === UserRole.USER
    ) {
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          role: UserRole.USER,
          adminUserId: null,
        },
      });
    } else if (
      loggedInUserRole === UserRole.SUPERADMIN &&
      user.role === UserRole.USER &&
      role === UserRole.ADMIN
    ) {
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          role: UserRole.ADMIN,
          adminUserId: id,
        },
      });
    } else {
      return {
        message: 'Insufficient permissions or unsupported role change.',
      };
    }

    console.log('User updated successfully');

    // Revalidate path and redirect after successful update
    revalidatePath('/users');
    redirect('/users');
  } catch (error) {
    console.error('Error updating user:', error);
    return {
      message: 'Database Error: Failed to Update User.',
    };
  }
}
