import { resolver } from "@blitzjs/rpc"
import { Role } from "types"
import { authenticateUser } from "src/utils/auth-utils"
import { LoginInput } from "src/features/auth/schemas"

export default resolver.pipe(resolver.zod(LoginInput), async (params, ctx) => {
  // This throws an error if credentials are invalid
  const { email, password } = params
  const user = await authenticateUser(email, password)

  await ctx.session.$create({ userId: user.id, role: user.role as Role })

  return user
})
