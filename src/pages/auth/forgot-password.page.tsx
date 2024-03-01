import Layout from "src/core/layouts/Layout"
import { FORM_ERROR } from "src/core/components/Form"
import forgotPassword from "src/features/auth/mutations/forgotPassword"
import { useMutation } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import { Stack, TextInput, Button } from "@mantine/core"
import { useForm } from "@mantine/form"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  const form = useForm({
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  })

  let onSubmit = async (values) => {
    try {
      await forgotPasswordMutation(values)
    } catch (error: any) {
      return { [FORM_ERROR]: "sorry we had an unexpected error, please try again." }
    }
  }

  return (
    <Layout title="Forgot Your Password?">
      {isSuccess ? (
        <div>
          <h2>Request Submitted</h2>
          <p>
            If your email is in our system, you will receive instructions to reset your password
            shortly.
          </p>
        </div>
      ) : (
        <Stack>
          <h1>Forgot your password?</h1>
          <form onSubmit={form.onSubmit(onSubmit)}>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Stack>
      )}
    </Layout>
  )
}

export default ForgotPasswordPage
