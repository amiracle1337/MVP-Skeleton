import { resolver } from "@blitzjs/rpc"
import { z } from "zod"

const Input = z.object({
  search: z.string().optional(),
})

export default resolver.pipe(resolver.zod(Input), resolver.authorize(), async ({ search }) => {
  const todos = [
    { title: "Todo 1" },
    { title: "Todo 2" },
    { title: "Todo 3" },
    { title: "aha gyan3" },
  ]
  return todos
})
