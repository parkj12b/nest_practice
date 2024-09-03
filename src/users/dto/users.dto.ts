import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';

// Define schema for creating a user
export const createUserSchema = z.object({
  name: z
    .string()
    .min(1, 'Name must be at least 1 character long')
    .describe('Name of the user'),
  email: z
    .string()
    .email('Invalid email address')
    .describe('Email of the user'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .describe('Password of the user'),
});
export class CreateUserDto extends createZodDto(createUserSchema) {}

export const ResponseUserSchama = createUserSchema
  .extend({ id: z.number().describe('Id of the user') })
  .omit({ password: true })
  .transform((data) => ({
    id: data.id,
    name: data.name,
    email: data.email,
  }));
export class ResponseUserDto extends createZodDto(ResponseUserSchama) {}

export const UpdateUserSchema = createUserSchema.omit({ password: true });
export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}
