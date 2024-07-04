import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

export default resolver.pipe(resolver.authorize(), async (_, { session: { userId } }) => {
  try {
    return await db.apiToken.findMany({
      where: { userId },
      orderBy: { id: "desc" },
    })
  } catch (error) {
    console.error("Error fetching API tokens:", error)
    throw new Error("Failed to fetch API tokens")
  }
})
