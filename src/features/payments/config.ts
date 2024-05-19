export const paymentPlans = [
  {
    variantId: "383861",
    name: "monthly",
    amount: 99,
    description: "Billed monthly",
  },
  {
    variantId: "383859",
    name: "annually",
    amount: 999,
    description: "Billed annually",
  },
  {
    variantId: "383860",
    name: "lifetime",
    amount: 3999,
    description: "One-time payment",
  },
]

import { env } from "src/env.mjs"

// export const paymentPlans = [
//   {
//     variantId: env.LEMONSQUEEZY_MONTHLY_PLAN_VARIANT_ID,
//     name: "monthly",
//     amount: 99,
//     description: "Billed monthly",
//   },
//   {
//     variantId: env.LEMONSQUEEZY_ANNUAL_PLAN_VARIANT_ID,
//     name: "annual",
//     amount: 1198,
//     description: "Billed annually",
//   },
//   {
//     variantId: env.LEMONSQUEEZY_LIFETIME_PLAN_VARIANT_ID,
//     name: "lifetime",
//     amount: 3999,
//     description: "One-time payment",
//   },
// ]
