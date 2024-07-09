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

  const html = render(react)

  try {
    if (isDev) {
      return await nodemailerAppTransport.sendMail({
        ...message,
        html,
      })
    }
    if (isStaging) {
      return await nodemailerMailtrapTransport.sendMail({
        ...message,
        html,
      })
    }
    return await resend.emails.send({
      ...message,
      react,
    })
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}
