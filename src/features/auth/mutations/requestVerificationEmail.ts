import { resolver } from "@blitzjs/rpc"
import db from "db"
import { sendEmail } from "mailers/sendEmail"
import React from "react"
import { TokenType } from "db"
import { URL_ORIGIN } from "src/config"
import { regenerateToken } from "src/utils/blitz-utils"
import EmailTemplateVerifyEmail from "mailers/react-email-starter/emails/verify-email"

export const getEmailVerifyLink = async ({ userId, userEmail }): Promise<string> => {
  const token = await regenerateToken({
    userId,
    userEmail,
    tokenType: TokenType.VERIFY_EMAIL,
  })
  const link = `${URL_ORIGIN}/auth/verify-email?token=${token}`
  return link
}

export const sendVerificationEmail = async ({ userId, userEmail }): Promise<void> => {
  const emailVerifyURL = await getEmailVerifyLink({
    userId,
    userEmail,
  })
  await sendEmail({
    to: userEmail,
    subject: "Verify your email address",
    react: React.createElement(EmailTemplateVerifyEmail, {
      props: { emailVerifyURL },
    }),
  })
}

export default resolver.pipe(resolver.authorize(), async (_, { session: { userId } }) => {
  const user = await db.user.findFirst({
    where: { id: userId },
  })

  if (!user) throw new Error("User not found")

  await sendVerificationEmail({
    userId: user.id, // Also corrected here from userld to userId
    userEmail: user.email,
  })

  return true
})
