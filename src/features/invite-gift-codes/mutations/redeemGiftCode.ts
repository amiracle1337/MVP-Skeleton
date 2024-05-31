import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { sendEmail } from "mailers/sendEmail"
import EmailTemplateInviteAccepted from "mailers/react-email-starter/emails/invite-accepted"
import React from "react"

// Input validation schema
const Input = z.object({
  code: z.string(),
  email: z.string(),
})

// Constants
const MAX_REDEEMS = 5

// Helper function to find the invite gift code
async function findInviteGiftCode(code) {
  return await db.inviteGiftCode.findFirst({
    where: { id: code },
    include: {
      sentInvites: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  })
}

// Helper function to find existing signup invite
async function findExistingInvite(email) {
  return await db.signupInvite.findFirst({
    where: { email },
  })
}

// Helper function to create or update signup invite
async function createOrUpdateInvite(email, code) {
  const existingInvite = await findExistingInvite(email)
  const inviteData = {
    email,
    accepted: true,
    ipAddresses: "CREATED_FROM_ADMIN???",
    giftCodeId: code,
  }

  if (existingInvite) {
    await db.signupInvite.update({
      where: { id: existingInvite.id },
      data: inviteData,
    })
  } else {
    await db.signupInvite.create({
      data: inviteData,
    })
  }
}

// Helper function to mark invite gift code as redeemed
async function markGiftCodeAsRedeemed(code) {
  await db.inviteGiftCode.update({
    where: { id: code },
    data: { redeemed: true },
  })
}

export default resolver.pipe(resolver.zod(Input), async ({ code, email }) => {
  // Find the invite gift code
  const foundCode = await findInviteGiftCode(code)

  // Validation checks
  if (!foundCode) throw new Error("Code not found")
  if (foundCode.redeemed) throw new Error("Code already redeemed")
  if (foundCode.sentInvites.length >= MAX_REDEEMS)
    throw new Error("Code has reached maximum redeems")

  // Create or update the signup invite
  await createOrUpdateInvite(email, code)

  // Send invite email
  await sendEmail({
    to: email,
    subject: "Your invite is ready!",
    react: React.createElement(EmailTemplateInviteAccepted),
  })

  // Update the redeemed status if max redeems is reached
  if (foundCode.sentInvites.length + 1 === MAX_REDEEMS) {
    await markGiftCodeAsRedeemed(code)
  }
})
