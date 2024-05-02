'use server';

import { ItemSchema } from '@/schemas';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const createItem = async (values: z.infer<typeof ItemSchema>) => {
  const validatedFields = ItemSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }
  const { name, image, brand, description, price, quantity, userId } =
    validatedFields.data;


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

  return { success: 'Created item successfully' };
};
