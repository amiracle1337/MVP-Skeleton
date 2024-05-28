import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetSignupInvite = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetSignupInvite),
  resolver.authorize("ADMIN"),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const signupInvite = await db.signupInvite.findFirst({ where: { id } })

    if (!signupInvite) throw new NotFoundError()

    return signupInvite
  }
)
