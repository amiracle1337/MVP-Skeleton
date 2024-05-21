import { storePrismaJson } from "src/utils/utils"
import db from "db"

export const onSubscriptionUpdated = (event) => {
  console.log("🍋: subupdated", event)
}
