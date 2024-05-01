import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { AuthenticationForm } from "src/core/components/MainAuthenticationForm"
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser"

const Home: BlitzPage = () => {
  const currentUser = useCurrentUser()

  return <Layout title="Home">{!currentUser && <AuthenticationForm />}</Layout>
}

export default Home
