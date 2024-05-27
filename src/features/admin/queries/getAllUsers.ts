import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const Input = z.object({}) // No input needed if we're fetching all users

export default resolver.pipe(resolver.zod(Input), resolver.authorize("ADMIN"), async () => {
  return db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      LemonSqueezySubscription: {
        select: {
          id: true,
          subscriptionId: true,
          attributes: true,
        },
      },
    },
  })
})
