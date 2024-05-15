import { storePrismaJson } from "src/utils/utils"
import db from "db"

export const onOrderCreated = async (event) => {
  const userId = event?.event?.meta?.custom_data.user_id

  console.log("", event?.event?.data?.id)

  return db.$transaction([
    db.lemonSquuezyOrder.create({
      data: {
        orderId: event.event.data.attributes.order_number.toString(),
        user: {
          connect: {
            id: userId,
          },
        },
        attributes: storePrismaJson(event.event.data.attributes),
      },
    }),
    db.user.update({
      where: {
        id: userId,
      },
      data: {
        hasLifetimeAccess: true,
      },
    }),
  ])
}
