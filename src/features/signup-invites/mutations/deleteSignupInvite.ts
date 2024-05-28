import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteSignupInviteSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteSignupInviteSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const signupInvite = await db.signupInvite.deleteMany({ where: { id } })

    return signupInvite
  }
)
