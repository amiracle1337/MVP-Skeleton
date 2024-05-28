import { getClientIp } from "request-ip"
import { isDev } from "src/config"
import { env } from "src/env.mjs"

export const geolocationMiddleware = async (req, res, next) => {
  const clientIp = isDev ? env.LOCAL_IP_ADDRESS : getClientIp(req)
  res.blitzCtx.ipAddress = clientIp
  await next()
}
