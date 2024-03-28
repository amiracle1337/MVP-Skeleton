import { Resend } from "resend"
import { isDev } from "src/config"
import { nodemailerAppTransport } from "./transports/nodemailer-app-transports"
import { render } from "@react-email/render"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async ({ subject, to, react }) => {
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
