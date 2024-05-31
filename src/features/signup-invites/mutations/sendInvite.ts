import { sendEmail } from "mailers/sendEmail"
import EmailTemplateInviteAccepted from "mailers/react-email-starter/emails/invite-accepted"
import React from "react"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { uuidGenerator } from "src/utils/utils"

const Input = z.object({
  email: z.string(),
})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize("ADMIN"),
  async ({ email }) => {
    const invite = await db.signupInvite.findFirst({
      where: {
        email,
      },
    })
    if (invite) {
      await db.signupInvite.update({
        where: {
          id: invite.id,
        },
        data: {
          accepted: true,
          ipAddresses: "123",
          email,
        },
      })
    } else {
      await db.signupInvite.create({
        data: {
          email,
          ipAddresses: `Invited by admin ${uuidGenerator()}`,
          accepted: true,
        },
      })
    }
    await sendEmail({
      to: email,
      subject: "Your invite has been accepted!",
      react: React.createElement(EmailTemplateInviteAccepted),
    })
  }
)
