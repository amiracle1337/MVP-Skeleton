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

export let ForgotPAsswordInput = z.object({
  email,
})

export type ForgotPasswordInputType = z.infer<typeof ForgotPAsswordInput>

export const resetPasswordInput = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  })

export type resetPasswordInputType = z.infer<typeof resetPasswordInput>
