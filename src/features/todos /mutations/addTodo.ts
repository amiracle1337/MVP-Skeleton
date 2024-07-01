import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db, { WebhookType } from "db"
import { TodoInput } from "src/features/todos /schemas"
import { processWebhooks } from "src/features/webhooks/utils"

export default resolver.pipe(
  resolver.zod(TodoInput),
  resolver.authorize(),
  async (params, { session: { userId } }) => {
    const { todoTitle } = params

    const todo = await db.todo.create({
      data: {
        title: todoTitle,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })

    try {
      await processWebhooks({
        webhook: WebhookType.ActionCreated,
        data: todo,
      })
    } catch (error) {
      console.error("Error processing webhooks:", error)
    }

    return todo
  }
)
