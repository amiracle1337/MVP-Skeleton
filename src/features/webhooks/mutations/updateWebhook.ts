import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateWebhookSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateWebhookSchema),
  resolver.authorize(),
  async ({ id, data }, { session: { userId } }) => {
    const webhook = await db.webhook.updateMany({ where: { userId, id }, data })

    return webhook
  }
)
