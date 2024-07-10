import { URL_ORIGIN } from "src/config"
import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Role } from "types"
import { SignupInput } from "src/features/auth/schemas"
import React from "react"
import EmailTemplateWelcome from "mailers/react-email-starter/emails/welcome"
import { sendEmail } from "mailers/sendEmail"
import { PrismaError, regenerateToken } from "src/utils/blitz-utils"

export default resolver.pipe(resolver.zod(SignupInput), async ({ email, password, name }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())

  const existingInvite = await db.signupInvite.findFirst({
    where: {
      email: email.toLowerCase().trim(),
      accepted: true,
    },
  })

  if (!existingInvite) {
    throw new Error("No invite found for this email address")
  }

  try {
    const user = await db.user.create({
      data: {
        email: email.toLowerCase().trim(),
        name,
        hashedPassword,
        role: "USER",
        onboarded: false,
      },
      select: { id: true, name: true, email: true, role: true },
    })

    const token = await regenerateToken({
      userId: user.id,
      userEmail: user.email,
      tokenType: "VERIFY_EMAIL",
    })

    let emailVerifyUrl = `${URL_ORIGIN}/auth/verify-email?token=${token}`

    await ctx.session.$create({ userId: user.id, role: user.role as Role })
    await sendEmail({
      to: user.email,
      subject: "Welcome to artifo",
      react: React.createElement(EmailTemplateWelcome, {
        props: {
          name: user.name,
          emailVerifyURL: emailVerifyUrl,
        },
      }),
    })
    return user
  } catch (error) {
    console.error("Error during signup:", error) // Added log
    throw new PrismaError(error.message, error.code, error.meta)
  }
})

// ... existing code ...
