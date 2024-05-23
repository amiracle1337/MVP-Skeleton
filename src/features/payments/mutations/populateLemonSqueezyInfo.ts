import { resolver } from "@blitzjs/rpc"
import db from "../../../../db"
import { env } from "src/env.mjs"
import { storePrismaJson } from "src/utils/utils"
import { lemonSqueezySetup, listProducts, listVariants } from "@lemonsqueezy/lemonsqueezy.js"

export default resolver.pipe(resolver.authorize("ADMIN"), async () => {
  const apiKey = env.LEMONSQUEEZY_API_KEY
  lemonSqueezySetup({
    apiKey,
    onError: (error) => console.error("Error!", error),
  })

  const storeId = env.LEMONSQUEEZY_STORE_ID
  const productsResponse = await listProducts({ filter: { storeId: storeId } })

  if (productsResponse.error) {
    console.log(productsResponse.error.cause)
    return null // return null or appropriate value in case of error
  }

  const variantsResponse = await listVariants()

  if (variantsResponse.error) {
    console.log(variantsResponse.error.cause)
    return null // return null or appropriate value in case of error
  }

  try {
    if (productsResponse.data?.data) {
      for (const product of productsResponse.data.data) {
        let createAndUpdate = {
          name: product.attributes.name,
          attributes: storePrismaJson(product.attributes),
        }
        // upsert does: if a product with this id exists, update it with the new data, otherwise create a new product
        await db.lemonSqueezyProduct.upsert({
          where: {
            productId: product.id.toString(),
          },
          create: {
            productId: product.id.toString(),
            ...createAndUpdate,
          },
          update: createAndUpdate,
        })
      }
    }

    if (variantsResponse.data?.data) {
      for (const variant of variantsResponse.data?.data) {
        const { attributes } = variant
        const { name, price, product_id } = attributes

        let productId = product_id

        let createAndUpdate = {
          name,
          price,
          attributes: storePrismaJson(attributes),
        }

        await db.lemonSqueezyVariant.upsert({
          where: {
            variantId: variant.id.toString(),
          },
          create: {
            variantId: variant.id.toString(),
            product: {
              connect: {
                productId: productId.toString(),
              },
            },
            ...createAndUpdate,
          },
          update: createAndUpdate,
        })
      }
    }
  } catch (err) {
    console.log("err", err)
  }

  return true
})
