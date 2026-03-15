import { email, z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(3, "Name should be atleast 3 characters"),
  password: z.string().min(6, "Passoword should be atleast 6 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["Student", "Teacher"]),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
