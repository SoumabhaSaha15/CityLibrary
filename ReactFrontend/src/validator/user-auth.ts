import { z } from "zod";
export const signupSchema = z.strictObject({
  profile: z
    .instanceof(FileList, { error: "Profile image is required" })
    .refine((list) => list.length == 1, "single Profile image is required")
    .refine((list) => list[0].size <= 2 ** 20, "Profile image must be less than 1MB"),
  username: z.string()
    .min(4, "Username must be at least 3 characters long")
    .max(30, "Username must be at most 20 characters long")
    .regex(/^[a-zA-Z]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.email("Invalid email address"),
  password: z.string().length(8, "Password must be exactly 8 characters long"),
});
export const loginSchema = signupSchema.pick({
  email: true,
  password: true,
}).extend({
  profile: z.url({ error: "Profile image url is required" }),
});
export type SignupSchema = z.infer<typeof signupSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;