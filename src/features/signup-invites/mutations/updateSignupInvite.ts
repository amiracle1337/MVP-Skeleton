import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateSignupInviteSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateSignupInviteSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const signupInvite = await db.signupInvite.update({ where: { id }, data })

    return signupInvite
  }
)
