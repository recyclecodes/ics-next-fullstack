'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function approveTransfer(id: string | undefined) {
  try {
    await prisma.transfer.update({
      where: { id },
      data: { status: 'APPROVED' },
    });
  } catch (error) {
    return { message: 'Database Error: Failed to Approve Transaction.' };
  }
  revalidatePath('/transactions');
}
