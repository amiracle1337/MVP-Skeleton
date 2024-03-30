import { BlitzPage } from "@blitzjs/auth"
import { Stack } from "@mantine/core"
import { useStringQueryParan } from "src/utils/utils"

export const verifyEmailPage: BlitzPage = () => {
  const token = useStringQueryParan("token")
  return (
    <Stack>
      <h1>verify-email.page</h1>
      <p>token is {token}</p>
    </Stack>
  )
}

export default verifyEmailPage
