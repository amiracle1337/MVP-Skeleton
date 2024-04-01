import { resolver } from "@blitzjs/rpc"
import db, { TokenType } from "db"
import { sendEmail } from "mailers/sendEmail"
import { ForgotPAsswordInput } from "src/features/auth/schemas"
import { regenerateToken } from "src/utils/blitz-utils"
import React from "react"
import EmailTemplateResetPassword from "mailers/react-email-starter/emails/reset-password"
import { URL_ORIGIN } from "src/config"

export default resolver.pipe(resolver.zod(ForgotPAsswordInput), async ({ email }) => {
  const user = await db.user.findFirst({ where: { email: email.toLowerCase() } })

  if (!user) {
    await new Promise((resolve) => setTimeout(resolve, 750))
    return true
  }

  const token = await regenerateToken({
    userId: user.id,
    userEmail: user.email,
    tokenType: TokenType.RESET_PASSWORD,
  })

  let resetPasswordUrl = `${URL_ORIGIN}/auth/reset-password?token=${token}`

  await sendEmail({
    to: user.email,
    subject: "Reset your password",
    react: React.createElement(EmailTemplateResetPassword, {
      props: {
        resetPasswordUrl,
      },
    }),
  })

  return
})
