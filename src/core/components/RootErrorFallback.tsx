import { ErrorFallbackProps, ErrorComponent } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import React from "react"
import { AuthenticationForm } from "src/core/components/MainAuthenticationForm"
import { Flex } from "@mantine/core"

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
