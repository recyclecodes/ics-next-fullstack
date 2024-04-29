import { prisma } from '@/lib/prisma';

export async function fetchCompanyById(id: string) {
  try {
    const company = await prisma.company.findUnique({
      where: { id: id },
    });

    if (!company) {
      throw new Error('Company not found.');
    }

    return {
      id: company.id,
      name: company.name,
      image: company.image,
      createdAt: company.createdAt,
    };
  } catch (error) {
    console.error('[COMPANY_GET_BY_ID]', error);
    throw new Error('Failed to fetch the company by ID.');
  }
}
