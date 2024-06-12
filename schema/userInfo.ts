import { z } from "zod";

export const userInfoSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters long" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long" }),
  role: z.string().min(4).optional(),
  avatar: z.any().optional(),
});

export type RegisterUser = z.infer<typeof userInfoSchema>;
