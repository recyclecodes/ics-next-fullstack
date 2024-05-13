'use server';

import {prisma} from '@/lib/prisma'
import { revalidatePath } from 'next/cache';

export async function deleteUser(id: string | undefined) {
  try {
    await prisma.user.update({ where: { id }, data: { deletedAt: new Date() } });
  } catch (error) {
    return { message: 'Database Error: Failed to Delete User.' };
  }
  revalidatePath('/companies');
}
