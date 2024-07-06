import { z } from "zod"
import { ApiRandomWaitNotFound, ApiResult, createGetRequest } from "../utils"
import db, { ApiTokenPermission } from "db"

let Input = z.object({
  search: z.string().optional(),
})

export default createGetRequest(Input, ApiTokenPermission.ReadAction, async ({ user, query }) => {
  if (!user) return ApiRandomWaitNotFound()

  const { search } = query

  const userId = user.id

  // the search query is optional
  // if it is provided, we will filter the todos by the title containing the search query

  const todos = await db.todo.findMany({
    where: {
      userId,
      ...(search && {
        title: {
          contains: search,
        },
      }),
    },
  })

  return ApiResult(todos)
})
