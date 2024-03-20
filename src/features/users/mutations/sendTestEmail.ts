import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import { sendEmail } from "mailers/sendEmail"

const Input = z.object({})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({}, { session: { userId } }) => {
    return sendEmail({
      to: "amir@amiracle.xyz",
      subject: "Test email",
      html: "<h1>Test email</h1><p>This is a test email</p>",
    })
  }
)
