import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateSignupInviteSchema } from "../schemas"

export default resolver.pipe(resolver.zod(CreateSignupInviteSchema), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const signupInvite = await db.signupInvite.create({
    data: {
      ...input,
      ipAddresses: "12312",
    },
  })

  return signupInvite
})
