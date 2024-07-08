import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetApiToken = z.object({
  id: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetApiToken),
  resolver.authorize(),
  async ({ id }, { session: { userId } }) => {
    try {
      const apiToken = await db.apiToken.findFirst({
        where: { token: id, userId },
      })
      console.log("Fetched API Token from DB:", apiToken) // Add this log
      return apiToken
    } catch (error) {
      console.error("Error fetching API token:", error)
      throw new Error("Failed to fetch API token")
    }
  }
)
