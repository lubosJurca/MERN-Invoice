import { z } from 'zod';

export const createInvoiceFormSchema = z.object({
  createdAt: z.preprocess((value) => {
    if (typeof value === 'string') {
      return new Date(value);
    }
    return value;
  }, z.date()),
  description: z.string().min(1, { message: 'Required' }),
  paymentTerms: z.number().min(1, { message: 'Required' }),
  clientName: z.string().min(1, { message: 'Required' }),
  clientEmail: z.string().email({
    message: 'Must be a valid email',
  }),
  status: z.enum(['paid', 'pending', 'draft']),
  senderAddress: z.object({
    street: z.string().min(1, { message: 'Required' }),
    city: z.string().min(1, { message: 'Required' }),
    postCode: z.string().min(1, { message: 'Required' }),
    country: z.string().min(1, { message: 'Required' }),
  }),
  clientAddress: z.object({
    street: z.string().min(1, { message: 'Required' }),
    city: z.string().min(1, { message: 'Required' }),
    postCode: z.string().min(1, { message: 'Required' }),
    country: z.string().min(1, { message: 'Required' }),
  }),
});

export const registerUserFormSchema = z
  .object({
    name: z.string().min(2).max(50),
    email: z.string().email({ message: 'Must be a valid email' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(50),
    confirmPassword: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(50),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(50),
});
