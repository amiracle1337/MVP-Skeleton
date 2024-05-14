import db from "db"

export const onOrderCreated = async (event) => {
  const userId = event?.event?.meta?.custom_data.user_id

  console.log("", event?.event?.data?.id)

  // await db.lemonSquuezyOrder.create({
  //   data: {
  //     orderId: event?.event?.data?.id,
  //     user: {
  //       id: userId,
  //     }

  //   }
  // })
}
