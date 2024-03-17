import { z } from "zod"

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

export const password = z
  .string()
  .min(8)
  .max(100)
  .transform((str) => str.trim())

export const Login = z.object({
  email,
  password,
})

export const name = z.string().min(2).max(30)

export const SignupInput = z.object({
  email,
  password,
  name: z.string().min(2).max(30),
  terms: z
    .boolean()
    .refine((val) => val === true, { message: "You must agree to the terms and conditions" }),
})

export const LoginInput = z.object({ email, password })
