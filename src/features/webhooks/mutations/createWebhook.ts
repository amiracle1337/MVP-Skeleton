import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateWebhookSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateWebhookSchema),
  resolver.authorize(),
  async (input, { session: { userId } }) => {
    const webhook = await db.webhook.create({ data: input })

    return webhook
  }
)
