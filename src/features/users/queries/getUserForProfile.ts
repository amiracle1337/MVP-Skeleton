import { resolver } from "@blitzjs/rpc"
import { NotFoundError } from "@prisma/client/runtime"
import db from "db"
import { z } from "zod"

const Input = z.object({
  username: z.string(),
})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ username }, { session: { userId } }) => {
    let user = await db.user.findUnique({
      where: { username },
      select: { id: true, name: true, username: true, bio: true },
    })

    if (!user) {
      throw new NotFoundError("user not found")
    }

    return user
  }
)
