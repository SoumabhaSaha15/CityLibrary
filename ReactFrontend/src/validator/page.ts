import { z } from "zod";
export const pageSchema = z.strictObject({
  count: z.number().int().nonnegative(),
  next: z.url().nullable(),
  previous: z.url().nullable(),
});
