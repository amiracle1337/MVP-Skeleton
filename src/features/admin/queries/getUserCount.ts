import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const Input = z.object({}) // No input needed if we're fetching all users

export default resolver.pipe(resolver.zod(Input), resolver.authorize("ADMIN"), async () => {
  return db.user.count({})
})
