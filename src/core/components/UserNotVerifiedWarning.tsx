import { Text, Stack, Button, Alert } from "@mantine/core"
import requestEmailVerification from "src/features/auth/mutations/requestVerificationEmail"
import { notifications } from "@mantine/notifications"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { IconInfoCircle } from "@tabler/icons-react"

export const UserNotVerifiedWarning = () => {
  const [$requestEmailVerification, { isLoading: isSendingEmail, isSuccess }] =
    useMutation(requestEmailVerification)

  const icon = <IconInfoCircle />

  return (
    <Stack>
      <Alert
        variant="light"
        color="red"
        radius="md"
        title={isSuccess ? "Email sent!" : "Warning!"}
        icon={icon}
      >
        {!isSuccess ? (
          <>
            <Text style={{ marginBottom: "15px" }}>
              Your email is not verified. Please check your inbox for the verification email.
            </Text>
            <Button
              loading={isSendingEmail}
              size="xs"
              gradient={{ from: "red", to: "red", deg: 340 }}
              variant="gradient"
              onClick={async () => {
                try {
                  await $requestEmailVerification()
                  notifications.show({
                    color: "green",
                    title: "Email sent!",
                    message: "Please check your inbox for the verification email.",
                  })
                } catch (error) {
                  console.error("Failed to send verification email:", error)
                  notifications.show({
                    color: "red",
                    title: "Error!",
                    message: "Failed to send verification email. Please try again.",
                  })
                }
              }}
            >
              Resend my verification email
            </Button>
          </>
        ) : (
          <Text>
            The email has been sent to you and should arrive shortly. Please check your spam.
          </Text>
        )}
      </Alert>
    </Stack>
  )
}
