import { buffer } from "micro"
import { random } from "lodash"
import db, { ApiTokenPermission } from "db"
import { ZodType } from "zod"
import { asHandler, endpoint } from "next-better-api"
import { PromiseReturnType } from "blitz"
import { RouteContext } from "next-better-api/build/src/context"
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"

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
  permission: ApiTokenPermission,
  callback: (a: { query: T } & AuthContextType) => any
) => {
  return asHandler(
    [
      endpoint(
        {
          method: "get",
          context: (baseContext) => {
            return authContext(baseContext, permission)
          },
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
          context: (baseContext) => {
            return authContext(baseContext, permission)
          },
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
export const getUserFromToken = async (apiToken: string, permission: ApiTokenPermission) => {
  console.log("Checking user with token:", apiToken, "and permission:", permission)
  const user = await db.user.findFirst({
    where: {
      ApiToken: {
        some: {
          token: apiToken,
          permission: {
            hasSome: permission,
          }, // Ensure permission is checked
        },
      },
    },
  })
  console.log("User found:", user)
  return user
}

// Function to create a successful API response
export const ApiResult = (body) => ({
  status: 200,
  body,
})

// Function to wait for a random time between 500 and 3000 milliseconds
export const waitRandomTime = () => new Promise((resolve) => setTimeout(resolve, random(500, 3000)))

// Function to set up authentication context
export let authContext = async (
  routeContext: RouteContext,
  requiredPermission: ApiTokenPermission
) => {
  let authorizationToken = routeContext.req.headers["authorization"]
  const permission = requiredPermission

  const user = authorizationToken
    ? await getUserFromToken(authorizationToken as string, permission)
    : null

  return {
    user,
  }
}

type AuthContextType = PromiseReturnType<typeof authContext>

export const withCORS =
  (innerHandler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    // Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*") // Change this to restrict origins
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")

    // If it's a preflight (OPTIONS) request, respond with 200
    if (req.method === "OPTIONS") {
      return res.status(200).end()
    }

    // Otherwise, proceed with the request
    return innerHandler(req, res)
  }
