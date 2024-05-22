import { resolver } from "@blitzjs/rpc"
import db from "../../../../db"
import { Prisma } from "@prisma/client"
import { env } from "src/env.mjs"
import { storePrismaJson } from "src/utils/utils"
import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js"
import { type GetProductParams, type Product, getProduct } from "@lemonsqueezy/lemonsqueezy.js"
import { type GetVariantParams, type Variant, getVariant } from "@lemonsqueezy/lemonsqueezy.js"

export default resolver.pipe(resolver.authorize("ADMIN"), async () => {
  // const products = await lemonClient.getProducts({
  //   storeId: env.LEMONSQUEEZY_STORE_ID,
  // });

  // const variants = await lemonClient.getVariants({});

  const apiKey = env.LEMONSQUEEZY_API_KEY
  lemonSqueezySetup({
    apiKey,
    onError: (error) => console.error("Error!", error),
  })

  const productId = 272512
  const storeId = env.LEMONSQUEEZY_STORE_ID

  const { statusCode, error, data } = await getProduct(productId, { include: [storeId] })

  if (error) {
    console.log(error.cause)
    return null // return null or appropriate value in case of error
  } else {
    console.log({ data, error, statusCode })
    console.log("123123123", data?.data.attributes)
  }

  // const getVariants = async () => {
  //   const variantId = env.LEMONSQUEEZY_LIFETIME_PLAN_VARIANT_ID
  //   const { statusCode, error, data } = await getVariant(variantId, { include: ["product"] })

  //   return data
  // }

  try {
    for (const product of data?.data) {
      let createAndUpdate = {
        name: product.attributes.name,
        attributes: storePrismaJson(product.attributes),
      }

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

    for (const variant of variants.data) {
      try {
        let variantId = variant.id

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
            variantId: variantId.toString(),
          },
          create: {
            variantId: variantId.toString(),
            product: {
              connect: {
                productId: productId.toString(),
              },
            },
            ...createAndUpdate,
          },
          update: createAndUpdate,
        })
      } catch (err) {
        console.log("err", err)
      }
    }
  } catch (err) {
    console.log("err", err)
  }

  return true
})
