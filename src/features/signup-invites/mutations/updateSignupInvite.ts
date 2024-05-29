import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateSignupInviteSchema } from "../schemas"
import { sendEmail } from "mailers/sendEmail"
import EmailTemplateInviteAccepted from "mailers/react-email-starter/emails/invite-accepted"
import React from "react"

export default resolver.pipe(
  resolver.zod(UpdateSignupInviteSchema),
  resolver.authorize("ADMIN"),
  async ({ id, ...data }) => {
    const signupInvite = await db.signupInvite.update({ where: { id }, data })

    if (data.accepted) {
      await sendEmail({
        to: signupInvite.email,
        subject: "Your invite has been accepted!",
        react: React.createElement(EmailTemplateInviteAccepted),
      })
    }

    return true
  }
)
