'use server'

import { ItemSchema } from '@/schemas';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';

export const createItem = async (values: z.infer<typeof ItemSchema>) => {
  try {
    const validatedFields = ItemSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: 'Invalid fields!' };
    }

    const { name, image, brand, description, price, quantity, userId } =
      validatedFields.data;

    if (!userId) {
      return { error: 'User ID is missing!' };
    }

    const createdItem = await prisma.item.create({
      data: {
        name,
        image,
        brand,
        description,
        price,
        quantity,
        userId,
      },
    });

    const createdItemNotification = await prisma.notification.create({
      data: {
        title: 'New Item Created',
        body: `${name} has been added.`,
        userId,
        notificationType: 'item', 
      },
    });

    await supabase.from('notifications').insert({
      title: createdItemNotification.title,
      body: createdItemNotification.body,
      userId: createdItemNotification.userId,
      notificationType: createdItemNotification.notificationType, 
    });

    return {
      success: 'Created item successfully',
      item: createdItem,
      notification: createdItemNotification,
    };
  } catch (error) {
    console.error('Error creating item:', error);
    return { error: 'An error occurred while creating the item.' };
  }
};
