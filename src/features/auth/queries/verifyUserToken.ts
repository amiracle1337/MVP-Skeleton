import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { TokenType } from "db"
import { hash256 } from "@blitzjs/auth"

const Input = z.object({
  token: z.string(),
})

export default resolver.pipe(resolver.zod(Input), async ({ token }) => {
  let hashedToken = hash256(token)

  const possibleToken = await db.token.findFirst({
    where: { hashedToken, type: TokenType.VERIFY_EMAIL },
  })

  if (!possibleToken) throw new Error("Invalid token")

  await db.token.delete({ where: { id: possibleToken.id } })

  if (possibleToken.expiresAt < new Date()) throw new Error("Token expired")

  await db.user.update({
    where: { id: possibleToken.userId },
    data: { emailVerifiedAt: new Date() },
  })

  return true
})
