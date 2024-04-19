import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { AuthenticationForm } from "src/core/components/MainAuthenticationForm"
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser"
import { Button, PinInput } from "@mantine/core"
import sendDummy from "src/features/users/mutations/sendDummy"
import { useMutation } from "@blitzjs/rpc"

const Home: BlitzPage = () => {
  const currentUser = useCurrentUser()
  const [$sendEmailDummy] = useMutation(sendDummy)

  return (
    <Layout title="Home">
      <Button
        onClick={() => {
          $sendEmailDummy({})
        }}
      >
        Send dummy email
      </Button>

      {!currentUser && <AuthenticationForm />}
    </Layout>
  )
}

export default Home
