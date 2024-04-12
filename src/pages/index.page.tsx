import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { AuthenticationForm } from "src/core/components/MainAuthenticationForm"
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser"
import { Button, Group } from "@mantine/core"
import { Slider } from "@mantine/core"

import { confirmDelete } from "src/utils/mantine-utils"

const Home: BlitzPage = () => {
  const currentUser = useCurrentUser()

  return (
    <Layout title="Home">
      <Slider
        style={{ width: "20%" }}
        color="blue"
        marks={[
          { value: 20, label: "20%" },
          { value: 50, label: "50%" },
          { value: 80, label: "80%" },
        ]}
      />
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
