'use server';

import { ItemSchema } from '@/schemas';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';

export const createItem = async (values: z.infer<typeof ItemSchema>) => {
  const validatedFields = ItemSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }
  const { name, image, brand, description, price, quantity, userId } =
    validatedFields.data;

  if (!userId) {
    return { error: 'User ID is missing!' };
  }

  await prisma.item.create({
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

  const createdNotification = await prisma.notification.create({
    data: {
      title: 'New Item Created',
      body: `${name} has been added.`,
      userId,
    },
  });

  await supabase.from('notifications').insert({
    title: createdNotification.title,
    body: createdNotification.body,
    userId: createdNotification.userId,
  });

  return {
    success: 'Created item successfully',
    notification: createdNotification,
  };
};
