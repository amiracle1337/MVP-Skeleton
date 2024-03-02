import { resolver } from "@blitzjs/rpc"
import { z } from "zod"

const Input = z.object({
  todoTitle: z.string().optional(),
})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async (params, { session: { userId } }) => {
    const { todoTitle } = params

    console.log(todoTitle)

    return "Todo added"
  }
)
