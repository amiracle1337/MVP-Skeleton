import React from "react"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { Badge, Group, Stack, Title, Text, ActionIcon } from "@mantine/core"
import getInviteGiftCodes from "src/features/invite-gift-codes/queries/getInviteGiftCodes"
import getWebhooks from "src/features/webhooks/queries/getWebhooks"
import { WebhookType } from "@prisma/client"
import { Editable } from "src/core/components/Editable"
import updateWebhook from "src/features/webhooks/mutations/updateWebhook"
import deleteWebhook from "src/features/webhooks/mutations/deleteWebhook"
import { IconTrash, IconTrashX } from "@tabler/icons-react"

const webhookLabels = {
  [WebhookType.ActionCreated]: "Action Created",
  [WebhookType.ActionUpdated]: "Action Updated",
}

const WebhookComponent = ({ webhook }) => {
  const label = webhookLabels[webhook.type]
  const [$updateWebhook] = useMutation(updateWebhook, {})
  const [$deleteWebhook] = useMutation(deleteWebhook, {})

  return (
    <Group key={webhook.id}>
      <Badge color="blue" variant="light">
        {label}
      </Badge>
      <Editable
        onSubmit={async (newValue) => {
          if (newValue) {
            await $updateWebhook({
              id: webhook.id,
              data: {
                url: newValue,
              },
            })
          }
        }}
        value={webhook.url}
      >
        <Text>{webhook.url}</Text>
      </Editable>
      <ActionIcon
        variant="subtle"
        color="red"
        onClick={async () => {
          await $deleteWebhook({ id: webhook.id })
        }}
      >
        <IconTrash size={14} />
      </ActionIcon>
    </Group>
  )
}

export const UserWebhookSettings = () => {
  const [webhooks] = useQuery(getWebhooks, {})
  return (
    <Stack style={{ width: "100%" }}>
      <Title order={3} style={{ paddingTop: "10px", paddingBottom: "15px" }}>
        Webhooks{" "}
      </Title>
      <Stack>
        {webhooks.map((webhook) => (
          <WebhookComponent key={webhook.id} webhook={webhook} />
        ))}
      </Stack>
    </Stack>
  )
}
