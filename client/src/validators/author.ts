import z from "zod";
import { date } from "./date";
import { pageSchema, pageQuerySchema } from "./page";
import { cleanEmptyString } from "./clean-empty-strings";

export const AuthorSchema = z.strictObject({
  author_id: z.number().int().positive(),
  author_image: z.url(),
  author_description: z.string().min(10).max(1000),
  author_name: z.string().min(2).max(100),
  born_on: date,
  nationality: z.string(),
  gender: z.enum(["m", "f", "t", "unknown"]),
});
export const PartialAuthorSchema = AuthorSchema.pick({
  author_id: true,
  author_image: true,
  author_name: true,
  nationality: true,
});
export const AuthorPaginatedSchema = pageSchema.extend({
  results: z.array(PartialAuthorSchema).max(10),
});
export type AuthorPaginated = z.infer<typeof AuthorPaginatedSchema>;
export type Author = z.infer<typeof AuthorSchema>;
export type PartialAuthor = z.infer<typeof PartialAuthorSchema>;

export const AuthorQuerySchema = pageQuerySchema.extend({
  author_name: z.string().optional(),
  nationality: z.string().optional(),
  gender: z.enum(["m", "f", "t", "unknown", ""]).optional(),
});
cleanEmptyString;
export const filter = cleanEmptyString(AuthorQuerySchema);
// .transform((v) => {
//   const object: any = {};
//   Object.entries(v).forEach((i) => {
//     if (i[1] !== "") object[i[0]] = i[1];
//   });
//   return object;
// });
export type AuthorQuery = z.infer<typeof AuthorQuerySchema>;
// export const AuthorQueryBuilder = z
//   .string()
//   .transform<AuthorQuery>((str: string) => {
//     const query: AuthorQuery = {};
//     const arr = str.split("&");
//     if (arr.length === 1 && !arr[0].includes("="))
//       return { author_name: arr[0] };
//     for (const kv of arr) {
//       const [key, value] = kv.split("=");
//       if (key === "page") query.page = Number(value);
//       if (key === "author_name") query.author_name = String(value);
//       if (key === "nationality") query.nationality = String(value);
//       if (key === "gender")
//         query.gender = String(value) as AuthorQuery["gender"];
//     }
//     return AuthorQuerySchema.parse(query);
//   });
