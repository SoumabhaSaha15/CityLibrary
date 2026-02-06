import { z } from "zod";
export const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
export const date = z
  .string()
  .regex(DATE_REGEX)
  .refine((date) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return false;
    return parsedDate.toISOString().startsWith(date);
  });
