import { User } from '@/lib/definitions';
import { prisma } from '@/lib/prisma';

export async function fetchUsers(): Promise<User[]> {
  try {
    const users = await prisma.user.findMany({
      where: {
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        image: true,
        email: true,
        role: true,
        emailVerified: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
    return users;
    
  } catch (error) {
    throw new Error('[FETCH_USER]>Failed to fetch users');
  }
}
