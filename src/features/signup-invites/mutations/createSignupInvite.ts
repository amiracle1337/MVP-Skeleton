import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateSignupInviteSchema } from "../schemas"
import { isDev } from "src/config"

export default resolver.pipe(resolver.zod(CreateSignupInviteSchema), async (input, ctx) => {
  const { ipAddresses } = ctx

  if (!ipAddresses) {
    console.error("IP address is undefined")
    throw new Error("IP address is required")
  }

  // Check for existing invite by email
  const foundInvite = await db.signupInvite.findFirst({
    where: {
      email: input.email,
    },
  })

  if (foundInvite) {
    console.log("Invite already exists for email:", input.email)
    throw new Error("You have already signed up for an invite")
  }

  // IP address check only in production mode
  if (!isDev) {
    const foundInviteByIp = await db.signupInvite.findFirst({
      where: {
        ipAddresses,
      },
    })

    if (foundInviteByIp) {
      console.log("Invite already exists for IP address:", ipAddresses)
      throw new Error("Cannot request more invites")
    }
  }

  // Create new signup invite
  const signupInvite = await db.signupInvite.create({
    data: {
      ...input,
      ipAddresses,
    },
  })
  console.log("Signup invite created:", signupInvite)
  return signupInvite
})
