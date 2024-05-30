import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const Input = z.object({})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize("ADMIN"),
  async ({}, { session: {} }) => {
    const usersWithoutGiftCodes = await db.user.findMany({
      where: {
        // One or more conditions must return true with OR

        OR: [
          {
            giftCodes: {
              none: {},
            },
          },
          {
            giftCodes: {
              every: {
                redeemed: true,
              },
            },
          },
        ],
      },
    })

    for (const user of usersWithoutGiftCodes) {
      await db.inviteGiftCode.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      })
    }
  }
)
