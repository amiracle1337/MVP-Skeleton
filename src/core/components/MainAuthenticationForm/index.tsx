import { useToggle, upperFirst } from "@mantine/hooks"
import { useForm } from "@mantine/form"
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core"
import { GoogleButton } from "./Icons/GoogleIcon"
import { FacebookButton } from "./Icons/FacebookIcon"
import { FORM_ERROR } from "src/core/components/Form"
import { useMutation } from "@blitzjs/rpc"
import { AuthenticationError, AuthorizationError } from "blitz"
import login from "src/features/auth/mutations/login"
import signup from "src/features/auth/mutations/signup"

export function AuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(["login", "register"])
  const [loginMutation] = useMutation(login)
  const [signupMutation, { isLoading }] = useMutation(signup)

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) => (val.length <= 6 ? "Password should include at least 6 characters" : null),
    },
  })

  const onLogin = async (values) => {
    try {
      const user = await loginMutation(values)
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

  let onSignup = async (values) => {
    try {
      await signupMutation(values)
    } catch (error: any) {
      if (error.code === "P2002" && error.meta?.target?.includes("email")) {
        // This error comes from Prisma
        return { email: "This email is already being used" }
      } else {
        return { [FORM_ERROR]: error.toString() }
      }
    }
  }

  const onSubmit = async (values) => {
    if (type === "login") {
      await onLogin(values).catch((e) => console.error(e))
    } else {
      await onSignup(values).catch((e) => console.error(e))
    }
  }

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" fw={500}>
        Welcome to Nova, {type} med
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <FacebookButton radius="xl">Facebook</FacebookButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack>
          {type === "register" && (
            <TextInput
              required
              label="Name"
              placeholder="Your name"
              {...form.getInputProps("name")}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            {...form.getInputProps("email")}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            {...form.getInputProps("password")}
            radius="md"
          />

          {type === "register" && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue("terms", event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  )
}
