import { z } from "zod";
import { pageSchema } from "./page";
export const AuthorSchema = z.strictObject({
  author_id: z.number().int().positive(),
  author_image: z.url(),
  author_description: z.string().min(10).max(1000),
  author_name: z.string().min(2).max(100),
  born_on: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date" }),
  nationality: z.string(),
  gender: z.enum(["m", "f", "t", "unknown"]),
});
export const AuthorPaginatedSchema = pageSchema.extend({
  results: z.array(AuthorSchema).max(10),
});
export type AuthorPaginated = z.infer<typeof AuthorPaginatedSchema>;
export type Author = z.infer<typeof AuthorSchema>;
