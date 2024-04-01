import Layout from "src/core/layouts/Layout"
import { FORM_ERROR } from "src/core/components/Form"
import forgotPassword from "src/features/auth/mutations/forgotPassword"
import { useMutation } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import { Stack, TextInput, Button, Title } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import { ForgotPAsswordInput, ForgotPasswordInputType } from "src/features/auth/schemas"
import { notifications } from "@mantine/notifications"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess, isLoading }] = useMutation(forgotPassword)

  const form = useForm<ForgotPasswordInputType>({
    initialValues: {
      email: "",
    },

    validate: zodResolver(ForgotPAsswordInput),
  })

  return (
    <Layout title="Forgot Your Password?">
      {isSuccess ? (
        <Stack>
          <Title order={3}>Request Submitted!</Title>
          <p>
            If your email is in our system, you will receive instructions to reset your password
            shortly.
          </p>
        </Stack>
      ) : (
        <Stack>
          <Title order={3}>Forgot your password?</Title>
          <form
            onSubmit={form.onSubmit(async (values) => {
              await forgotPasswordMutation(values)
              notifications.show({
                title: "Check your email",
                message: "If your email is in our system, you will receive instructions shortly",
                color: "teal",
              })
            })}
          >
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />

            <Button disabled={!form.isValid()} loading={isLoading} mt={10} type="submit">
              Submit
            </Button>
          </form>
        </Stack>
      )}
    </Layout>
  )
}

export default ForgotPasswordPage
