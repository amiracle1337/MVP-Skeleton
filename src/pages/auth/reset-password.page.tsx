import Layout from "src/core/layouts/Layout"
import { FORM_ERROR } from "src/core/components/Form"
import resetPassword from "src/features/auth/mutations/resetPassword"
import { BlitzPage, Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Link from "next/link"
import { assert } from "blitz"
import { useForm } from "@mantine/form"
import { Stack, Button, PasswordInput } from "@mantine/core"

const ResetPasswordPage: BlitzPage = () => {
  const router = useRouter()
  const token = router.query.token?.toString()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  const form = useForm({
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },

    validate: {},
  })

  let onSubmit = async (values) => {
    try {
      assert(token, "token is required.")
      await resetPasswordMutation({ ...values, token })
    } catch (error: any) {
      if (error.name === "ResetPasswordError") {
        return {
          [FORM_ERROR]: error.message,
        }
      } else {
        return {
          [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
        }
      }
    }
  }

  return (
    <Layout title="reset password">
      <h1>Set a New Password</h1>

      {isSuccess ? (
        <div>
          <h2>Password Reset Successfully</h2>
          <p>
            Go to the <Link href={Routes.Home()}>homepage</Link>
          </p>
        </div>
      ) : (
        <Stack>
          <h1>Forgot your password?</h1>
          <form onSubmit={form.onSubmit(onSubmit)}>
            <PasswordInput withAsterisk label="Passord" {...form.getInputProps("password")} />
            <PasswordInput
              withAsterisk
              label="Passord Cofirmation"
              {...form.getInputProps("passwordConfirmation")}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Stack>
      )}
    </Layout>
  )
}

export default ResetPasswordPage
