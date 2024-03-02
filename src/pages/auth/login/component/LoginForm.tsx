import { AuthenticationError, PromiseReturnType } from "blitz"
import Link from "next/link"
import login from "src/features/auth/mutations/login"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import { TextInput, Button, Stack, Title, PasswordInput } from "@mantine/core"
import { useForm } from "@mantine/form"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

const LoginForm = (props: LoginFormProps) => {
  const [$login] = useMutation(login)

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
    const user = await $login(values)
    props.onSuccess?.(user)
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
