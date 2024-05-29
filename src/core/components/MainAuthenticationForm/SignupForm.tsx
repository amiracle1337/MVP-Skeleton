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
import { useMutation } from "@blitzjs/rpc"
import signup from "src/features/auth/mutations/signup"
import { Flex } from "@mantine/core"
import { SignupInput, SignupInputType } from "src/features/auth/schemas"
import Link from "next/link"
import { Routes } from "@blitzjs/next"

export const SignupForm: React.FC<{
  toggle: () => void
}> = ({ toggle }) => {
  const [$signup, { isLoading }] = useMutation(signup)

  const form = useForm<SignupInputType>({
    // validate: is client side validation checking form data, then we have server side validation with mutations
    validate: zodResolver(SignupInput),
    validateInputOnBlur: true,
    validateInputOnChange: ["terms"],
  })

  return (
    <Flex style={{ height: "100vh", width: "100%" }} align="center" justify="center">
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" fw={500}>
          Welcome to truffle, register with
        </Text>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />
        <Text c="yellow" size="sm" fw={500}>
          You need an invite to sign up.{" "}
          <Link href={Routes.RequestInvitePage()}>
            <Text span style={{ textDecoration: "underline" }}>
              Request one here.
            </Text>
          </Link>
        </Text>

        <form
          onSubmit={form.onSubmit(async (values) => {
            await $signup(values)
          })}
        >
          <Stack>
            <TextInput
              required
              label="Name"
              placeholder="Your name"
              {...form.getInputProps("name")}
              radius="md"
            />

            <TextInput
              required
              label="Email"
              placeholder="hello@truffle.ai"
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

            <Checkbox
              label="I accept terms and conditions"
              {...form.getInputProps("terms", { type: "checkbox" })}
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor component="button" type="button" c="dimmed" size="xs">
              Already have an account? Login
            </Anchor>
            <Button disabled={!form.isValid()} loading={isLoading} type="submit" radius="xl">
              Register
            </Button>
          </Group>
        </form>
      </Paper>
    </Flex>
  )
}
