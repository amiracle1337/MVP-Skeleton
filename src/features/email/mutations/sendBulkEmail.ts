import { convertArrayToObject } from "./../../../utils/utils"
import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"
import { chunk } from "lodash"
import { EmailList, EmailTemplate, SpecialVariables } from "src/features/email/types"
import { isDev } from "src/config"
import EmailTemplateDummy from "mailers/react-email-starter/emails/dummy"
import React from "react"
import { generateUnsubscribeLink } from "src/utils/email-utils"
import { Email } from "mailers/react-email-starter/types"
import { sendBulkEmail } from "mailers/react-email-starter/sendBulkEmails"
import { EmailTemplates } from "../templates"
import { remapVariables } from "src/features/email/utils"
import { sub } from "date-fns"

const Input = z.object({
  list: z.nativeEnum(EmailList),
  subject: z.string(),
  template: z.nativeEnum(EmailTemplate),
  variables: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
    })
  ),
})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize("ADMIN"),
  async ({ list, subject, template, variables }, { session: { userId } }) => {
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
      select: {
        id: true,
        email: true,
        name: true,
        bio: true,
        username: true,
        avatarImageKey: true,
      },
    })

    let CHUNK_SIZE = isDev ? 3 : 100
    const chunks = chunk(users, CHUNK_SIZE)
    console.log(chunks)

    const foundEmailTemplate = EmailTemplates.find((e) => e.value === template)

    for (const chunk of chunks) {
      const emails: Email[] = await Promise.all(
        chunk.map(async (user): Promise<Email> => {
          let unsubscribeLink = await generateUnsubscribeLink(user.id, user.email)

          const specialVariables: SpecialVariables = {
            userName: user.name,
            userEmail: user.email,
            userId: user.id,
            userBio: user.bio,
            userUsername: user.username,
            userAvatarImageKey: user.avatarImageKey,
          }

          let replacedSubject = subject

          for (const key in specialVariables) {
            replacedSubject = replacedSubject.replace(`{{${key}}}`, specialVariables[key])
          }

          const remappedVariables = remapVariables({
            variables,
            specialVariables,
          })

          if (!foundEmailTemplate?.component) {
            throw new Error("Email template component not found")
          }

          return {
            to: user.email,
            subject: replacedSubject,
            react: React.createElement(foundEmailTemplate.component, {
              props: {
                name: user.name,
                emailVerifyURL: "",
                unsubscribeLink,
                ...convertArrayToObject(remappedVariables),
              },
            }),
          }
        })
      )

      await sendBulkEmail({ emails })
    }
  }
)
