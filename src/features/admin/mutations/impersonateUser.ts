// src/auth/mutations/impersonateUser.ts
import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"
import { Role } from "types"

export const ImpersonateUserInput = z.object({
  userId: z.string(),
})

export default resolver.pipe(
  resolver.zod(ImpersonateUserInput),
  resolver.authorize(),
  async ({ userId }, ctx) => {
    const user = await db.user.findFirst({ where: { id: userId } })
    if (!user) throw new Error("Could not find user id " + userId)

    await ctx.session.$create({
      userId: user.id,
      role: user.role as Role,
      impersonatingFromUserId: ctx.session.userId,
    })

    return user
  }
)
