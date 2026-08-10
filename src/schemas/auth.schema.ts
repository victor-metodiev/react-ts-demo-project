import { z } from "zod";

export const userSchema = z.object({
  id: z.union([z.string(), z.number()]).transform((val) => String(val)),
  email: z.string(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  createdAt: z.string(),
});

export const authResponseSchema = z.object({
  accessToken: z.string(),
  user: userSchema,
});
