import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const Input = z.object({})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({}, { session: { userId } }) => {
    return db.lemonSqueezySubscription.findMany({
      where: { userId },
      include: {
        variant: {
          select: {
            price: true,
          },
        },
      },
    })
  }
)
