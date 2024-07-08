import React from "react"
import { useMutation, useQuery } from "@blitzjs/rpc"
import {
  Badge,
  Button,
  Group,
  Stack,
  Title,
  Text,
  ActionIcon,
  PasswordInput,
  Card,
  Divider,
} from "@mantine/core"
import { IconTrash, IconPlus, IconCopy } from "@tabler/icons-react"
import getApiTokens from "src/features/api-tokens/queries/getApiTokens"
import deleteApiToken from "src/features/api-tokens/mutations/deleteApiToken"
import updateApiToken from "src/features/api-tokens/mutations/updateApiToken"
import { Routes } from "@blitzjs/next"
import { Router, useRouter } from "next/router"

const TokenComponent = ({ token }) => {
  const [$updateApiToken] = useMutation(updateApiToken, {})
  const [$deleteApiToken] = useMutation(deleteApiToken, {})

  return (
    <Card padding="md" radius="md" withBorder>
      <Group>
        <Badge mb="sm" color="blue" variant="light" size="md">
          {token.name}
        </Badge>
        <ActionIcon
          variant="light"
          color="red"
          mb="sm"
          size={16}
          onClick={async () => {
            await $deleteApiToken({ id: token.id })
          }}
        >
          <IconTrash size={18} />
        </ActionIcon>
      </Group>
      <PasswordInput
        w="100%"
        value={token.token}
        readOnly
        // rightSection={
        //   <ActionIcon
        //     variant="subtle"
        //     color="grey"
        //     size="sm"
        //     onClick={() => navigator.clipboard.writeText(token.token)}
        //   >
        //     <IconCopy size={16} />
        //   </ActionIcon>
        // }
      />
      <Text size="xs" c="dimmed" mt="lg">
        Created: {new Date(token.createdAt).toLocaleDateString()}
      </Text>
      <Text size="xs" c="dimmed" mt="xs">
        Permissions: {token.permission.join(", ")}
      </Text>
    </Card>
  )
}

export const UserTokenSettings = () => {
  const router = useRouter()

  const [tokens] = useQuery(getApiTokens, {})
  console.log(tokens)
  const sortedTokens = [...tokens].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <Stack style={{ width: "100%", maxWidth: "600px" }}>
      <Stack>
        <Title order={3}>API Tokens</Title>
        <Button
          onClick={() => router.push(Routes.NewApiTokenPage())}
          style={{ maxWidth: "200px" }}
          leftSection={<IconPlus size={14} />}
        >
          Create New Token
        </Button>
      </Stack>
      <Stack>
        {sortedTokens.map((token) => (
          <TokenComponent key={token.id} token={token} />
        ))}
      </Stack>
    </Stack>
  )
}
