import { z } from "zod"
import db from "db"
import { NextApiRequest, NextApiResponse } from "next"
import { getUserFromToken } from "../utils"
import { withCORS } from "../withCors"

const createTodoSchema = z.object({
  title: z.string(),
})

const createTodo = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      status: 405,
      body: {
        error: {
          message: "Method Not Allowed",
        },
      },
    })
  }

  const token = req.headers.authorization
  const user = token ? await getUserFromToken(token) : null

  if (!user) {
    return res.status(401).json({
      status: 401,
      body: {
        error: {
          message: "Unauthorized",
        },
      },
    })
  }

  const result = createTodoSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({
      status: 400,
      body: {
        error: {
          message: "Invalid input",
        },
      },
    })
  }

  const { data: todo } = result

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

    return res.status(200).json({
      status: 200,
      body: createdTodo,
    })
  } catch (error) {
    return res.status(500).json({
      status: 500,
      body: {
        error: {
          message: "Internal Server Error",
        },
      },
    })
  }
}

export default withCORS(createTodo)
