import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"

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
