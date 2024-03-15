import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"
import { TodoInput } from "src/features/todos /schemas"

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
    return todo
  }
)
