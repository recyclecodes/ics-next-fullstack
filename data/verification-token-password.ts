import { prisma } from '@/lib/prisma';

export const getVerificationTokenByEmailWithPassword = async (email: string) => {
  try {
    const verificationToken = await prisma.verificationTokenWithPassword.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch {
    return null;
  }
};