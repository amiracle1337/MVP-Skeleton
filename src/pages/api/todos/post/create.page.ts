import { z } from "zod"
import db from "db"
import { NextApiRequest, NextApiResponse } from "next"
import { ApiError, ApiResult } from "src/pages/api/todos/utils"
import { getUserFromToken } from "src/pages/api/todos/utils"

const createTodoSchema = z.object({
  title: z.string(),
})

const createTodo = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json(ApiError("Method Not Allowed", 405))
  }

  const token = req.headers.authorization
  const user = token ? await getUserFromToken(token) : null

  if (!user) {
    return res.status(401).json(ApiError("Unauthorized", 401))
  }

  // Checks if the request body matches the schema. If not, returns an error.
  const result = createTodoSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json(ApiError("Invalid input", 400))
  }

  // Extracts data as todo from the validated result.
  const { data: todo } = result

  // When you use await, the function pauses execution until the awaited promise resolves.
  // In this case, it waits until the db.todo.create operation completes before proceeding.

  try {
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

    return res.status(200).json(ApiResult(createdTodo))
  } catch (error) {
    return res.status(500).json(ApiError("Internal Server Error", 500))
  }
}

export default createTodo
