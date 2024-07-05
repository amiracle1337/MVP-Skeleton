import { z } from "zod"

export const TodoInput = z.object({
  title: z.string(),
})
type todoFormType = z.infer<typeof TodoInput>
