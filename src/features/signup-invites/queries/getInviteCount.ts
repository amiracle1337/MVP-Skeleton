import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const Input = z.object({
  search: z.string().optional(),
})

export default resolver.pipe(resolver.zod(Input), resolver.authorize(), async ({ search }) => {
  return db.signupInvite.count({
    where: {
      email: {
        contains: search,
        mode: "insensitive",
      },
    },
  })
})
