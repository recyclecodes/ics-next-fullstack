'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function rejectTransfer(id: string | undefined) {
  try {
    await prisma.transfer.update({
      where: { id },
      data: { status: 'REJECTED' },
    });
  } catch (error) {
    return { message: 'Database Error: Failed to Reject Transaction.' };
  }
  revalidatePath('/transactions');
}
