import { prisma } from '@/lib/prisma';

export async function fetchUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new Error('User not found.');
    }

    return {
      id: user.id,
      companyId: user.companyId || '',
      name: user.name || '',
      email: user.email || '',
      image: user.image || '/fallback/fallback.png',
      role: user.role,
      createdAt: user.createdAt,
    };
  } catch (error) {
    throw new Error('[COMPANY_GET_BY_ID]>Failed to fetch the user by ID.');
  }
}
