import React from "react"
import { useQuery } from "@blitzjs/rpc"
import { Badge, Group, Stack, Title, Text } from "@mantine/core"
import getInviteGiftCodes from "src/features/invite-gift-codes/queries/getInviteGiftCodes"
import getWebhooks from "src/features/webhooks/queries/getWebhooks"
import { WebhookType } from "@prisma/client"

const webhookLabels = {
  [WebhookType.ActionCreated]: "Action Created",
  [WebhookType.ActionUpdated]: "Action Updated",
}
export const UserWebhookSettings = () => {
  const [webhooks = []] = useQuery(getWebhooks, {})

  return (
    <Stack style={{ width: "100%" }}>
      <Title order={3} style={{ paddingTop: "10px", paddingBottom: "15px" }}>
        Webhooks{" "}
      </Title>
      <Stack>
        {webhooks.map((webhook) => {
          const label = webhookLabels[webhook.type]
          return (
            <Group key={webhook.id}>
              <Badge color="blue" variant="light">
                {label}
              </Badge>
              <Text>{webhook.url}</Text>
            </Group>
          )
        })}
      </Stack>
    </Stack>
  )
}
