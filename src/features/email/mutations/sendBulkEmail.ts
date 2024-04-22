import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"
import { chunk } from "lodash"
import { EmailList } from "src/features/email/types"
import { isDev } from "src/config"

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
