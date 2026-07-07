import z from "zod";
export const cleanEmptyString = (schema: z.ZodObject<any>) => {
  return schema.transform((v) => {
    const object: any = {};
    Object.entries(v).forEach((i) => {
      if (i[1] !== "") object[i[0]] = i[1];
    });
    return object;
  });
};
