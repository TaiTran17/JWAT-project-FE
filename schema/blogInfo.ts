import { z } from "zod";

const typeBlogOptions = ["company", "team", "project"] as const;

type BlogOption = (typeof typeBlogOptions)[number];

export const mappedTypeBlogOptions: { [key in BlogOption]: string } = {
  company: "Company",
  team: "Team",
  project: "Project",
};

export const blogInfoSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string(),
  type: z.enum(typeBlogOptions, {
    errorMap: () => ({ message: "Type is required" }),
  }),
  topic: z.string().optional(),
});

export const captionSchema = z.object({
  caption: z.string().min(1, { message: "Caption is required" }),
});