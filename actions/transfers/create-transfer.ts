'use server';
import * as z from 'zod';
import { prisma } from '@/lib/prisma';
import { TransferSchema } from '@/schemas';

export const initiateTransfer = async (values: z.infer<typeof TransferSchema>) => {
  try {
    const validatedFields = TransferSchema.safeParse(values);

    if (!validatedFields.success) {
      return { errors: `Invalid fields with error: ${validatedFields.error}` };
    }

    const {
      adminId,
      image,
      senderId,
      recipientId,
      senderCompanyId,
      recipientCompanyId,
      status,
      items,
    } = validatedFields.data;

    // Check if senderId, senderCompanyId, or adminId are undefined, and assign empty strings if they are
    const sanitizedSenderId = senderId ?? '';
    const sanitizedSenderCompanyId = senderCompanyId ?? '';
    const sanitizedAdminId = adminId ?? '';

    if (!Array.isArray(items)) {
      return { errors: 'Items must be an array' };
    }

    // Create a new transfer record
    const createdTransfer = await prisma.transfer.create({
      data: {
        senderId: sanitizedSenderId,
        recipientId,
        senderCompanyId: sanitizedSenderCompanyId,
        recipientCompanyId,
        adminId: sanitizedAdminId,
        image,
        status,
        items: { // Connect existing items
          connect: items.map(itemId => ({ id: itemId })),
        },
      },
      include: {
        items: true,
      },
    });

    console.log('Transfer created successfully:', createdTransfer);

    return { success: 'Transfer created successfully' };
  } catch (error) {
    console.error('Error creating transfer:', error);
    return { errors: 'Database Error: Failed to create transfer' };
  }
};
