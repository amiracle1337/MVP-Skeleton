import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateApiTokenSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateApiTokenSchema),
  resolver.authorize(),
  async ({ id, name, permission }, { session: { userId } }) => {
    // Update records where both conditions are met
    const result = await db.apiToken.updateMany({
      where: { token: id, userId },
      data: {
        name,
        permission,
      },
    })

    return result
  }
)
