import { z } from "zod"

export const TodoInput = z.object({
  todoTitle: z.string(),
})
type todoFormType = z.infer<typeof TodoInput>
