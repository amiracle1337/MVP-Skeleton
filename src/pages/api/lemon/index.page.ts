import { NextApiRequest, NextApiResponse } from "next"
import getRawBody from "raw-body"
import { validateLemonSqueezyHook } from "./validateLemonSqueezyHook"
import { LemonEventType } from "./types"
import { onOrderCreated } from "./hooks/onOrderCreated"
import { returnError, returnOkay } from "./utils"
import { onOrderRefunded } from "./hooks/onOrderRefunded"

// flow of purchase
// User Initiates Purchase:

// User opens the modal and clicks "Purchase."
// onPurchaseClick is called, triggering the generateCheckoutLink mutation.
// Backend Creates Checkout Session:

// The mutation uses Lemon Squeezy's API to create a new checkout session.
// The checkout URL is returned and opened in a new tab.
// User Completes Purchase on Lemon Squeezy:

// The user completes the purchase on the Lemon Squeezy checkout page.
// Lemon Squeezy Sends Webhook:

// Once the payment is processed and the order is created, Lemon Squeezy sends a webhook to your server indicating the order was created.
// Webhook Handler Processes Event:

// The handler verifies the request and extracts the event type.
// It calls onOrderCreated since the event type is OrderCreated.
// onOrderCreated creates a new order record in the database and updates the user's subscription status to hasLifetimeAccess.

export const config = {
  api: {
    bodyParser: false,
  },
}

// main function trying to handle the webhook request
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("🍋: handler function called")

  console.log("🍋: hello")

  console.log("req.method", req.method)

  // start by verifying the request method
  if (req.method !== "POST") {
    console.log("🍋: method not allowed")
    return res.status(405).json({
      message: "Method not allowed",
    })
  }

  console.log("req.method is allowed")

  try {
    // takes the request which is in node binary and turns it into JSON
    const rawBody = await getRawBody(req)
    // checks if the hook is valid by sending it to the validateLemonSqueezyHook function
    const isValidHook = await validateLemonSqueezyHook({ req, rawBody })

    console.log("🍋: isValidHook", isValidHook)

    if (!isValidHook) {
      return res.status(400).json({
        message: "Invalid signature.",
      })
    }

    // ahaaaa! So the handler list is to map out a pre-defined list of what eventTypes
    // should have what functions. Then we get the eventType from the payload, and based on what it matched, it uses that function

    //@ts-ignore
    const event: ResBody["body"] = JSON.parse(rawBody)
    const eventType = event.meta.event_name
    console.log("🍋: event type", eventType)

    // associate the event type "OrderCreated" with onOrderCreated function.
    const handlers = {
      [LemonEventType.OrderCreated]: onOrderCreated,
      [LemonEventType.OrderRefunded]: onOrderRefunded,
    }

    // set a variable to equal the handler for the event type name
    const foundHandler = handlers[eventType]

    if (foundHandler) {
      try {
        await foundHandler({ event })
        returnOkay(res)
      } catch (err) {
        console.log(`🍋: error in handling ${eventType} event`, err)
        returnError(res)
      }
    } else {
      console.log(`🍋: no handler found for ${eventType} event`)
    }

    console.log("eventType", eventType)
  } catch (e: unknown) {
    if (typeof e === "string") {
      return res.status(400).json({
        message: `Webhook error: ${e}`,
      })
    }
    if (e instanceof Error) {
      return res.status(400).json({
        message: `Webhook error: ${e.message}`,
      })
    }
    throw e
  }
}

export default handler
