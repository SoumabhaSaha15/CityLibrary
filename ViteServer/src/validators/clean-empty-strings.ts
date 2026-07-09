import z from "zod";

export const cleanEmptyString = <T extends z.ZodObject<any>>(schema: T) => {
  return schema.transform((v) => {
    return Object.fromEntries(
      Object.entries(v).filter(([_, value]) => value !== ""),
    ) as z.infer<T>; // Casts the return object back to your strict type
  });
};
