import { storePrismaJson } from "src/utils/utils"
import db from "db"

export const onOrderCreated = async (event) => {
  const customData = event.event.meta.custom_data
  const userEmail = event.event.data.attributes.user_email

  let userId = customData?.user_id

  if (!userId) {
    const foundUser = await db.user.findFirst({
      where: {
        email: userEmail,
      },
    })

    if (!foundUser) {
      throw new Error("User not found")
    }

    userId = foundUser.id
  }

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
