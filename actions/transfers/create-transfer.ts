'use server';
import * as z from 'zod';
import { prisma } from '@/lib/prisma';
import { TransferSchema } from '@/schemas';

export const initiateTransfer = async (
    values: z.infer<typeof TransferSchema>
  ) => {
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

    if (!Array.isArray(items)) {
      return { errors: 'Items must be an array' };
    }
  
    try {
     
      const createdTransfer = await prisma.transfer.create({
        data: {
          senderId,
          recipientId,
          senderCompanyId,
          recipientCompanyId,
          adminId,
          image,
          status,

          items: {
            create: items.map((item: any) => ({
             
              name: item.name,
     
            })),
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
  

// export const createCompany = async (values: z.infer<typeof CompanySchema>) => {
//   const validatedFields = CompanySchema.safeParse(values);

//   if (!validatedFields.success) {
//     return { error: 'Invalid fields!' };
//   }
//   const { name, image } = validatedFields.data;

//   const existingCompany = await getCompanyByName(name);

//   if (existingCompany) {
//     return { error: 'Company name already exist' };
//   }

//   await prisma.company.create({
//     data: {
//       name,
//       image,
//     },
//   });

//   return { success: 'Created company successfully' };
// };

// // Function to initiate a transfer
// export async function initiateTransfer(senderId: string, recipientId: string, items: string[], adminId?: string): Promise<string> {
//   try {
//     // Create a new transfer record
//     const transfer = await prisma.transfer.create({
//       data: {
//         senderId,
//         recipientId,
//         items: { connect: items.map(itemId => ({ id: itemId })) },
//         adminId,
//         status: 'PENDING', // Set initial status to PENDING
//       },
//     });
//     return transfer.id; // Return the ID of the newly created transfer
//   } catch (error) {
//     console.error('Error initiating transfer:', error);
//     throw new Error('Failed to initiate transfer.');
//   }
// }

// // Function to approve a transfer
// export async function approveTransfer(transferId: string, adminId: string): Promise<void> {
//   try {
//     // Update the status of the transfer to APPROVED
//     await prisma.transfer.update({
//       where: { id: transferId },
//       data: { status: 'APPROVED', adminId },
//     });
//   } catch (error) {
//     console.error('Error approving transfer:', error);
//     throw new Error('Failed to approve transfer.');
//   }
// }

// // Function to complete a transfer
// export async function completeTransfer(transferId: string): Promise<void> {
//   try {
//     // Update the status of the transfer to COMPLETED
//     await prisma.transfer.update({
//       where: { id: transferId },
//       data: { status: 'COMPLETED' },
//     });
//   } catch (error) {
//     console.error('Error completing transfer:', error);
//     throw new Error('Failed to complete transfer.');
//   }
// }
