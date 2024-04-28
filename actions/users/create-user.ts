'use server';

import { z } from 'zod';
import { UserSchema } from '@/schemas';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';
import { generateVerificationTokenWithPassword } from '@/lib/tokens';
import { sendVerificationEmailWithPassword } from '@/lib/mail';

const generateDefaultPassword = () => {
  return Math.random().toString(36).slice(-8);
};

export const createUser = async (values: z.infer<typeof UserSchema>) => {
  const validatedFields = UserSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  let { companyId, email, password, name, image, role } = validatedFields.data;

  if (!password) {
    password = generateDefaultPassword();
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingCompany = await prisma.company.findUnique({
    where: {
      id: companyId,
    },
  });

  if (!existingCompany) {
    return { error: 'Company not found' };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (existingUser) {
    return { error: 'Email is already in use' };
  }

  await prisma.user.create({
    data: {
      companyId,
      email,
      password: hashedPassword,
      name,
      image,
      role,
    },
  });

  const verificationToken = await generateVerificationTokenWithPassword(
    email,
    password
  );
  await sendVerificationEmailWithPassword(
    verificationToken.email,
    password || '',
    verificationToken.token
  );

  return { success: `User credentials sent to ${email}` };
};
