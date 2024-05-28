import { z } from "zod"

export const CreateSignupInviteSchema = z.object({
  email: z.string().email(),
})
export const UpdateSignupInviteSchema = CreateSignupInviteSchema.merge(
  z.object({
    id: z.string(),
    accepted: z.boolean().optional(),
  })
)

export const DeleteSignupInviteSchema = z.object({
  id: z.string(),
})
