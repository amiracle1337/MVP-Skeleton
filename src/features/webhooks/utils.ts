import { WebhookType } from "@prisma/client"
import db from "db"

// Define a type for the function parameters
type ProcessWebhooksParams = {
  webhook: WebhookType
  data: any
}

export const processWebhooks = async ({ webhook, data }: ProcessWebhooksParams) => {
  // Fetch an array of webhooks from the database that match the given type
  const webhooks = await db.webhook.findMany({
    where: {
      type: webhook, // Match the type with the webhookType variable
    },
  })

  // Iterate over each webhook in the array
  for (const hook of webhooks) {
    // Send a POST request to each webhook URL with the provided data
    await fetch(hook.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, type: webhook }),
    })
  }
}
