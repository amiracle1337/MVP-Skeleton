import { isDev } from "src/config"
import { nodemailerAppTransport } from "./transports/nodemailer-app-transports"
import { render } from "@react-email/render"
import { Email } from "./react-email-starter/types"
import { resend } from "./react-email-starter/resend"

export const EMAIL_DEFAULT_FROM = "onboarding@resend.dev"

export const sendEmail = async ({ subject, to, react }: Email) => {
  // @ts-ignore
  let message: CreateEmailOptions = {
    from: EMAIL_DEFAULT_FROM,
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
