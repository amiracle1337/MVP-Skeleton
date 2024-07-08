import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateApiTokenSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateApiTokenSchema),
  resolver.authorize(),
  async ({ id, data: { name, permission } }, { session: { userId } }) => {
    const apiToken = await db.apiToken.updateMany({
      where: { id, userId },
      data: { name, permission },
    })

    return apiToken
  }
)
