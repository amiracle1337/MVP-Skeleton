import { ErrorFallbackProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import React from "react"
import { AuthenticationForm } from "src/core/components/MainAuthenticationForm"
import { Flex, Stack, Text, Paper } from "@mantine/core"

const ErrorComponent: React.FC<{ statusCode: string | number; title: string }> = ({
  statusCode,
  title,
}) => {
  return (
    <Flex style={{ height: "30vh", width: "100%" }} align="center" justify="center">
      <Paper p="xl" w="100%" shadow="xs" style={{ maxWidth: "400px" }}>
        <Stack align="center" style={{ gap: 0 }}>
          <Text c="dimmed" size="xl" fw={"bold"}>
            {statusCode}
          </Text>
          <Stack align="center" style={{ gap: 2 }}>
            <Text size="xl">An error occurred 😭</Text>
            <Text size="md" c="dimmed">
              {title}
            </Text>
          </Stack>
        </Stack>
      </Paper>
    </Flex>
  )
}

export function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <AuthenticationForm />
  } else if (error instanceof AuthorizationError) {
    return <AuthenticationForm />
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}
