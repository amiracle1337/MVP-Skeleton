import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import { sendEmail } from "mailers/sendEmail"

const Input = z.object({
  to: z.string(),
  subject: z.string(),
  html: z.string(),
})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async (Input, { session: { userId } }) => {
    return sendEmail(Input)
  }
)
