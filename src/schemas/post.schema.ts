import { z } from "zod";

export const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  userId: z.union([z.string(), z.number()]).transform((val) => String(val)),
  authorName: z.string(),
  createdAt: z.string(),
});

export const postsArraySchema = z.array(postSchema);
