import { z } from "zod"

export const CreateSignupInviteSchema = z.object({
  email: z.string().email(),
})
export const UpdateSignupInviteSchema = CreateSignupInviteSchema.merge(
  z.object({
    id: z.number(),
  })
)

export const DeleteSignupInviteSchema = z.object({
  id: z.number(),
})
