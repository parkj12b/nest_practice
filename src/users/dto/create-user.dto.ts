import { z } from 'zod';

// Define schema for creating a user
export const createUserSchema = z.object({
  name: z.string().min(1, 'Name must be at least 1 character long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

// Type for TypeScript type inference
export type CreateUserDto = z.infer<typeof createUserSchema>;