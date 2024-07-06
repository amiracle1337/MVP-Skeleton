import { TodoInput } from "src/features/todos /schemas"
import { ApiRandomWaitNotFound, ApiResult, createPostRequest } from "../utils"
import db, { ApiTokenPermission } from "db"

export default createPostRequest(
  TodoInput, // Body schema
  ApiTokenPermission.CreateAction, // Required permission
  async ({ body: todo, user }) => {
    // Async callback function
    if (!user) return ApiRandomWaitNotFound() // If user is not found, return 404

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

    return ApiResult(createdTodo) // Return the created todo
  }
)
