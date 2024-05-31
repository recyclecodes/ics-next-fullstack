'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function rejectTransfer(id: string | undefined, remarks: string | undefined) {
  if (!id) {
    throw new Error('Invalid transfer ID');
  }

  try {
    await prisma.transfer.update({
      where: { id },
      data: { 
        status: 'DECLINED',
        remarks: remarks || '', 
      },
    });
    revalidatePath('/transactions');
    return { message: 'Successfully rejected transaction.' };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Database Error: Failed to Reject Transaction.');
  }
}
