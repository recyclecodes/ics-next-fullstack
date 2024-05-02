import { UserRole } from '@prisma/client';
import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required!',
  }),
  password: z.string().min(1, { message: 'Password is required!' }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Email is required!',
  }),
  password: z.string().min(6, { message: 'Minimum 6 characters required' }),
  name: z.string().min(1, { message: 'Name is required' }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: 'Email is required!',
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: 'Minimum 6 characters required!',
  }),
});

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER, UserRole.SUPERADMIN]),
    email: z.optional(z.string()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: 'New password is required',
      path: ['newPassword'],
    }
  );

export const CompanySchema = z.object({
  id: z.optional(z.string()),
  name: z.string().min(1, { message: 'Company name is required' }),
  image: z.string().min(1, { message: 'Company logo is required' }),
});

export type CompanyForm = z.infer<typeof CompanySchema>;

export const UserSchema = z.object({
  id: z.optional(z.string()),
  companyId: z.string().min(1, { message: 'Please select a company' }),
  email: z.string().email({
    message: 'Email is required!',
  }),
  password: z.optional(z.string()),
  name: z.string().min(1, { message: 'Name is required' }),
  image: z.string().min(1, { message: 'User image is required' }),
  role: z.enum([UserRole.ADMIN, UserRole.USER, UserRole.SUPERADMIN]),
});

export type UserForm = z.infer<typeof UserSchema>;

export const ItemSchema = z.object({
  id: z.optional(z.string()),
  name: z.string().min(1, { message: 'Item name is required' }),
  image: z.string().min(1, { message: 'Item image is required' }),
  description: z.string().optional(),
  brand: z.string().min(1, { message: 'Item brand is required' }),
  price: z.number().positive('Price must be positive'),
    // .string()
    // .transform((val) => val.trim())
    // .refine((val) => /^\d+(\.\d+)?$/.test(val), {
    //   message: 'Price must be a valid number',
    // })
    // .transform((val) => parseFloat(val))
    // .optional(),
  quantity: z.number().positive('Quantity must be positive'),
    // .string()
    // .transform((val) => val.trim())
    // .refine((val) => /^\d+(\.\d+)?$/.test(val), {
    //   message: 'Price must be a valid number',
    // })
    // .transform((val) => parseFloat(val))
    // .optional(),
  userId: z.optional(z.string()),
});
