import { env } from "src/env.mjs"

export const paymentPlans = [
  {
    variantId: env.NEXT_PUBLIC_LEMONSQUEEZY_MONTHLY_PLAN_VARIANT_ID,
    name: "monthly",
    amount: 99,
    description: "Billed monthly",
  },
  {
    variantId: env.NEXT_PUBLIC_LEMONSQUEEZY_ANNUAL_PLAN_VARIANT_ID,
    name: "annually",
    amount: 999,
    description: "Billed annually",
  },
  {
    variantId: env.NEXT_PUBLIC_LEMONSQUEEZY_LIFETIME_PLAN_VARIANT_ID,
    name: "lifetime",
    amount: 3999,
    description: "One-time payment",
  },
]
