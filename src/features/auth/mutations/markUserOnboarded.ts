import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const Input = z.object({})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({}, { session: { userId } }) => {
    return db.user.update({
      where: { id: userId },
      data: { onboarded: true },
    })
  }
)
