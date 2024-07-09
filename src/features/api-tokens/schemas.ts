import { z } from "zod"
import { ApiTokenPermission } from "@prisma/client"

export const CreateApiTokenSchema = z.object({
  name: z.string(),
  permission: z.array(z.nativeEnum(ApiTokenPermission)),
})

export const UpdateApiTokenSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  permission: z.array(z.nativeEnum(ApiTokenPermission)).optional(),
})

export const DeleteApiTokenSchema = z.object({
  id: z.string(),
})
