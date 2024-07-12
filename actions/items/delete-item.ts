'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';

export async function deleteItem(id: string | undefined) {
  try {
    const item = await prisma.item.findUnique({ where: { id } });

    if (!item) {
      return { message: 'Item not found.' };
    }

    if (item.userId !== null) {
      await prisma.item.update({ where: { id }, data: { deletedAt: new Date() } });

      const deleteItemNotification = await prisma.notification.create({
        data: {
          title: 'Item Deleted',
          body: `${item.name} has been deleted.`,
          userId: item.userId,
        },
      });

      await supabase.from('notifications').insert({
        title: deleteItemNotification.title,
        body: deleteItemNotification.body,
        userId: deleteItemNotification.userId,
      });

      revalidatePath('/items');

      return {
        success: 'Deleted item successfully',
        notification: deleteItemNotification,
      };
    } else {
      return { message: 'Invalid user ID.' };
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    return { message: 'Database Error: Failed to Delete Item.' };
  }
}
