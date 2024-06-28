import { z } from "zod";

export const MAX_FILE_SIZE = 285 * 1024 * 1024; // 2MB

export const userInfoSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "Username must not be empty",
    })
    .max(20, { message: "Username must not exceed 20 characters" }),
  password: z
    .string()
    .min(1, {
      message: "Password must not be empty",
    })
    .max(20, { message: "Username must not exceed 20 characters" }),
  avatar: z.any().optional(),
});

export type RegisterUser = z.infer<typeof userInfoSchema>;
