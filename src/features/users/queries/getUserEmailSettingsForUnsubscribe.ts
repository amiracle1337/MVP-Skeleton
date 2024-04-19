import { resolver } from "@blitzjs/rpc"
import { hash256 } from "@blitzjs/auth"
import db, { TokenType } from "db"
import { z } from "zod"

const Input = z.object({
  token: z.string().optional(),
})

export default resolver.pipe(resolver.zod(Input), async ({ token }) => {
  const hashedToken = hash256(token)

  const possibleToken = await db.token.findFirst({
    where: { hashedToken, type: TokenType.UNSUBSCRIBE_EMAIL },
    include: {
      user: {
        select: {
          settingsEmailMarketing: true,
          settingsEmailMarketingProduct: true,
        },
      },
    },
  })

  if (!possibleToken) throw new Error("Token not found")

  if (possibleToken.expiresAt < new Date()) throw new Error("Token expired")

  return possibleToken.user
})
