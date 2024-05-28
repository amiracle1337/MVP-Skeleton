import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const Input = z.object({
  // This accepts type of undefined, but is required at runtime
  usersPerPage: z.number(),
  activePage: z.number(),
  search: z.string().optional(),
})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize("ADMIN"),
  async ({ usersPerPage, activePage, search }) => {
    const signupInvites = await db.signupInvite.findMany({
      where: {
        email: {
          contains: search,
          mode: "insensitive",
        },
      },
      take: usersPerPage,
      skip: usersPerPage * (activePage - 1),
    })

    return signupInvites
  }
)
