import { z } from "zod";

export const createUserSchema = z.object({
  id: z.number(),
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .regex(/^[\d+\-()\s]+$/, "Invalid phone number format"),
});

export const randomUserSchema = z.object({
  id: z.object({
    name: z.string(),
    value: z.string(),
  }),
  name: z.object({
    title: z.string(),
    first: z.string(),
    last: z.string(),
  }),
  email: z.string().email(),
  gender: z.enum(["male", "female"]),
  picture: z.object({
    large: z.string().url(),
    medium: z.string().url(),
    thumbnail: z.string().url(),
  }),
});

export const User = z.object({
  info: z.object({
    seeds: z.string(),
  }),
  results: z.array(randomUserSchema),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type RandomUserSchema = z.infer<typeof randomUserSchema>;
export type UserSchema = z.infer<typeof User>;
