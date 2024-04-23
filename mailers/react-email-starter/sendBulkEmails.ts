import { isDev } from "src/config"
import { Email } from "./types"

// ({ emails }: { emails: Email[] }) uses TypeScript (or Flow)
// type annotation along with destructuring. This syntax means the function expects
// an object as an argument, from which it destructures an array property named emails.
// The type { emails: Email[] } specifies that emails is an array of Email objects.

export const sendBulkEmail = ({ emails }: { emails: Email[] }) => {
  console.log("Sending bulk emails", emails)

  if (isDev) {
    console.log("Sending emails in dev mode")
  }
}
