import { storePrismaJson } from "src/utils/utils"
import { LemonSqueezySubscriptionStatus } from "@prisma/client"
import db from "db"

export const onPlanChanged = async ({ event }) => {
  const { data } = event

  const { product_id, variant_id } = data.attributes

  try {
    await db.lemonSqueezySubscription.update({
      where: {
        subscriptionId: event.data.id,
      },
      data: {
        attributes: storePrismaJson(data.attributes),
        status: data.attributes.status as LemonSqueezySubscriptionStatus,

        product: {
          connect: {
            productId: product_id.toString(),
          },
        },
        variant: {
          connect: {
            variantId: variant_id.toString(),
          },
        },
      },
    })
  } catch (err) {
    console.log("err", err)
  }

  return true
}
