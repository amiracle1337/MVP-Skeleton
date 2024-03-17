import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateProfileInput } from "src/features/users/schemas"

export default resolver.pipe(
  resolver.zod(UpdateProfileInput),
  resolver.authorize(),
  async (Input, { session: { userId } }) => {
    return db.user.update({
      where: {
        id: userId,
      },
      data: Input,
    })
  }
)
