'use server';

import {prisma} from '@/lib/prisma'
import { revalidatePath } from 'next/cache';

export async function deleteCompany(id: string | undefined) {
  try {
    await prisma.company.update({ where: { id }, data: { deletedAt: new Date() } });
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Company.' };
  }
  revalidatePath('/companies');
}
