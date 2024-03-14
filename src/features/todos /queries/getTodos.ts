import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"

const Input = z.object({
  search: z.string().optional(),
})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize("ADMIN"),
  async ({}, { session: { userId } }) => {
    const todos = await db.todo.findMany({
      orderBy: {
        createdAt: "asc",
      },
      where: {
        userId: userId,
      },
      select: {
        id: true,
        title: true,
        done: true,
      },
    })
    return todos
  }
)
