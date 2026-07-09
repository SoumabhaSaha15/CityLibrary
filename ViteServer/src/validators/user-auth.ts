import z from "zod";

const profile = z
  .instanceof(FileList, { error: "Profile image is required" })
  .refine((list) => list.length == 1, "single Profile image is required")
  .refine(
    (list) => list[0].size <= 2 ** 20,
    "Profile image must be less than 1MB",
  );
const username = z
  .string()
  .min(4, "Username must be at least 3 characters long")
  .max(30, "Username must be at most 20 characters long")
  .regex(
    /^[a-zA-Z].+$/,
    "Username can only contain letters, numbers, and underscores",
  );
const email = z.email("Invalid email address");
const password = z
  .string()
  .length(8, "Password must be exactly 8 characters long");
export const signupSchema = z.strictObject({
  profile,
  username,
  email,
  password,
});
export const loginSchema = z.strictObject({
  username,
  password,
});
export const responseSchema = z.strictObject({
  username,
  email,
  profile: z.url().startsWith("http", "Profile must be a valid URL"),
});
export type ResponseSchema = z.infer<typeof responseSchema>;
export type SignupSchema = z.infer<typeof signupSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
