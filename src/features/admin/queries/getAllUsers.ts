import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const Input = z.object({
  usersPerPage: z.number(),
  activePage: z.number(),
  search: z.string().optional(),
})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize("ADMIN"),
  async ({ usersPerPage, activePage, search }) => {
    return db.user.findMany({
      where: {
        role: "USER",
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            username: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
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
