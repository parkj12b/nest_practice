import { z } from 'zod';

// Define the Zod schema for updating a user
export const updateUserSchema = z.object({
  name: z.string().min(1, 'Name must be at least 1 character long'),
  email: z.string().email('Invalid email address').optional(),
  password: z.string().min(6, 'Password must be at least 6 characters long').optional(),
});

// Type for TypeScript type inference
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
