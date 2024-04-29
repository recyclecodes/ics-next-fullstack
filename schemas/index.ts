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

export const CompanySchema = z.object({
  id: z.optional(z.string()),
  name: z.string().min(1, { message: 'Company name is required' }),
  image: z.string().min(1, { message: 'Company logo is required' }),
});

export type CompanyForm = z.infer<typeof CompanySchema>;

export const UserSchema =  z.object({
  companyId: z.string().min(1, {message: 'Please select a company'}),
  email: z.string().email({
    message: 'Email is required!',
  }),
  password: z.optional(z.string()),
  name: z.string().min(1, { message: 'Name is required' }),
  image: z.string().min(1, {message: 'User image is required'}),
  role: z.enum(['ADMIN', 'USER']),
})
