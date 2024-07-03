import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateApiTokenSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateApiTokenSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const apiToken = await db.apiToken.create({ data: input })

    return apiToken
  }
)
