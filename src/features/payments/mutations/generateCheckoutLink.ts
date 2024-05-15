import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import { env } from "src/env.mjs"
import db from "db"
import { lemonSqueezySetup, createCheckout } from "@lemonsqueezy/lemonsqueezy.js"

const Input = z.object({})

const apiKey = env.LEMONSQUEEZY_API_KEY
lemonSqueezySetup({
  apiKey,
  onError: (error) => console.error("Error!", error),
})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({}, { session: { userId } }) => {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) throw new Error("User not found")

    const storeId = env.LEMONSQUEEZY_STORE_ID
    const variantId = env.LEMONSQUEEZY_LIFETIME_PLAN_VARIANT_ID

    const newCheckout = {
      productOptions: {
        name: "New Checkout Test",
        description: "A new checkout test",
      },
      checkoutOptions: {
        embed: true,
        media: true,
        logo: true,
      },
      checkoutData: {
        email: user.email,
        name: "Lemon Squeezy Test",
        custom: {
          user_id: user.id,
        },
      },
      expiresAt: null,
      preview: true,
      testMode: true,
    }
    const { statusCode, error, data } = await createCheckout(storeId, variantId, newCheckout)

    if (error) {
      console.log(error.cause)
      return null // return null or appropriate value in case of error
    } else {
      console.log({ data, error, statusCode })
      console.log("123123123", data?.data.attributes)
      return data?.data.attributes.url // return the URL
    }
  }
)
