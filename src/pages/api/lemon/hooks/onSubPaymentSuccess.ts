import { storePrismaJson } from "src/utils/utils"
import db from "db"

export const onPaymentSuccess = (event) => {
  console.log("🍋: paymentsuccess", event)
}
