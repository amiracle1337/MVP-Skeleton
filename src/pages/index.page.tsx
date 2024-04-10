import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { AuthenticationForm } from "src/core/components/MainAuthenticationForm"
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser"
import { Button } from "@mantine/core"

import { confirmDelete } from "src/utils/mantine-utils"

const Home: BlitzPage = () => {
  const currentUser = useCurrentUser()

  return (
    <Layout title="Home">
      <Button
        color="red"
        onClick={() => {
          confirmDelete(() => {
            console.log("delete account")
          })
        }}
      >
        Delete account
      </Button>

      {!currentUser && <AuthenticationForm />}
    </Layout>
  )
}

export default Home
