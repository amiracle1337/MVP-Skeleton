import { storePrismaJson } from "src/utils/utils"
import db from "db"

export const onSubscriptionPaymentSuccess = async ({ event }) => {
  const { data } = event
  let subscriptionId = data.attributes.subscription_id.toString()

  await db.lemonSqueezyPayment.create({
    data: {
      paymentId: data.id,
      attributes: storePrismaJson(data.attributes),
      subscription: {
        connect: {
          subscriptionId,
        },
      },
    },
  })

  return true
}
