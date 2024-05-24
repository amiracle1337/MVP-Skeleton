import { storePrismaJson } from "src/utils/utils"
import db from "db"
import { getUserIdFromLemonSqueezyEvent } from "../utils"

export const onOrderCreated = async (event) => {
  const userId = await getUserIdFromLemonSqueezyEvent({ event })

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
    // db.user.update({
    //   where: {
    //     id: userId,
    //   },
    //   data: {
    //     hasLifetimeAccess: true,
    //   },
    // }),
  ])
}
