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

export const LendingSchema = z.object({
  userId: z.coerce.number(),
  bookInfoId: z.coerce.number(),
  lendDate: z.date(),
  lendingCondition: z.string(),
  image: z.string(),
  author: z.string(),
  title: z.string(),
  duedate: z.date(),
  overDueDay: z.coerce.number(),
  reservedNum: z.coerce.number(),
});

export const UserSchema = z.object({
  id: z.coerce.number(),
  email: z.string().email(),
  nickname: z.string(),
  intraId: z.coerce.number(),
  slack: z.string().optional(),
  penaltyEndDate: z.date().optional(),
  overDueDay: z.coerce.number(),
  role: z.boolean(),
  reservations: z.array(z.unknown()).optional(), // Assuming reservations is an array of unknown type
  lendings: z.array(LendingSchema).optional(), // Assuming lendings is an array of Lending objects
});

export class UserDto extends createZodDto(UserSchema) {}

export const searchUserSchema = z.object({
  id: z.coerce.number().optional(),
  nicknameOrEmail: z.string().optional(),
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
});

export class SearchUserDto extends createZodDto(searchUserSchema) {}


export const UpdateUserSchema = createUserSchema.omit({ password: true });
export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}
