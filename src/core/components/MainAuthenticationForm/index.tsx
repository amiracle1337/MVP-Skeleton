import { useToggle } from "@mantine/hooks"
import { Flex } from "@mantine/core"
import { SignupInput } from "src/features/auth/schemas"
import { z } from "zod"
import { LoginForm } from "./LoginForm"
import { SignupForm } from "./SignupForm"

type SignUpFormType = z.infer<typeof SignupInput>

export function AuthenticationForm() {
  const [type, toggle] = useToggle(["login", "register"])

  return (
    <>
      <Flex style={{ height: "100vh", width: "100%" }} align="center" justify="center">
        {type === "login" && <LoginForm toggle={toggle} />}
        {type === "register" && <SignupForm toggle={toggle} />}
      </Flex>
    </>
  )
}
