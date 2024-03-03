import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"

const Input = z.object({
  todoTitle: z.string(),
})

export default resolver.pipe(
  resolver.zod(Input),
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
