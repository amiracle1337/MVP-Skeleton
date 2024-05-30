import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteInviteGiftCodeSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteInviteGiftCodeSchema),
  resolver.authorize("ADMIN"),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const inviteGiftCode = await db.inviteGiftCode.deleteMany({
      where: { id },
    })

    return inviteGiftCode
  }
)
