import { z } from "zod";

export const userInfoSchema = z.object({
  username: z.string().min(1, {
    message: "Username must not be empty",
  }),
  password: z.string().min(1, {
    message: "Password must not be empty",
  }),
  avatar: z.any().optional(),
});

export type RegisterUser = z.infer<typeof userInfoSchema>;
