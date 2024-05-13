'use server';

import {prisma} from '@/lib/prisma'
import { revalidatePath } from 'next/cache';

export async function deleteItem(id: string | undefined) {
  try {
    await prisma.item.update({ where: { id }, data: { deletedAt: new Date() } });
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Item.' };
  }
  revalidatePath('/items');
}
