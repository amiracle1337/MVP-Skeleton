import { Card, PasswordInput, Text, Stack, Title, Button } from "@mantine/core"
import { useMutation } from "@blitzjs/rpc"
import { Form, useForm, zodResolver } from "@mantine/form"
import { ChangePasswordInputType, ChangePasswordInput } from "src/features/auth/schemas"
import changePasswordForLoggedIn from "src/features/auth/mutations/changePasswordForLoggedIn"

export const ChangePassword = () => {
  const [$changePasswordForLoggedIn, { isSuccess, isLoading }] =
    useMutation(changePasswordForLoggedIn)

  const form = useForm<ChangePasswordInputType>({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirmation: "",
    },

    validate: zodResolver(ChangePasswordInput),
    validateInputOnBlur: true,
  })

  return (
    <Card withBorder style={{ maxWidth: "350px" }}>
      {isSuccess ? (
        <Text>Password changed successfully</Text>
      ) : (
        <Stack w={"100%"}>
          <Title order={4}>Change password</Title>
          <Stack w={"100%"}>
            <Form
              style={{ width: "100%" }}
              form={form}
              onSubmit={async (values) => {
                await $changePasswordForLoggedIn(values)
              }}
            >
              <Stack gap={10}>
                <PasswordInput
                  withAsterisk
                  label="Current Password"
                  {...form.getInputProps("currentPassword")}
                />
                <PasswordInput
                  withAsterisk
                  label="New Password"
                  {...form.getInputProps("newPassword")}
                />
                <PasswordInput
                  withAsterisk
                  label="New Password Confirmation"
                  {...form.getInputProps("newPasswordConfirmation")}
                />

                <Button mt={10} loading={isLoading} disabled={!form.isValid()} type="submit">
                  Submit
                </Button>
              </Stack>
            </Form>
          </Stack>
        </Stack>
      )}
    </Card>
  )
}
