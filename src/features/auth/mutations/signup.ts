import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Role } from "types"
import { SignupInput } from "src/features/auth/schemas"
import React from "react"
import EmailTemplateWelcome from "mailers/react-email-starter/emails/welcome"
import { sendEmail } from "mailers/sendEmail"
import { PrismaError } from "src/utils/blitz-utils"

export default resolver.pipe(resolver.zod(SignupInput), async ({ email, password, name }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())
  try {
    const user = await db.user.create({
      data: { email: email.toLowerCase().trim(), name, hashedPassword, role: "USER" },
      select: { id: true, name: true, email: true, role: true },
    })

    await ctx.session.$create({ userId: user.id, role: user.role as Role })
    await sendEmail({
      to: user.email,
      subject: "Change password",
      react: React.createElement(EmailTemplateWelcome, {
        props: { name: user.name },
      }),
    })
    return user
  } catch (error) {
    throw new PrismaError(error.message, error.code, error.meta)
  }
})
