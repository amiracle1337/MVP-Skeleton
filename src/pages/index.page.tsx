import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser"

const Home: BlitzPage = () => {
  const currentUser = useCurrentUser()

  return <Layout title="Home"> hello world</Layout>
}

export default Home
