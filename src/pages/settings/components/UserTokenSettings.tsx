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
} from "@mantine/core"
import { IconTrash, IconPlus, IconPencil } from "@tabler/icons-react"
import getApiTokens from "src/features/api-tokens/queries/getApiTokens"
import deleteApiToken from "src/features/api-tokens/mutations/deleteApiToken"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"

const TokenComponent = ({ token }) => {
  const [$deleteApiToken] = useMutation(deleteApiToken, {})
  const router = useRouter()

  return (
    <Card
      padding="md"
      radius="md"
      withBorder
      style={{
        position: "relative",
        transition: "all 100ms linear",
      }}
      onMouseEnter={(e) => {
        const actionIcons = e.currentTarget.querySelectorAll(".action-icons")
        actionIcons.forEach((icon) => {
          const element = icon as HTMLElement
          element.style.opacity = "1"
          element.style.pointerEvents = "all"
        })
      }}
      onMouseLeave={(e) => {
        const actionIcons = e.currentTarget.querySelectorAll(".action-icons")
        actionIcons.forEach((icon) => {
          const element = icon as HTMLElement
          element.style.opacity = "0"
          element.style.pointerEvents = "none"
        })
      }}
    >
      <Group>
        <Badge mb="sm" color="blue" variant="light" size="md">
          {token.name}
        </Badge>
        <ActionIcon
          className="action-icons"
          style={{
            transition: "all 100ms linear",
            opacity: 0,
            pointerEvents: "none",
          }}
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
        <ActionIcon
          className="action-icons"
          style={{
            transition: "all 100ms linear",
            opacity: 0,
            pointerEvents: "none",
          }}
          variant="light"
          mb="sm"
          size={16}
          onClick={async () => {
            await router.push(`/apitokens/${token.token}/edit`)
          }}
        >
          <IconPencil size={18} />
        </ActionIcon>
      </Group>
      <PasswordInput w="100%" value={token.token} readOnly />
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
