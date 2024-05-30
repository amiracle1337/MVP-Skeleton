import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetInviteGiftCode = z.object({
  id: z.string(),
})

export default resolver.pipe(resolver.zod(GetInviteGiftCode), async ({ id }) => {
  const inviteGiftCode = await db.inviteGiftCode.findFirst({ where: { id } })

  if (!inviteGiftCode) throw new NotFoundError()

  return inviteGiftCode
})
