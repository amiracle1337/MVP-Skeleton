import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateSignupInviteSchema } from "../schemas"
import { sendEmail } from "mailers/sendEmail"
import EmailTemplateInviteAccepted from "mailers/react-email-starter/emails/invite-accepted"
import React from "react"

export default resolver.pipe(
  resolver.zod(UpdateSignupInviteSchema),
  resolver.authorize("ADMIN"),
  // This means that the function expects an object with at least
  // an id property and any number of additional properties (collected in data).
  // e.g. id = "invite123";
  // data = { accepted: true, someOtherField: "newValue" };
  // aka  we splits the input object into id and data

  // its very important to separate the id from the rest of the data
  // because most db's don't allow you to update the primary key of a record
  // even if it will be identical post updat to pre update
  // hence separatation of data into its own object
  // so that the id can be used to find the record to update
  async ({ id, ...data }) => {
    //  The update method will only change the fields specified in data.
    // Any fields not included in data will remain unchanged in the database.
    const signupInvite = await db.signupInvite.update({ where: { id }, data })

    if (data.accepted) {
      await sendEmail({
        to: signupInvite.email,
        subject: "Your invite has been accepted!",
        react: React.createElement(EmailTemplateInviteAccepted),
      })
    }

    return true
  }
)
