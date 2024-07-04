import { z } from "zod"
import { name } from "../auth/schemas"
import { ApiTokenPermission } from "@prisma/client"

export const CreateApiTokenSchema = z.object({
  name: z.string(),
  permissions: z.array(z.nativeEnum(ApiTokenPermission)),
  // the field can be either a string, null, or undefined.
  token: z.string(),
})
export const UpdateApiTokenSchema = CreateApiTokenSchema.merge(
  z.object({
    id: z.string(),
    data: CreateApiTokenSchema.partial(),
  })
)

export const DeleteApiTokenSchema = z.object({
  id: z.string(),
})
