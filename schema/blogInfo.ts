import { z } from "zod";

const typeBlogOptions = ["Company", "Team", "Project"] as const;

type BlogOption = (typeof typeBlogOptions)[number];

export const mappedTypeBlogOptions: { [key in BlogOption]: string } = {
  Company: "Company",
  Team: "Team",
  Project: "Project",
};

export const blogInfoSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string(),
  type: z.enum(typeBlogOptions, {
    errorMap: () => ({ message: "Type is required" }),
  }),
  topic: z.string().optional(),
});
