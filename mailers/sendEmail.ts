import React from "react"
import { Resend } from "resend"
import StripeWelcomeEmail from "./react-email-starter/emails/stripe-welcome"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async ({ subject, to, html }) => {
  let message = {
    from: "onboarding@resend.dev",
    subject,
    to,
    react: React.createElement(StripeWelcomeEmail),
  }

  return resend.emails.send(message)
}
