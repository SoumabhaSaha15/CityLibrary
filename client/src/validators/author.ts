import z from "zod";
import { pageSchema, pageQuerySchema } from "./page";
import { date } from "./date";
export const AuthorSchema = z.strictObject({
  author_id: z.number().int().positive(),
  author_image: z.url(),
  author_description: z.string().min(10).max(1000),
  author_name: z.string().min(2).max(100),
  born_on: date,
  nationality: z.string(),
  gender: z.enum(["m", "f", "t", "unknown"]),
});
export const AuthorPaginatedSchema = pageSchema.extend({
  results: z.array(AuthorSchema).max(10),
});
export type AuthorPaginated = z.infer<typeof AuthorPaginatedSchema>;
export type Author = z.infer<typeof AuthorSchema>;
export const AuthorQuerySchema = pageQuerySchema.extend({
  author_name: z.string().optional(),
  nationality: z.string().optional(),
  gender: z.enum(["m", "f", "t", "unknown"]).optional(),
});
export type AuthorQuery = z.infer<typeof AuthorQuerySchema>;
export const AuthorQueryBuilder = z
  .string()
  .transform<AuthorQuery>((str: string) => {
    const query: AuthorQuery = {};
    const arr = str.split("&");
    if (arr.length === 1 && !arr[0].includes("="))
      return { author_name: arr[0] };
    for (const kv of arr) {
      const [key, value] = kv.split("=");
      if (key === "page") query.page = Number(value);
      if (key === "author_name") query.author_name = String(value);
      if (key === "nationality") query.nationality = String(value);
      if (key === "gender")
        query.gender = String(value) as AuthorQuery["gender"];
    }
    return AuthorQuerySchema.parse(query);
  });
