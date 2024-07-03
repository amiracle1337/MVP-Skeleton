import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

export default resolver.pipe(resolver.authorize(), async (_, { session: { userId } }) => {
  return db.apiToken.findMany({
    where: { userId },
    orderBy: { id: "desc" },
  })
})
