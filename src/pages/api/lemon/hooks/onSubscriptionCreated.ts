import { storePrismaJson } from "src/utils/utils"
import db from "db"

export const onSubscriptionCreated = (event) => {
  console.log("🍋: onSubscriptionCreated", event)
}
