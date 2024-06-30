import { WebhookType } from "@prisma/client"
import { z } from "zod"

export const CreateWebhookSchema = z.object({
  url: z.string(),
  userId: z.string(),
  type: z.nativeEnum(WebhookType),
})

// Partial means that all fields are optional
export const UpdateWebhookSchema = z.object({
  id: z.string(),
  data: CreateWebhookSchema.partial(),
})

export const DeleteWebhookSchema = z.object({
  id: z.string(),
})
