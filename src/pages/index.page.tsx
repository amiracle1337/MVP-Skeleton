import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { AuthenticationForm } from "src/core/components/MainAuthenticationForm"
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser"
import { Flex, Stack } from "@mantine/core"

const Home: BlitzPage = () => {
  const currentUser = useCurrentUser()
  return (
    <Layout title="Home">
      {!currentUser && (
        <Flex style={{ height: "70vh", width: "100%" }} align="center" justify="center">
          <AuthenticationForm />
        </Flex>
      )}
    </Layout>
  )
}

export default Home
