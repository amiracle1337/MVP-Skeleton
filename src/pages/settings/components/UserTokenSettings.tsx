import React from "react"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { Badge, Group, Stack, Title, Text, ActionIcon } from "@mantine/core"
import getInviteGiftCodes from "src/features/invite-gift-codes/queries/getInviteGiftCodes"
import gettokens from "src/features/tokens/queries/gettokens"
import { tokenType } from "@prisma/client"
import { Editable } from "src/core/components/Editable"
import updatetoken from "src/features/tokens/mutations/updatetoken"
import deletetoken from "src/features/tokens/mutations/deletetoken"
import { IconTrash, IconTrashX } from "@tabler/icons-react"

const tokenLabels = {
  [tokenType.ActionCreated]: "Action Created",
  [tokenType.ActionUpdated]: "Action Updated",
}

const tokenComponent = ({ token }) => {
  const label = tokenLabels[token.type]
  const [$updatetoken] = useMutation(updatetoken, {})
  const [$deletetoken] = useMutation(deletetoken, {})

  return (
    <Group key={token.id}>
      <Badge color="blue" variant="light">
        {label}
      </Badge>
      <Editable
        onSubmit={async (newValue) => {
          if (newValue) {
            await $updatetoken({
              id: token.id,
              data: {
                url: newValue,
              },
            })
          }
        }}
        value={token.url}
      >
        <Text>{token.url}</Text>
      </Editable>
      <ActionIcon
        variant="subtle"
        color="red"
        onClick={async () => {
          await $deletetoken({ id: token.id })
        }}
      >
        <IconTrash size={14} />
      </ActionIcon>
    </Group>
  )
}

export const UserTokenSettings = () => {
  const [tokens] = useQuery(gettokens, {})
  return (
    <Stack style={{ width: "100%" }}>
      <Title order={3} style={{ paddingTop: "10px", paddingBottom: "15px" }}>
        tokens{" "}
      </Title>
      <Stack>
        {tokens.map((token) => (
          <tokenComponent key={token.id} token={token} />
        ))}
      </Stack>
    </Stack>
  )
}
