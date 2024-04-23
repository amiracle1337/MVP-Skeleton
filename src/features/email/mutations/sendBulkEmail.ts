import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"
import { chunk } from "lodash"
import { EmailList } from "src/features/email/types"
import { isDev } from "src/config"
import EmailTemplateDummy from "mailers/react-email-starter/emails/dummy"
import React from "react"
import { generateUnsubscribeLink } from "src/utils/email-utils"
import { Email } from "mailers/react-email-starter/types"
import { sendBulkEmail } from "mailers/react-email-starter/sendBulkEmails"

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

    const users = await db.user.findMany({
      where: {
        AND: {
          ...(list === EmailList.Product && { settingsEmailMarketingProduct: true }),
          ...(list === EmailList.Marketing && { settingsEmailMarketing: true }),
        },
        id: {
          not: user.id,
        },
      },
    })

    console.log("send email to", users.length)

    let CHUNK_SIZE = isDev ? 3 : 100
    const chunks = chunk(users, CHUNK_SIZE)
    console.log(chunks)

    for (const chunk of chunks) {
      const emails: Email[] = await Promise.all(
        // This tells TypeScript that the result of each asynchronous function (invoked for each user)
        // is a promise that resolves to an Email object.
        chunk.map(async (user): Promise<Email> => {
          let unsubscribeLink = await generateUnsubscribeLink(user.id, user.email)

          return {
            to: user.email,
            subject: `Hey there ${user.name}`,
            react: React.createElement(EmailTemplateDummy, {
              props: {
                name: user.name,
                emailVerifyURL: "",
                unsubscribeLink,
              },
            }),
          }
        })
      )

      console.log("email sent to", emails)
      sendBulkEmail({ emails })
    }
  }
)
