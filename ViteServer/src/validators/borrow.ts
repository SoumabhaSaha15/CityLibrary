import z from "zod";
import { pageQuerySchema, pageSchema } from "./page";

export const BorrowSchema = z.strictObject({
  borrow_id: z.uuidv4(),
  requested_book: z.int().positive(),
  book_copy: z.uuidv4().nullable(),
  return_date: z.iso.date(),
  requested_at: z.iso.date(),
  approved_at: z.iso.date().nullable(),
  returned_at: z.iso.date().nullable(),
  return_condition: z.enum(["FAIR", "DAMAGED", "LOST"]).nullable(),
});

export const PartialBorrowSchema = BorrowSchema.pick({
  borrow_id: true,
  book_copy: true,
  returned_at: true,
});

export const BorrowResponseSchema = BorrowSchema.pick({
  borrow_id: true,
});

export const RequestBorrowSchema = BorrowSchema.pick({
  requested_book: true,
  return_date: true,
});

export const BorrowPaginatedSchema = pageSchema.extend({
  results: z.array(PartialBorrowSchema).max(10),
});
export const BorrowQuerySchema = pageQuerySchema.extend({});

export type RequestBorrow = z.infer<typeof RequestBorrowSchema>;

export type BorrowPaginated = z.infer<typeof BorrowPaginatedSchema>;

export type Borrow = z.infer<typeof BorrowSchema>;

export type BorrowResponse = z.infer<typeof BorrowResponseSchema>;
