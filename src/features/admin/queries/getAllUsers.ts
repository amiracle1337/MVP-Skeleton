import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const Input = z.object({
  usersPerPage: z.number(),
  activePage: z.number(),
})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize("ADMIN"),
  async ({ usersPerPage, activePage }) => {
    return db.user.findMany({
      take: usersPerPage,
      skip: usersPerPage * (activePage - 1),
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
  }
)
