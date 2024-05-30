import { z } from "zod"

export const CreateInviteGiftCodeSchema = z.object({
  // template: __fieldName__: z.__zodType__(),
})
export const UpdateInviteGiftCodeSchema = CreateInviteGiftCodeSchema.merge(
  z.object({
    id: z.string(),
  })
)

export const DeleteInviteGiftCodeSchema = z.object({
  id: z.string(),
})
