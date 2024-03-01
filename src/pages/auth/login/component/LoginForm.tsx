import { AuthenticationError, PromiseReturnType } from "blitz"
import Link from "next/link"
import login from "src/features/auth/mutations/login"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import { TextInput, Button, Stack, Title, PasswordInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { FORM_ERROR } from "src/core/components/Form"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  })

  const onSubmit = async (values) => {
    try {
      const user = await loginMutation(values)
      props.onSuccess?.(user)
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
      } else {
        return {
          [FORM_ERROR]:
            "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
        }
      }
    }
  }

  return (
    <Stack>
      <Title>Login</Title>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />

        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="Password"
          {...form.getInputProps("password")}
        />
        <Button type="submit">Submit</Button>
      </form>

      <Link href={Routes.ForgotPasswordPage()}>Forgot your password?</Link>

      <Link href={Routes.SignupPage()}>Sign Up</Link>
    </Stack>
  )
}

export default LoginForm
