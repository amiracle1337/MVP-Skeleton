import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateApiTokenSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateApiTokenSchema),
  resolver.authorize(),
  async (input, { session: { userId } }) => {
    const apiToken = await db.apiToken.create({
      data: {
        ...input,
        userId,
      },
    })

    return apiToken
  }
)
