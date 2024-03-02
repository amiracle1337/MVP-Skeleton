import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import { AuthenticationError } from "blitz"
import db from "db"
import { Role } from "types"
import { authenticateUser } from "src/utils/auth-utils"
import { z } from "zod"
import { email } from "../schemas"

export const LoginInput = z.object({
  email,
  password: z.string(),
})

export default resolver.pipe(resolver.zod(LoginInput), async (params, ctx) => {
  // This throws an error if credentials are invalid
  const { email, password } = params
  const user = await authenticateUser(email, password)

  await ctx.session.$create({ userId: user.id, role: user.role as Role })

  return user
})
