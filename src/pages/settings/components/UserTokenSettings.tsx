import React from "react"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { Badge, Group, Stack, Title, Text, ActionIcon } from "@mantine/core"
import getInviteGiftCodes from "src/features/invite-gift-codes/queries/getInviteGiftCodes"
import { Editable } from "src/core/components/Editable"
import { IconTrash, IconTrashX } from "@tabler/icons-react"
import getApiTokens from "src/features/api-tokens/queries/getApiTokens"
import deleteApiToken from "src/features/api-tokens/mutations/deleteApiToken"
import updateApiToken from "src/features/api-tokens/mutations/updateApiToken"

const TokenComponent = ({ token }) => {
  const [$updateApiToken] = useMutation(updateApiToken, {})
  const [$deleteApiToken] = useMutation(deleteApiToken, {})

  return (
    <Group key={token.id}>
      <Badge color="blue" variant="light">
        {token.name}
      </Badge>
      <Text>{token.token}</Text>

      <ActionIcon
        variant="subtle"
        color="red"
        onClick={async () => {
          await $deleteApiToken({ id: token.id })
        }}
      >
        <IconTrash size={14} />
      </ActionIcon>
    </Group>
  )
}

export const UserTokenSettings = () => {
  const [tokens] = useQuery(getApiTokens, {})
  return (
    <Stack style={{ width: "100%" }}>
      <Title order={3} style={{ paddingTop: "10px", paddingBottom: "15px" }}>
        tokens{" "}
      </Title>
      <Stack>
        {tokens.map((token) => (
          <TokenComponent key={token.id} token={token} />
        ))}
      </Stack>
    </Stack>
  )
}
