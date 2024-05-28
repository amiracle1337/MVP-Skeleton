import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateSignupInviteSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateSignupInviteSchema),
  // the flow of Ipadresses: it comes from that we created a middleware,
  // and the , { } is the context object that we can access in the middleware
  // its the blitz context, and we can access the ipAddresses from there
  // and we also have a type definition for it in types.ts
  async (input, { ipAddresses }) => {
    const foundInvite = await db.signupInvite.findFirst({
      where: {
        email: input.email,
      },
    })

    if (foundInvite) {
      throw new Error("You have already signed up for an invite")
    }

    const foundInviteByIp = await db.signupInvite.findFirst({
      where: {
        ipAddresses,
      },
    })

    if (foundInviteByIp) {
      throw new Error("Cannot request more invites")
    }

    const signupInvite = await db.signupInvite.create({
      data: {
        ...input,
        ipAddresses,
      },
    })

    return signupInvite
  }
)
