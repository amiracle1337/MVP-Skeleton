import { useToggle, upperFirst } from "@mantine/hooks"
import { useForm, zodResolver } from "@mantine/form"
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
  Box,
} from "@mantine/core"
import { GoogleButton } from "./Icons/GoogleIcon"
import { FacebookButton } from "./Icons/FacebookIcon"
import { useMutation } from "@blitzjs/rpc"
import login from "src/features/auth/mutations/login"
import signup from "src/features/auth/mutations/signup"
import { Flex } from "@mantine/core"
import { SignupInput } from "src/features/auth/schemas"
import { z } from "zod"
import { LoginInput } from "src/features/auth/schemas"
import Link from "next/link"
import { Routes } from "@blitzjs/next"

type SignUpFormType = z.infer<typeof SignupInput>

export function AuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(["login", "register"])
  const [$login, { isLoading: isLoggingIn }] = useMutation(login)
  const [$signup, { isLoading: isSigningUp }] = useMutation(signup)

  const form = useForm<SignUpFormType>({
    // validate: is client side validation checking form data, then we have server side validation with mutations
    validate: type === "register" ? zodResolver(SignupInput) : zodResolver(LoginInput),
    validateInputOnBlur: true,
    validateInputOnChange: ["terms"],
  })

  const isLoading = isLoggingIn || isSigningUp

  return (
    <Flex style={{ height: "100vh", width: "100%" }} align="center" justify="center">
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" fw={500}>
          Welcome to Nova, {type} med
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <FacebookButton radius="xl">Facebook</FacebookButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form
          onSubmit={form.onSubmit((values) => {
            if (type === "login") {
              $login(values)
            } else {
              $signup(values)
            }
          })}
        >
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
              placeholder="hello@nova.dev"
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
            <Flex justify="flex-end" mt={-10}>
              <Box component={Link} href={Routes.ForgotPasswordPage()}>
                <Text size="xs" c="dimmed">
                  Forgot password?
                </Text>
              </Box>
            </Flex>

            {type === "register" && (
              <Checkbox
                label="I accept terms and conditions"
                {...form.getInputProps("terms", { type: "checkbox" })}
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button disabled={!form.isValid()} loading={isLoading} type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Flex>
  )
}
