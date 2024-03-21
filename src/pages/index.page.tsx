import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { AuthenticationForm } from "src/core/components/MainAuthenticationForm"
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser"
import { Button, Flex, Stack } from "@mantine/core"
import adminOnlyMutation from "src/features/auth/mutations/adminOnlyMutation"
import { useMutation } from "@blitzjs/rpc"
import sendTestEmail from "src/features/users/mutations/sendTestEmail"

const Home: BlitzPage = () => {
  const currentUser = useCurrentUser()
  const [$adminOnly] = useMutation(adminOnlyMutation)
  const [$sendTestEmail] = useMutation(sendTestEmail)
  return (
    <Layout title="Home">
      {currentUser && currentUser.isAdmin && (
        <Button
          onClick={async () => {
            await $adminOnly({})
          }}
        >
          Admin
        </Button>
      )}
      <Button
        onClick={async () => {
          await $sendTestEmail({
            html: "<div>Test email</div>",
            subject: "Test email",
            to: "amir@amiracle.xyz",
          })
        }}
      >
        Test email
      </Button>
      {!currentUser && <AuthenticationForm />}
    </Layout>
  )
}

export default Home
