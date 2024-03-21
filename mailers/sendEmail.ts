import { Resend } from "resend"
import { isDev } from "src/config"
import { StripeWelcomeEmail } from "./react-email-starter/emails/stripe-welcome"
import React from "react"
import { nodemailerAppTransport } from "./transports/nodemailer-app-transports"
import { render } from "@react-email/render"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async ({ subject, to }) => {
  let react = React.createElement(StripeWelcomeEmail, {
    content:
      "Thanks for submitting your account information. You're now ready to start learning on Nova!",
    buttonText: "Go to Nova",
  })

  let message: CreateEmailOptions = {
    from: "onboarding@resend.dev",
    subject,
    to,
  }

  if (isDev) {
    const html = render(react)
    return nodemailerAppTransport.sendMail({
      ...message,
      html,
    })
  }
  return resend.emails.send({
    ...message,
    react,
  })
}

/* import React from "react"
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
*/
