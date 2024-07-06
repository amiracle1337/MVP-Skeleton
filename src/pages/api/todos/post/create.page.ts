import { z } from "zod"
import { ApiRandomWaitNotFound, ApiResult, createPostRequest } from "../utils"
import { TodoInput } from "src/features/todos /schemas"
import db, { ApiTokenPermission } from "db"

export default createPostRequest(
  TodoInput,
  ApiTokenPermission.CreateAction,
  async ({ body: todo, user }) => {
    if (!user) return ApiRandomWaitNotFound()

    const createdTodo = await db.todo.create({
      data: {
        ...todo,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    })

    return ApiResult(createdTodo)
  }
)
