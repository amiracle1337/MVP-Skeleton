import { BlitzPage } from "@blitzjs/auth"
import { useQuery } from "@blitzjs/rpc"
import { Text, Stack, Button } from "@mantine/core"
import Layout from "src/core/layouts/Layout"
import { useStringParam } from "src/utils/utils"
import getUserForProfile from "src/features/users/queries/getUserForProfile"
import { useCurrentUser } from "src/features/users/hooks/useCurrentUser"

export const ProfilePage: BlitzPage = () => {
  const username = useStringParam("username")
  const [user] = useQuery(getUserForProfile, { username: username || "" }, { enabled: !!username })

  if (!user) return <Text>User not found :(</Text>

  const currentUser = useCurrentUser()
  const isOwner = currentUser?.id === user.id

  return (
    <Layout>
      <Stack>
        {isOwner && <Button>Edit your profile</Button>}
        <Text>hello {user.name}</Text>
        <Text>{user.bio}</Text>
      </Stack>
    </Layout>
  )
}

export default ProfilePage
