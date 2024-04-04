import * as z from "zod"
import { name } from "../auth/schemas"

export const UpdateProfileInput = z.object({
  name: name,
  username: z.string().optional(),
  bio: z.string().optional(),
  avatarImageKey: z.string().optional(),
})

export type UpdateProfileInputType = z.infer<typeof UpdateProfileInput>
