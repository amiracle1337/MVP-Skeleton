import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

export default resolver.pipe(resolver.authorize(), async ({}, { session: { userId } }) => {
  const inviteGiftCodes = await db.inviteGiftCode.findMany({
    where: { userId },
    include: {
      sentInvites: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  })

  if (!inviteGiftCodes) throw new NotFoundError()

  return inviteGiftCodes
})
