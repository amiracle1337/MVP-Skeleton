import nodemailer from "nodemailer"

// Log environment variables to verify they are set
console.log("MAILTRAP_USERNAME:", process.env.MAILTRAP_USERNAME)
console.log("MAILTRAP_PASSWORD:", process.env.MAILTRAP_PASSWORD)

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
