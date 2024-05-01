import Layout from "src/core/layouts/Layout"
import resetPassword from "src/features/auth/mutations/resetPassword"
import { BlitzPage, Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import Link from "next/link"
import { useForm, zodResolver } from "@mantine/form"
import { Stack, Button, PasswordInput, Title } from "@mantine/core"
import { resetPasswordInput, resetPasswordInputType } from "src/features/auth/schemas"
import { useStringQueryParam } from "src/utils/utils"

const ResetPasswordPage: BlitzPage = () => {
  const token = useStringQueryParam("token")
  const [$resetPassword, { isSuccess, isLoading }] = useMutation(resetPassword)

  const form = useForm<resetPasswordInputType>({
    initialValues: {
      token: "",
      password: "",
      passwordConfirmation: "",
    },

    validate: zodResolver(resetPasswordInput),
    validateInputOnBlur: true,
  })

  let onSubmit = async (values) => {}

  if (!token) {
    return <Title order={3}>Invalid Token</Title>
  }

  return (
    <Layout title="reset password">
      <Stack>
        {isSuccess ? (
          <Stack>
            <Title order={3}>Password Reset Successfully</Title>
            <p>
              Go to the{" "}
              <Link color="blue" href={Routes.Home()}>
                homepage
              </Link>
            </p>
          </Stack>
        ) : (
          <Stack>
            <form
              onSubmit={form.onSubmit(async (values) => {
                await $resetPassword({ ...values, token: token as string })
              })}
            >
              <PasswordInput withAsterisk label="Password" {...form.getInputProps("password")} />
              <PasswordInput
                withAsterisk
                label="Password Cofirmation"
                {...form.getInputProps("passwordConfirmation")}
              />

              <Button mt={10} loading={isLoading} disabled={!form.isValid()} type="submit">
                Submit
              </Button>
            </form>
          </Stack>
        )}
      </Stack>
    </Layout>
  )
}

export default ResetPasswordPage
