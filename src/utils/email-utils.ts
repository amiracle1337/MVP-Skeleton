import { TokenType } from "db"
import { regenerateToken } from "src/utils/blitz-utils"
import { URL_ORIGIN } from "src/config"

export const generateUnsubscribeLink = async (userId, userEmail) => {
  const token = await regenerateToken({
    userId: userId,
    userEmail: userEmail,
    tokenType: TokenType.UNSUBSCRIBE_EMAIL,
    expireHours: 48,
    deleteExisting: false,
  })

  let unsubscribeLink = `${URL_ORIGIN}/unsubscribe?token=${token}`

  return unsubscribeLink
}
