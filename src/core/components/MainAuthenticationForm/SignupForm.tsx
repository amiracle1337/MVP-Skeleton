import { useForm, zodResolver } from "@mantine/form"
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
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

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [$signup, { isLoading }] = useMutation(signup)

  const form = useForm<SignupInputType>({
    validate: zodResolver(SignupInput),
    validateInputOnBlur: true,
    validateInputOnChange: ["terms"],
  })

  return (
    <Flex style={{ height: "100vh", width: "100%" }} align="center" justify="center">
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" fw={500}>
          Welcome to artifo, register with
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
            try {
              await $signup(values)
              props.onSuccess?.()
            } catch (error: any) {
              if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                form.setFieldError("email", "This email is already being used")
              } else {
                form.setFieldError("form", error.toString())
              }
            }
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
            <Anchor component={Link} href={Routes.LoginPage()} c="dimmed" size="xs">
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

export default SignupForm
