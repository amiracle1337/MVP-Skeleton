import { getClientIp } from "request-ip"
import { isDev } from "src/config"
import { env } from "src/env.mjs"

export const geolocationMiddleware = async (req, res, next) => {
  const clientIp = isDev ? env.LOCAL_IP_ADDRESSES : getClientIp(req)
  console.log("Setting IP Address in context:", clientIp) // Add a log for debugging
  res.blitzCtx.ipAddresses = clientIp
  await next()
}
