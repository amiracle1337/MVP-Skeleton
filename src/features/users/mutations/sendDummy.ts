import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import { sendEmail } from "mailers/sendEmail"
import React from "react"
import db, { TokenType } from "db"
import EmailTemplateDummy from "mailers/react-email-starter/emails/dummy"
import { regenerateToken } from "src/utils/blitz-utils"
import { URL_ORIGIN } from "src/config"

const Input = z.object({})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({}, { session: { userId } }) => {
    const user = await db.user.findFirst({
      where: { id: userId },
    })
    if (!user) throw new Error("User not found")

    const token = await regenerateToken({
      userId: user.id,
      userEmail: user.email,
      tokenType: TokenType.UNSUBSCRIBE_EMAIL,
    })

    let unsubscribeLink = `${URL_ORIGIN}/unsubscribe?token=${token}`

    await sendEmail({
      to: user.email,
      subject: "hi dummy user",
      react: React.createElement(EmailTemplateDummy, {
        props: {
          name: user.name,
          emailVerifyURL: "",
          unsubscribeLink: unsubscribeLink,
        },
      }),
    })
  }
)
