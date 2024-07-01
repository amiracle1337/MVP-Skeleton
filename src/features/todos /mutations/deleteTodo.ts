import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { processWebhooks } from "src/features/webhooks/utils"
import { WebhookType } from "@prisma/client"

const Input = z.object({
  id: z.string(),
})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ id }, { session: { userId } }) => {
    const todo = await db.todo.findUnique({
      where: { id },
    })

    if (!todo || todo.userId !== userId) {
      throw new Error("Unauthorized")
    }

    const result = await db.todo.delete({
      where: { id },
    })

    try {
      await processWebhooks({
        webhook: WebhookType.ActionCreated,
        data: result,
      })
    } catch (error) {
      console.error("Error processing webhooks:", error)
    }

    return result
  }
)
