import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import { sendEmail } from "mailers/sendEmail"
import React from "react"
import db, { TokenType } from "db"
import EmailTemplateDummy from "mailers/react-email-starter/emails/dummy"
import { regenerateToken } from "src/utils/blitz-utils"
import { URL_ORIGIN } from "src/config"
import { generateUnsubscribeLink } from "src/utils/email-utils"

const Input = z.object({})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({}, { session: { userId } }) => {
    const user = await db.user.findFirst({
      where: { id: userId },
    })
    if (!user) throw new Error("User not found")

    let unsubscribeLink = await generateUnsubscribeLink(user.id, user.email)

    await sendEmail({
      to: user.email,
      subject: "hi dummy user",
      react: React.createElement(EmailTemplateDummy, {
        props: {
          name: user.name,
          emailVerifyURL: "",
          unsubscribeLink,
        },
      }),
    })
  }
)
