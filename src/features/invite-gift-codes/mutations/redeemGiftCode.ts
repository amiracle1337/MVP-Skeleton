import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { sendEmail } from "mailers/sendEmail"
import EmailTemplateInviteAccepted from "mailers/react-email-starter/emails/invite-accepted"
import React from "react"

const Input = z.object({
  code: z.string(),
  email: z.string(),
})

export default resolver.pipe(resolver.zod(Input), async ({ code, email }) => {
  const foundCode = await db.inviteGiftCode.findFirst({
    where: {
      id: code,
    },
    include: {
      sentInvites: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  })

  if (!foundCode) {
    throw new Error("Code not found")
  }
  if (foundCode.redeemed) {
    throw new Error("Code already redeemed")
  }

  const maxRedeems = 5

  if (foundCode.sentInvites.length >= maxRedeems) {
    throw new Error("Code has reached maximum redeems")
  }

  await sendEmail({
    to: email,
    subject: "Your invite is ready!",
    react: React.createElement(EmailTemplateInviteAccepted),
  })

  const existingInvite = await db.signupInvite.findFirst({
    where: {
      email,
    },
  })

  if (existingInvite) {
    await db.signupInvite.update({
      where: {
        id: existingInvite.id,
      },
      data: {
        accepted: true,
        giftCodeId: code,
      },
    })
  } else {
    await db.signupInvite.create({
      data: {
        email,
        accepted: true,
        ipAddresses: "CREATED_FROM_ADMIN???",
        giftCodeId: code,
      },
    })
  }

  // what would happen if i skipped plus one
  if (foundCode.sentInvites.length + 1 === maxRedeems) {
    await db.inviteGiftCode.update({
      where: {
        id: code,
      },
      data: {
        redeemed: true,
      },
    })
  }
})
