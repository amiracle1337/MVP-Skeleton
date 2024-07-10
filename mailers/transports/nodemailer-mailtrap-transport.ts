import nodemailer from "nodemailer"

let user = process.env.MAILTRAP_USERNAME
let pass = process.env.MAILTRAP_PASSWORD

export const nodemailerMailtrapTransport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 25,
  auth: {
    user,
    pass,
  },
  debug: true, // Enable debugging
  logger: true, // Enable logging
})
