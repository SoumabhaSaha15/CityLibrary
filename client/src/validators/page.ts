import { z } from "zod";
export const pageSchema = z.strictObject({
  count: z.number().int().nonnegative(),
  next: z.url().nullable(),
  previous: z.url().nullable(),
});

export const pageQuerySchema = z.strictObject({
  page: z.coerce.number().optional(),
});
export type PageQuery = z.infer<typeof pageQuerySchema>;
