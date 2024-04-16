import { resolver } from "@blitzjs/rpc"
import { NotFoundError } from "@prisma/client/runtime"
import db from "db"
import { z } from "zod"

const Input = z.object({})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({}, { session: { userId } }) => {
    return db.user.findUnique({
      where: { id: userId },
      select: { settingsEmailMarketing: true, settingsEmailMarketingProduct: true },
    })
  }
)
