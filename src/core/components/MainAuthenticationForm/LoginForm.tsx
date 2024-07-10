import { useForm, zodResolver } from "@mantine/form"
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Anchor,
  Box,
} from "@mantine/core"
import { useMutation } from "@blitzjs/rpc"
import login from "src/features/auth/mutations/login"
import { Flex } from "@mantine/core"
import { LoginInputType } from "src/features/auth/schemas"
import { LoginInput } from "src/features/auth/schemas"
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { SocialButtonsAuth } from "./SocialButtonAuth"

export const LoginForm: React.FC<{
  toggle: () => void
}> = ({ toggle }) => {
  const [$login, { isLoading }] = useMutation(login)

  const form = useForm<LoginInputType>({
    validate: zodResolver(LoginInput),
    validateInputOnBlur: true,
  })

  return (
    <Flex style={{ height: "100vh", width: "100%" }} align="center" justify="center">
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" fw={500}>
          Welcome to {"artifo"}, login with
        </Text>

        <SocialButtonsAuth />

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form
          onSubmit={form.onSubmit(async (values) => {
            await $login(values)
          })}
        >
          <TextInput
            required
            label="Email"
            placeholder="elon@tesla.com"
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
          <Flex justify="flex-end">
            <Box component={Link} href={Routes.ForgotPasswordPage()}>
              <Text size="xs" c="dimmed" mt={8}>
                Forgot password?
              </Text>
            </Box>
          </Flex>

          <Group justify="space-between" mt="xl">
            <Anchor onClick={toggle} component="button" type="button" c="dimmed" size="xs">
              {"Don't have an account? Register"}
            </Anchor>
            <Button disabled={!form.isValid()} loading={isLoading} type="submit" radius="xl">
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </Flex>
  )
}
