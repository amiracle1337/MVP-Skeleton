import { storePrismaJson } from "src/utils/utils"
import db from "db"

export const onOrderRefunded = async (event) => {
  const userId = event?.event?.meta?.custom_data.user_id

  console.log("HALLLAWWWW ENI", event.event.data.attributes.order_number)
  console.log(
    "this is the refund number we are trying to find in the db",
    event.event.data.attributes.order_number
  )

  const foundOrder = await db.lemonSquuezyOrder.findFirst({
    where: {
      orderId: event.event.data.attributes.order_number.toString(),
    },
  })

  if (!foundOrder) {
    throw new Error("Order not found")
  }

  return db.$transaction([
    db.lemonSquuezyOrder.update({
      where: {
        id: foundOrder.id,
      },
      data: {
        refunded: true,
        attributes: storePrismaJson(event.event.data.attributes),
      },
    }),
    db.user.update({
      where: {
        id: userId,
      },
      data: {
        hasLifetimeAccess: false,
      },
    }),
  ])
}
