import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import { sendEmail } from "mailers/sendEmail"
import React from "react"
import db from "db"
import EmailTemplateDummy from "mailers/react-email-starter/emails/dummy"
import { generateUnsubscribeLink } from "src/utils/email-utils"
import { EmailList } from "src/features/email/types"

const Input = z.object({
  list: z.nativeEnum(EmailList),
})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ list }, { session: { userId } }) => {
    console.log("list is", list)

    const user = await db.user.findFirst({
      where: { id: userId },
    })
    if (!user) throw new Error("User not found")

    console.log("list iss", list)
    // let unsubscribeLink = await generateUnsubscribeLink(user.id, user.email)

    // await sendEmail({
    //   to: user.email,
    //   subject: "hi dummy user",
    //   react: React.createElement(EmailTemplateDummy, {
    //     props: {
    //       name: user.name,
    //       emailVerifyURL: "",
    //       unsubscribeLink,
    //     },
    //   }),
    // })
  }
)
