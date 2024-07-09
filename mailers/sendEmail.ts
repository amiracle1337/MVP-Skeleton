import { isDev, isStaging } from "src/config"
import { nodemailerAppTransport } from "./transports/nodemailer-app-transports"
import { render } from "@react-email/render"
import { Email } from "./react-email-starter/types"
import { resend } from "./react-email-starter/resend"
import { nodemailerMailtrapTransport } from "./transports/nodemailer-mailtrap-transport"

export const EMAIL_DEFAULT_FROM = "onboarding@resend.dev"

export const sendEmail = async ({ subject, to, react }: Email) => {
  // @ts-ignore
  let message: CreateEmailOptions = {
    from: EMAIL_DEFAULT_FROM,
    subject,
    to,
  }

  if (!react) throw new Error("this email doesn't have any content")

  if (isDev) {
    const html = render(react)
    return nodemailerAppTransport.sendMail({
      ...message,
      html,
    })
  }
  if (isStaging) {
    const html = render(react)
    return nodemailerMailtrapTransport.sendMail({
      ...message,
      html,
    })
  }
  return resend.emails.send({
    ...message,
    react,
  })
}
