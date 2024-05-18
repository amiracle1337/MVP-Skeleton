import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js"
import { env } from "src/env.mjs"

const apiKey = env.LEMONSQUEEZY_API_KEY

lemonSqueezySetup({
  apiKey,
  onError: (error) => console.error("Error!", error),
})

export default lemonSqueezySetup
