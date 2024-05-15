'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const acceptTransfer = async (transferId: string) => {
  try {
    const transfer = await prisma.transfer.findUnique({
      where: { id: transferId },
      include: { items: true },
    });

    if (!transfer) {
      throw new Error('Transfer not found');
    }

    if (transfer.status !== 'APPROVED') {
      throw new Error('Transfer is not pending');
    }

    const updateItemOwners = transfer.items.map((item) =>
      prisma.item.update({
        where: { id: item.id },
        data: { userId: transfer.recipientId },
      })
    );

    await prisma.$transaction([
      ...updateItemOwners,
      prisma.transfer.update({
        where: { id: transferId },
        data: { status: 'ACCEPTED' },
      }),
    ]);

    revalidatePath('/transactions');
    return { success: true }; // Return success result
  } catch (error) {
    console.error('Error accepting transfer:', error);
    return { error: (error as Error).message };
  }
};
