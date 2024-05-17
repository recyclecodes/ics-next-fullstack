import { unstable_noStore as noStore } from 'next/cache';
import { prisma } from '@/lib/prisma';

const TRANSFERS_PER_PAGE = 10;

export async function fetchTransfersByAdminId(
  query: string,
  currentPage: number,
  userId: string
) {
  noStore();
  const offset = (currentPage - 1) * TRANSFERS_PER_PAGE;

  try {
    const transfers = await prisma.transfer.findMany({
      where: {
        adminId: userId,
        OR: [{ items: { some: { name: { contains: query, mode:'insensitive' } } } }],
      },
      orderBy: { createdAt: 'desc' },
      take: TRANSFERS_PER_PAGE,
      skip: offset,
      include: {
        sender: true,
        recipient: true,
        senderCompany: true,
        recipientCompany: true,
        items: true,
      },
    });

    return transfers;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('[FETCH_TRANSFERS_BY_ADMIN_ID]>Failed to fetch transfers.');
  }
}

export async function fetchTransfersBySenderId(
  query: string,
  currentPage: number,
  userId: string
) {
  noStore();
  const offset = (currentPage - 1) * TRANSFERS_PER_PAGE;

  try {
    const transfers = await prisma.transfer.findMany({
      where: {
        senderId: userId,
        OR: [{ items: { some: { name: { contains: query } } } }],
      },
      orderBy: { createdAt: 'desc' },
      take: TRANSFERS_PER_PAGE,
      skip: offset,
      include: {
        sender: true,
        recipient: true,
        senderCompany: true,
        recipientCompany: true,
        items: true,
      },
    });

    return transfers;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('[FETCH_TRANSFERS_BY_SENDER_ID]>Failed to fetch transfers.');
  }
}

export async function fetchTransfersByRecipientId(
  query: string,
  currentPage: number,
  userId: string
) {
  noStore();
  const offset = (currentPage - 1) * TRANSFERS_PER_PAGE;

  try {
    const transfers = await prisma.transfer.findMany({
      where: {
        recipientId: userId,
        OR: [{ items: { some: { name: { contains: query } } } }],
      },
      orderBy: { createdAt: 'desc' },
      take: TRANSFERS_PER_PAGE,
      skip: offset,
      include: {
        sender: true,
        recipient: true,
        senderCompany: true,
        recipientCompany: true,
        items: true,
      },
    });

    return transfers;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('[FETCH_TRANSFERS_BY_RECIPIENT_ID]>Failed to fetch transfers.');
  }
}