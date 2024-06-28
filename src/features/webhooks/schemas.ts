import { WebhookType } from "@prisma/client"
import { z } from "zod"

export const CreateWebhookSchema = z.object({
  url: z.string(),
  userId: z.string(),
  type: z.nativeEnum(WebhookType),
})
export type Webhook = z.infer<typeof CreateWebhookSchema>
export const UpdateWebhookSchema = CreateWebhookSchema.merge(
  z.object({
    id: z.string(),
  })
)

export const DeleteWebhookSchema = z.object({
  id: z.string(),
})
