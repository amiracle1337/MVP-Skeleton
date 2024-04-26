import { isDev } from "src/config"
import { Email } from "./types"
import { resend } from "./resend"
import { EMAIL_DEFAULT_FROM, sendEmail } from "mailers/sendEmail"

type EmailWithText = Email & { text: string; from: string }

// ({ emails }: { emails: Email[] }) uses TypeScript (or Flow)
// type annotation along with destructuring. This syntax means the function expects
// an object as an argument, from which it destructures an array property named emails.
// The type { emails: Email[] } specifies that emails is an array of Email objects.

export const sendBulkEmail = async ({ emails }: { emails: Email[] }) => {
  if (isDev) {
    for (const email of emails) {
      await sendEmail(email)
    }
  } else {
    const mappedEmails: EmailWithText[] = emails.map((email) => {
      return {
        ...email,
        from: EMAIL_DEFAULT_FROM,
        text: " ",
      }
    })

    const maxEmailLimit = 1000

    if (mappedEmails.length > maxEmailLimit) {
      throw new Error(`Exceeded the max email limit of ${maxEmailLimit}`)
    }

    await resend.batch.send(mappedEmails)
  }
}
