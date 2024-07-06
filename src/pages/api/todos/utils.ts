import { NextApiRequest } from "next"
import { buffer } from "micro"
import { random } from "lodash"
import db, { ApiTokenPermission } from "db"
import { ZodType } from "zod"
import { asHandler, endpoint } from "next-better-api"
import { withCORS } from "./withCors"
import { PromiseReturnType } from "blitz"
import { RouteContext } from "next-better-api/build/src/context"

// Function to get raw body from request
export const getRawBody = async (req: NextApiRequest) => {
  const buf = await buffer(req)
  return buf.toString("utf-8")
}

// Function to create an API error response
export const ApiError = (message = "An error occurred", status = 400) => ({
  status,
  body: {
    error: {
      message,
    },
  },
})

// Function to create a 404 Not Found response
export const ApiNotFound = (entity?) => ({
  status: 404,
  body: {
    message: entity ? `${entity} not found` : "Not found",
  },
})

// Function to create a 404 Not Found response with a random wait
export const ApiRandomWaitNotFound = async (entity?) => {
  await waitRandomTime()
  return ApiNotFound(entity)
}

// Function to create a GET request handler
export const createGetRequest = <T>(
  schema: ZodType<T, any, any> | null,
  callback: (a: { query: T } & AuthContextType) => any
) => {
  return asHandler(
    [
      endpoint(
        {
          method: "get",
          context: authContext,
          ...(schema && {
            // @ts-ignore

            querySchema: schema.strict(),
          }),
        },
        callback
      ),
    ],
    {
      decorators: [withCORS],
    }
  )
}

// Function to create a POST request handler
export const createPostRequest = <T>(
  bodySchema: ZodType<T, any, any> | null,
  permission: ApiTokenPermission,

  callback: (a: { body: T } & AuthContextType) => any
) => {
  return asHandler(
    [
      endpoint(
        {
          method: "post",
          context: authContext,
          ...(bodySchema && {
            // @ts-ignore

            bodySchema: bodySchema.strict(),
          }),
        },
        callback
      ),
    ],
    {
      decorators: [withCORS],
    }
  )
}

// Function to get user from API token
export const getUserFromToken = async (apiToken: string, permission) => {
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

// Function to create a successful API response
export const ApiResult = (body) => ({
  status: 200,
  body,
})

// Function to wait for a random time between 500 and 3000 milliseconds
export const waitRandomTime = () => new Promise((resolve) => setTimeout(resolve, random(500, 3000)))

// Function to set up authentication context
export let authContext = async (routeContext: RouteContext) => {
  let authorizationToken = routeContext.req.headers["authorization"]
  const permission = routeContext.req.headers["x-permission"] as ApiTokenPermission // Example of extracting permission from headers
  const user = authorizationToken
    ? await getUserFromToken(authorizationToken as string, permission as string)
    : null
  return {
    user,
  }
}

type AuthContextType = PromiseReturnType<typeof authContext>
