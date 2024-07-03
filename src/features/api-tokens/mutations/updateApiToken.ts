import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateApiTokenSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateApiTokenSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const apiToken = await db.apiToken.update({ where: { id }, data })

    return apiToken
  }
)
