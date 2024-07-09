import nodemailer from "nodemailer"
import { env } from "src/env.mjs"

let user = env.MAILTRAP_USERNAME
let pass = env.MAILTRAP_PASSWORD // add this to .env.local from the NodemailerApp

export const nodemailerMailtrapTransport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io ",
  port: 25,
  auth: {
    user,
    pass,
  },
})
