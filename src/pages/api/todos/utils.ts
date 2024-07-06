import { NextApiRequest, NextApiResponse } from "next"
import { buffer } from "micro"
import { random } from "lodash"
import db from "db"

export const getRawBody = async (req: NextApiRequest) => {
  const buf = await buffer(req)
  return buf.toString("utf-8")
}

export const ApiError = (message = "An error occurred", status = 400) => ({
  status,
  body: {
    error: {
      message,
    },
  },
})

export const ApiResult = (body) => ({
  status: 200,
  body,
})

export const getUserFromToken = async (apiToken: string) => {
  return db.user.findFirst({
    where: {
      ApiToken: {
        some: {
          token: apiToken,
        },
      },
    },
  })
}

export const waitRandomTime = () => new Promise((resolve) => setTimeout(resolve, random(500, 3000)))
