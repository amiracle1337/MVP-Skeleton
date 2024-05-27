import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Role } from "types"

export default resolver.pipe(resolver.authorize(), async (_, ctx) => {
  const userId = ctx.session.$publicData.impersonatingFromUserId
  if (!userId) {
    console.log("Not impersonating anyone")
    return
  }

  const user = await db.user.findFirst({
    where: { id: userId },
  })
  if (!user) throw new Error("Could not find user id " + userId)

  await ctx.session.$create({
    userId: user.id,
    role: user.role as Role,

    impersonatingFromUserId: undefined,
  })

  return user
})
