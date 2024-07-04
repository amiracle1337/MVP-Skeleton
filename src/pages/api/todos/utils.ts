import { NextApiRequest } from "next"
import { buffer } from "micro"
import { random } from "lodash"
import asHandler from "next-better-api"
import withCORS from "~/pages/api/withCors"
import PromiseReturnType from "blitz"
import db from "db"
import { ZodType } from "zod"

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

export const ApiNotFound = (entity?) => ({
  status: 404,
  body: {
    message: entity ? `${entity} not found` : "Not found",
  },
})

export const ApiRandomWaitNotFound = async (entity?) => {
  await waitRandomTime()
  return ApiNotFound(entity)
}

export const createGetRequest = <T>(
  schema: ZodType<T, any, any> | null,
  callback: (a: { query: T } & AuthContextType) => any // Adjusted the type here
) => {
  return asHandler({
    endpoint: {
      method: "get",
      context: authContext,
      ...(schema && {
        // @ts-ignore
        querySchema: schema.strict(),
      }),
    },
    callback,
    decorators: [withCORS],
  })
}

export const createPostRequest = <T>(
  bodySchema: ZodType<T, any, any> | null,
  callback: (a: { body: T } & AuthContextType) => any // Adjusted the type here
) => {
  return asHandler({
    endpoint: {
      method: "post",
      context: authContext,
      ...(bodySchema && {
        // @ts-ignore
        bodySchema: bodySchema.strict(),
      }),
    },
    callback,
    decorators: [withCORS],
  })
}

export const getUserFromToken = async (apiToken: string) => {
  return db.user.findFirst({
    where: {
      apiToken,
    },
  })
}

export const ApiResult = (body) => ({
  status: 200,
  body,
})

export const waitRandomTime = () => new Promise((resolve) => setTimeout(resolve, random(500, 3000)))

export let authContext = async (baseContext) => {
  let authorizationToken = baseContext.req.headers["authorization"]
  const user = authorizationToken ? await getUserFromToken(authorizationToken as string) : null
  return {
    user,
  }
}

type AuthContextType = PromiseReturnType<typeof authContext>
