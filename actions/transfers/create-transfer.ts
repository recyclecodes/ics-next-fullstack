"use server";
import * as z from "zod";
import { prisma } from "@/lib/prisma";
import { TransferSchema } from "@/schemas";
import { supabase } from "@/lib/supabase";

export const initiateTransfer = async (
  values: z.infer<typeof TransferSchema>,
) => {
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

    const sanitizedSenderId = senderId ?? "";
    const sanitizedSenderCompanyId = senderCompanyId ?? "";
    const sanitizedAdminId = adminId ?? "";

    if (!Array.isArray(items)) {
      return { errors: "Items must be an array" };
    }

    const createdTransfer = await prisma.transfer.create({
      data: {
        senderId: sanitizedSenderId,
        recipientId,
        senderCompanyId: sanitizedSenderCompanyId,
        recipientCompanyId,
        adminId: sanitizedAdminId,
        image,
        status,
        items: {
          connect: items.map((itemId) => ({ id: itemId })),
        },
      },
      include: {
        items: true,
      },
    });

    const createdNotification = await prisma.notification.create({
      data: {
        title: "Transfer Initiated",
        body: `A transfer has been initiated`,
        userId: sanitizedAdminId,
        notificationType: "transfer",
      },
    });

    await supabase.from("notifications").insert({
      title: createdNotification.title,
      body: createdNotification.body,
      userId: createdNotification.userId,
      notificationType: createdNotification.notificationType,
    });

    console.log("Transfer created successfully:", createdTransfer);

    return {
      success: "Transfer created successfully",
      transfer: createdTransfer,
      notification: createdNotification,
    };
  } catch (error) {
    console.error("Error creating transfer:", error);
    return { errors: "Database Error: Failed to create transfer" };
  }
};
