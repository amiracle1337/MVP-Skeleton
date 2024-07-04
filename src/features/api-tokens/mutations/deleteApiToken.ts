import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteApiTokenSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteApiTokenSchema),
  resolver.authorize(),
  async ({ id }, { session: { userId } }) => {
    const apiToken = await db.apiToken.deleteMany({ where: { id, userId } })

    return apiToken
  }
)
