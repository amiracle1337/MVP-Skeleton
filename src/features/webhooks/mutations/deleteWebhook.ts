import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteWebhookSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteWebhookSchema),
  resolver.authorize(),
  async ({ id }, { session: { userId } }) => {
    const webhook = await db.webhook.deleteMany({ where: { id, userId } })

    return webhook
  }
)
