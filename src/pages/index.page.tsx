import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { AuthenticationForm } from "src/core/components/MainAuthenticationForm"
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser"
import { Button, Flex, Stack } from "@mantine/core"
import adminOnlyMutation from "src/features/auth/mutations/adminOnlyMutation"
import { useMutation } from "@blitzjs/rpc"

const Home: BlitzPage = () => {
  const currentUser = useCurrentUser()
  const [$adminOnly] = useMutation(adminOnlyMutation)
  return (
    <Layout title="Home">
      {currentUser && currentUser.isAdmin && (
        <Button
          onClick={() => {
            $adminOnly({})
          }}
        >
          Admin
        </Button>
      )}
      {!currentUser && <AuthenticationForm />}
    </Layout>
  )
}

export default Home
