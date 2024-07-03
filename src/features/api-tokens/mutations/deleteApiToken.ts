import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteApiTokenSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteApiTokenSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const apiToken = await db.apiToken.deleteMany({ where: { id } })

    return apiToken
  }
)
