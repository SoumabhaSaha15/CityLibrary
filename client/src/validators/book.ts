import { z } from "zod";
import { pageSchema } from "./page";
import { date } from "./date";
import { AuthorSchema } from "./author";
export const BookSchema = z.strictObject({
  book_id: z.coerce.number().positive(),
  book_cover: z.url(),
  authors: z.array(AuthorSchema.pick({ author_name: true, author_id: true })),
  book_genre: z.array(z.string()),
  book_name: z.string().max(64),
  book_description: z.string(),
  book_isbn: z.string().refine(({ length }) => length === 10 || length === 13),
  book_language: z.string().max(32),
  published_on: date,
});
export type Book = z.infer<typeof BookSchema>;
export const BookPaginatedSchema = pageSchema.extend({
  results: z.array(BookSchema).max(10),
});
export type BookPaginated = z.infer<typeof BookPaginatedSchema>;
